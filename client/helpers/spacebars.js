Template.registerHelper('activeRouteClass', function () {
    var args = Array.prototype.slice.call(arguments, 0),
    routeName = Router.current().route.getName();

    args.pop();

    var active = _.any(args, function(name) {
        return routeName === name;
    });

    return active && 'active';
})
