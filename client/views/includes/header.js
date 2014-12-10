Template.header.helpers({
    activeRouteClass: function(/* route names */) {
        var args = Array.prototype.slice.call(arguments, 0),
            routeName = Router.current().route.getName();

        args.pop();

        var active = _.any(args, function(name) {
            return routeName === name;
        });
        console.log(routeName, active);
        return active && 'active';
    }
});
