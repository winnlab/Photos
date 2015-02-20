Comments = new Mongo.Collection('comments');

Comments.attachSchema(new SimpleSchema({
    userId: {
        type: String
    },
    username: {
        type: String
    },
    sourceId: {
        type: String
    },
    date: {
        type: String
    },
    comment: {
        type: String,
        max: 200
    }
}));

Meteor.methods({
    addComment: function (data) {
        'use strict';
        if (!this.userId) {
            throw new Meteor.Error(403, 'Not allowed');
        }

        var fields = ['shareId', 'shareType', 'userId', 'ownerId', 'ownerUsername', 'comment'],
            isOmits = false;

        data = _.pick(data, fields);

        _.filter(fields, function (field) {
            if (!_.has(data, field)) {
                isOmits = field;
            }
            return isOmits;
        });

        if (isOmits) {
            throw new Meteor.Error(406, 'You missed ' + isOmits + ' key in argument object');
        }

        Meteor.call('commentNotify', _.pick(data, [
            'shareId', 'shareType', 'userId', 'ownerId', 'ownerUsername'
        ]));

        Meteor.call('discussNotify', _.pick(data, [
            'shareId', 'userId', 'ownerId', 'ownerUsername'
        ]));

        Comments.insert({
            userId: data.ownerId,
            username: data.ownerUsername,
            sourceId: data.shareId,
            date: moment().format(),
            comment: data.comment
        });
    },

    removeComment: function (commentId) {
        var comment = Comments.findOne({ _id: commentId });
        if (!Roles.userIsInRole(this.userId, ['admin']) && comment.userId !== this.userId) {
            throw new Meteor.Error(403, 'Not allowed');
        }
        return Comments.remove({ _id: commentId });
    }
});
