Template.registerHelper('activeRouteClass', function () {
    var args = Array.prototype.slice.call(arguments, 0),
    routeName = Router.current().route.getName();

    args.pop();

    var active = _.any(args, function(name) {
        return routeName === name;
    });

    return active && 'active';
})

Template.registerHelper('addMissionPhoto', function (id) {
    return Router.routes['addPhoto'].path({}, {
        query: {
            missionId: id
        }
    });
})

Template.registerHelper('timeLeft', function (to, type) {
    var diff = to - Date.now();
    return diff;
});

Template.registerHelper('$even', function (a) {
    return a % 2 === 0;
});

Template.registerHelper('$odd', function (a) {
    return a % 2 !== 0;
});
