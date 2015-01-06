Template.themeItem.created = function () {
    setupPagination(this);
    simplePagination(this, { themeId: this.data.theme._id });
}

Template.themeItem.destroyed = function () {
    $(window).off('scroll');
}
