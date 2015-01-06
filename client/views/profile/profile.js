Template.profile.helpers({
    shares: function () {
        return Share.find()
    }
});

Template.profile.created = function () {
    setupPagination(this);
    simplePagination(this, { userId: this.data.userId });
}

Template.profile.destroyed = function () {
    $(window).off('scroll');
}
