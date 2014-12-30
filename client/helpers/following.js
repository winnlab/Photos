Meteor.startup(function () {
    $(document).on('click', '.followingMe', function (ev) {
        ev.preventDefault();
        var username = ev.target.attributes['data-username'].value;
        Meteor.call('toggleFollow', username, function (err) {
            if (err) {
                console.error(err);
            }
        });
    });
});

findUsers = function (type) {
    var instance = Template.instance();
    return Meteor.users.find({
        _id: { $in: instance[type] }
    });
}

followSubscribe = function (instance, type) {
    instance[type] = instance.data.userInfo[type] || [];
    Meteor.subscribe('usersList', instance[type]);
}
