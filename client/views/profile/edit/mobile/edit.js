'use strict';

var state = new ReactiveVar('menu');

Template.profileEditMobile.helpers({
    state: function () {
        return state.get();
    },
    title: function () {
        switch (state.get()) {
            case 'menu':
                return 'Einstellungen';
            case 'pay':
                return 'Meine Auszahlungsdaten';
            case 'account':
                return 'Konto Einstellungen';
            case 'push':
                return 'Push Benachrichtigungen';
            case 'privacy':
                return 'Datenschutz-Einstellungen';
        }
    }
});

Template.profileEditMobile.events({
    'click .back': function (ev) {
        ev.preventDefault();
        var currentState = state.get();
        if (currentState !== 'menu') {
            state.set('menu');
        } else {
            Router.go('profile', {
                username: Meteor.user().username
            });
        }
    },
    'click .goTo': function (ev) {
        var goTo = $(ev.target).attr('data-form');
        state.set(goTo);
    }
});

Template.profileEditMobile.rendered = function () {
    $('#content').addClass('profile-edit');
};

Template.profileEditMobile.destroyed = function () {
    $('#content').removeClass('profile-edit');
};
