'use strict';

Template.profileEditDesk.helpers({
    payInfo: function () {
        return Session.get('payInfo') || 'paypal';
    }
});
