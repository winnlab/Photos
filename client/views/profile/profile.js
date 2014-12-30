Template.profile.helpers({
    shares: function () {
        return Share.find()
    }
});

Template.profile.created = function () {
    var instance = this;

    setupPagination(instance);

    instance.autorun(function () {
        var query = { userId: instance.data.userId },
            options = {
                limit: instance.limit.get(),
                sort: { time: -1 }
            };
        Meteor.subscribe('share', query, options),
        Meteor.subscribe('shareSource', query, options)
    });

    $(window).on('scroll', function () {
        showMoreVisible(instance);
    });
}

Template.profile.destroyed = function () {
    $(window).off('scroll');
}
