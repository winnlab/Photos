'use strict';

var active = new ReactiveVar(false);

Template.adminComplaintsShare.helpers({
    share: function () {
        return Share.find({ _id: this.value });
    },
    show: function () {
        return active.get();
    },
    active: function () {
        return active;
    }
});

Template.adminComplaintsShare.events({
    'click .complaint-img': function (ev) {
        var id = ev.currentTarget.attributes['data-id'].value;
        active.set(id)
    }
});

Template.adminComplaintsShare.created = function () {
    Meteor.subscribe('share', { _id: this.data.value });
};
