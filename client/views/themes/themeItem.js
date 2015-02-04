'use strict';

Template.themeItem.events({
    'click .order': function (e) {
        e.preventDefault();
        Session.set('sortBy', e.currentTarget.attributes['data-sort'].value);
    }
});

Template.themeItem.created = function () {
    this.data.pageNameReactive.set(this.data.theme.name);
    setupPagination(this);
    simplePagination(this, { themeId: this.data.theme._id });
};

Template.themeItem.destroyed = function () {
    $(window).off('scroll');
};
