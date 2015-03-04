'use strict';

var notificationReaded = function () {
    if (this.read) {
        return;
    }
    return Meteor.call('notificationReaded', this._id);
};

Template.notificationList.created = function () {
    var instance = this;
    instance.notificationsLimit = new ReactiveVar(NOTIFICATION_LIMIT);
    instance.autorun(function () {
        Meteor.subscribe(
            'notifications',
            Meteor.userId(),
            instance.notificationsLimit.get()
        );
    });
};

Template.notificationList.helpers({
    notifications: function () {
        return Notification.find({}, { sort: { date: -1 } });
    },
    isLoadMore: function () {
        var count = Meteor.user().notification.count;
        console.log(count)
        return count > 0 && count > Notification.find().count();
    }
});

Template.notificationList.events({
    'click .load-more': function (ev, template) {
        var limit = template.notificationsLimit.get();
        template.notificationsLimit.set(limit + NOTIFICATION_LIMIT);
    },
    'click .notification-link': notificationReaded,
    'mouseleave .notification-link': function () {
        Meteor.setTimeout(_.bind(notificationReaded, this), 1000);
    }
});
