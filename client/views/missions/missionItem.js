Template.missionItem.created = function () {
    var instance = this;

    setupPagination(instance);

    instance.autorun(function () {
        var query = { missionId: Router.current().params._id },
            options = {
                limit: instance.limit.get(),
                sort: { time: -1 }
            };
        Meteor.subscribe('share', query, options);
        Meteor.subscribe('shareSource', query, options);
    });

    $(window).on('scroll', function () {
        showMoreVisible(instance);
    });
}

Template.missionItem.destroyed = function () {
    $(window).off('scroll');
}
