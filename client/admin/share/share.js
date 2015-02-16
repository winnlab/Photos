'use strict';

Template.adminShareWrapper.created = function () {
    var instance = this;
    setupPagination(this);
    instance.autorun(function () {
        var options = {
                limit: instance.limit.get(),
                sort: { time: -1 }
            };
        Meteor.subscribe('share', {}, options, true);
    });
};

Template.adminShareWrapper.destroyed = function () {
    $(window).off('scroll');
};
