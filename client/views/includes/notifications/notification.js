'use strict';
var helpers = {
        notifications: function () {
            return Notification.find();
        }
    },
    events = {
        'click .notification-item': function (ev) {
            var notificationId = $(ev.currentTarget).data('id');
            Notification.update({ _id: notificationId }, { $set: { read: true }});
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
