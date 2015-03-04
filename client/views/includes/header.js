'use strict';

Template.header.events({
    'click .logout': function (ev) {
        ev.preventDefault();
        Meteor.logout();
    },
    'click .upload': function () {
        Router.go('addPhoto');
    }
});
