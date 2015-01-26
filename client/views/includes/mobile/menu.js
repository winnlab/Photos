'use strict';
var $body,
    toggleMenu = function () {
        $body.toggleClass('menu-opened');
    };

Template.headerMobile.events({
    'click .navbar-toggle': function () {
        toggleMenu();
    }
});

Template.mobileMenu.events({
    'click #m-blocker': function () {
        toggleMenu();
    },
    'click a': function () {
        Meteor.setTimeout(function () {
            toggleMenu();
        }, 300);
    },
    'keyup #search-field': function (ev) {
        if (ev.keyCode === 13) {
            window.goToSearch(ev.target.value);
            Meteor.setTimeout(function () {
                toggleMenu();
            }, 300);
        }
    },
    'change #search-field': function (ev) {
        if (ev.target.value.length) {
            $(ev.target).addClass('not-empty');
        } else {
            $(ev.target).removeClass('not-empty');
        }
    }
});

Template.mobileMenu.rendered = function () {
    $body = $('html');
};
