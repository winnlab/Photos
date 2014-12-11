Template.about.helpers({
    isActive: function (link) {
        return link === Router.current().params.link ? 'active' : '';
    }
});
