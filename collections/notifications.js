Notification = new Mongo.Collection('notifications');

Notification.allow({
    update: function(userId, doc, fieldNames) {
        return isUserOwn(userId, doc) &&
            fieldNames.length === 1 && fieldNames[0] === 'read';
    }
});

Push.allow({
    send: function(userId, notification) {
      return !!userId;
    }
});

var checkNotify = function (data) {
        var checkTypes = ['like'];
        if (data.ownerId && data.sourceId && checkTypes.indexOf(data.type) !== -1) {
            var exist = Notification.find({
                ownerId: data.ownerId,
                sourceId: data.sourceId,
                type: data.type
            }).fetch();
            return !_.isEmpty(exist);
        }
        return false;
    },
    addNotify = function (data) {
        if (checkNotify(data)) {
            return;
        }
        Notification.insert(_.extend(data, {
            date: moment().format(),
            read: false
        }));
        Push.send({
            from: 'Selfie',
            title: 'neue Aktivität',
            text: data.msg,
            query: {
                userId: data.userId
            }
        });
    };

Meteor.methods({
    shareNotify: function (ownerId, type) {
        // owner is initiator of notification
        var owner = Meteor.users.findOne({_id: ownerId});
        _.each(owner.followers, function (user) {
            addNotify({
                userId: user,
                ownerId: ownerId,
                type: 'share' + type.charAt(0).toUpperCase() + type.slice(1),
                msg: type === 'img' ?
                    'Benutzer ' + owner.username + ' ein neues Foto hinzugefügt' :
                    'Benutzer ' + owner.username + ' ein neues Video hinzugefügt',
                link: Router.path('profile', { username: owner.username })
            });
        });
    },
    /**
     * userId - user wich will be notificated
     * ownerId - initiatior of notification
     */
    likeNotify: function (userId, ownerId, shareId) {
        var owner = Meteor.users.findOne({ _id: ownerId }),
            user = Meteor.users.findOne({ _id: userId });
        addNotify({
            userId: userId,
            ownerId: ownerId,
            sourceId: shareId,
            type: 'like',
            msg: 'Benutzer ' + owner.username + ' mag Ihr Foto',
            link: Router.path('profile', {
                username: user ? user.username : '',
                shareId: shareId
            })
        });
    },

    /**
     * data.shareId - source id
     * data.shareType - source type
     * data.userId - owner of source
     * data.ownerId - initiator id of notification
     * data.ownerUsername - initiator username of notification
     * Method is invoked when user has commented any share entity.
     * It notify owner of share entity about user commentary.
     */
    commentNotify: function (data) {
        var user = Meteor.users.find({ _id: data.userId });
        addNotify({
            userId: data.userId,
            ownerId: data.ownerId,
            sourceId: data.shareId,
            type: 'comment',
            msg: 'Benutzer ' + data.ownerUsername + ' Ihr ' +
            (data.shareType === 'img' ? 'Foto' : 'Video') + ' kommentiert',
            link: Router.path('profile', {
                username: user ? user.username : '',
                shareId: data.shareId
            })
        });
    },

    /**
     * data.shareId - source id
     * data.userId - owner of source
     * data.ownerId - initiator id of notification
     * data.ownerUsername - initiator username of notification
     * Method is invoked when user has commented any share entity.
     * It notify user about discussion around share entity.
     */
    discussNotify: function (data) {
        'use strict';
        var self = this,
            commets = Comments.find({ sourceId: data.shareId }).fetch(),
            deafUsers = [data.userId, data.ownerId];
        _.each(commets, function (comment) {
            if (deafUsers.indexOf(comment.userId) === -1) {
                self.unblock();
                addNotify({
                    userId: comment.userId,
                    ownerId: data.ownerId,
                    sourceId: data.shareId,
                    type: 'discussion',
                    msg: 'Benutzer ' + data.ownerUsername + ' Ihr ',
                    link: Router.path('categories', {
                        type: 'neueste',
                        shareId: data.shareId
                    })
                });
            }
        });
    }
});
