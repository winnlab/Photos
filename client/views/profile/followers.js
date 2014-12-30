Template.followers.helpers({
    users: function () {
        return findUsers('followers');
    }
});

Template.followers.created = function () {
    followSubscribe(this, 'followers');
}
