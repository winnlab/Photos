setShareId = function (id) {
    if (isShareSegment()) {
        setRouteParams({ shareId: id });
    }
}

isShareSegment = function () {
    return Router.current().route.handler.path.indexOf('shareId') !== -1;
}

setRouteParams = function (params) {
    var currentParams = Router.current().params,
        setParams = _.extend({}, currentParams, params);
    _.each(setParams, function (val, key) {
        if (val === null) {
            delete setParams[key];
        }
    });
    return Router.go(Router.current().route.getName(), setParams);
}
