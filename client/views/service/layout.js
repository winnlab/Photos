'use strict';
Template.layout.created = function () {
    if (Meteor.Device.isPhone() || Meteor.Device.isTablet()) {
        $('html').addClass('mobile-device');
        $('body').addClass('mobile');
    }
};
