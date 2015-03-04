'use strict';
Template.shareComments.created = function () {
    var instance = this;

    instance.limit = new ReactiveVar(COMMENT_LIMIT);

    instance.autorun(function () {
        Meteor.subscribe('comments', instance.data._id, instance.limit.get());
    });
};

Template.shareComments.helpers({
    comments: function () {
        return Comments.find({ sourceId: this._id }, { sort: { date: -1 } });
    },
    moreComments: function () {
        var instance = Template.instance(),
            commentsQty = instance.data.commentsQty;
        return commentsQty > 0 && !(commentsQty <= instance.limit.get());
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
    },
    'click .load-more': function (ev, template) {
        var limit = template.limit.get();
        template.limit.set(limit + COMMENT_LIMIT);
    }
});
