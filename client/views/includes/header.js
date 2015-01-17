'use strict';

var goToSearch = function (value) {
    var search = _.reduce(_.unique(value.split(' ')), function (result, item, index, all) {
        if (item) {
            result += item + (index + 1 < all.length ? ',' : '');
        }
        return result;
    }, '');
    Router.go('search', { search: encodeURI(search) });
};

Template.header.events({
    'click .logout': function (ev) {
        ev.preventDefault();
        Meteor.logout();
    },
    'click .upload': function () {
        Router.go('addPhoto');
    },
    'keyup #search-field': function (ev) {
        if (ev.keyCode === 13) {
            return goToSearch(ev.target.value);
        }
    },
    'click .searchBtn': function () {
        return goToSearch($('#search-field').val());
    }
});
