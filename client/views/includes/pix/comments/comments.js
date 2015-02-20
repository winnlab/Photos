'use strict';
Template.shareComments.created = function () {
    Meteor.subscribe('comments', this.data._id);
};

Template.shareComments.helpers({
    comments: function () {
        return Comments.find({ sourceId: this._id });
    }
});

Template.shareComments.events({
    'submit .comment-form': function (ev, template) {
        ev.preventDefault();
        var comment = $(ev.target).serializeArray()[0].value,
            user = Meteor.user(),
            share = Share.findOne({ _id: template.data._id });

        if (!comment) {
            return;
        }

        Meteor.call('addComment', {
            shareId: share._id,
            shareType: share.type,
            userId: share.userId,
            ownerId: user._id,
            ownerUsername: user.username,
            comment: comment
        }, function (err) {
            if (err) {
                console.error(err);
            }
            ev.target.reset();
        });
    }
});
