'use strict';

var $affixed;

Template.missionItemMobile.events({
    'click .order': function (e) {
        e.preventDefault();
        Session.set('sortBy', e.currentTarget.attributes['data-sort'].value);
    }
});

Template.missionItemMobile.rendered = function () {
    $affixed = $('.affixed');

    $affixed.affix({
        offset: {
            top: (function () {
                return $affixed.offset().top - $affixed.height();
            }()),
            bottom: 0
        }
    });
};
