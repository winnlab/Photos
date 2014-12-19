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
