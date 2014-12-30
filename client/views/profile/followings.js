Template.followings.helpers({
    users: function () {
        return findUsers('followings');
    }
});

Template.followings.created = function () {
    followSubscribe(this, 'followings');
}
