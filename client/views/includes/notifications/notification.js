'use strict';
var notificationReaded = function (ev) {
        var notificationId = $(ev.currentTarget).data('id');
        Notification.update({ _id: notificationId }, { $set: { read: true }});
    },
    helpers = {
        notifications: function () {
            return Notification.find();
        }
    },
    events = {
        'click .notification-item': notificationReaded,
        'mouseleave .notification-item': function (ev) {
            Meteor.setTimeout(function () {
                notificationReaded(ev);
            }, 1000);
        }
    };

Template.notifications.helpers(helpers);
Template.notifications.events(events);

Template.notificationsMobile.helpers(helpers);
Template.notificationsMobile.events(_.extend(events, {
    'click .notifications': function () {
        $('.notification-list-wrap').toggleClass('active');
    }
}));
