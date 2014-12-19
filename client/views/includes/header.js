Template.header.events({
    'click .logout': function (ev) {
        ev.preventDefault();
        Meteor.logout();
    }
});
