'use strict';
Template.layout.created = function () {
    if (Meteor.Device.isPhone() || Meteor.Device.isTablet()) {
        $('body').addClass('mobile');
    }
};
