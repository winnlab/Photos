Template.categories.helpers({
    isActive: function (type) {
        return type === Router.current().params.type ? 'active' : '';
    }
});
