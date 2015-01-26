'use strict';

Template.mobileSignIn.helpers({
    about: function () {
        return About.find();
    }
});

Template.mobileSignIn.created = function () {
    Meteor.subscribe('about');
};

Template.mobileSignIn.rendered = function () {
    $('.navbar-brand').html('<div class="navbar-page">Anmelden</div>');
};
