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
    var diff = (to - Date.now()) / (3600 * 1000),
        number,
        period;

    switch (false) {
        case !(diff < 24):
            number = Math.ceil(diff);
            period = 'Stund' + (number != 1 ? 'en' : '');
            break;
        case !(diff < 24 * 30):
            number = Math.ceil(diff / 24);
            period = 'Tag' + (number != 1 ? 'e' : '');
            break;
        case !(diff < 24 * 30 * 12):
            number = Math.ceil(diff / (24 * 30));
            period = 'Monat' + (number != 1 ? 'e' : '');
            break;
        default:
            number = Math.ceil(diff / (24 * 30 * 12));
            period = 'Jahr' + (number != 1 ? 'e' : '');
            break;
    }

    return type == 'number' ? number : (type == 'period' ? period : number + period);
});

Template.registerHelper('$even', function (a) {
    return a % 2 === 0;
});

Template.registerHelper('$odd', function (a) {
    return a % 2 !== 0;
});
