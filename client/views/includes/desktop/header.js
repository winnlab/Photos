'use strict';

var suggestion = new ReactiveVar(''),
    resetSearchField = function () {
        suggestion.set('');
        $('#search-field').val('');
    };

window.goToSearch = function (value) {
    var search = _.reduce(_.unique(value.replace(/\n|,| /g, '').split(' ')),
        function (result, item, index, all) {
            if (item) {
                result += item + (index + 1 < all.length ? ',' : '');
            }
            return result;
        },
    '');
    resetSearchField();
    Router.go('search', { search: encodeURI(search) });
};

Template.headerDesktop.created = function () {
    Meteor.subscribe('about');

    this.autorun(function () {
        if (suggestion.get()) {
            Meteor.subscribe('tags', suggestion.get());
        }
    });
};

Template.headerDesktop.events({
    'keyup #search-field': function (ev) {
        suggestion.set(ev.target.value);
        if (ev.keyCode === 13) {
            return goToSearch(ev.target.value);
        }
    },
    'click .searchBtn': function () {
        return goToSearch($('#search-field').val());
    },
    'click .suggestion-item': function () {
        var name = this.name;
        resetSearchField();
        Meteor.defer(function () {
            Router.go('search', { search: name });
        });
    }
});

Template.headerDesktop.helpers({
    articles: function () {
        return About.find();
    },
    suggestion: function () {
        return Tags.find();
    }
});
