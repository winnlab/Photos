Template.missionItem.created = function () {
    setupPagination(this);
    simplePagination(this, { missionId: Router.current().params._id });
}

Template.missionItem.destroyed = function () {
    $(window).off('scroll');
}
