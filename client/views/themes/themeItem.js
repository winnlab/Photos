'use strict';

Template.themeItem.created = function () {
    this.data.pageNameReactive.set(this.data.theme.name);
    setupPagination(this);
    simplePagination(this, { themeId: this.data.theme._id });
};

Template.themeItem.destroyed = function () {
    $(window).off('scroll');
};
