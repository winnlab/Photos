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

var addNotify = function (data) {
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
            type: 'like',
            msg: 'Benutzer ' + owner.username + ' mag Ihr Foto',
            link: Router.path('profile', {
                username: user ? user.username : '',
                shareId: shareId
            })
        });
    }
});
