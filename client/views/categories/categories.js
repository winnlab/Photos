Template.categories.helpers({
    isActive: function (type) {
        return type === Router.current().params.type ? 'active' : '';
    },
    shares: function () {
        var sort = Session.get('sortBy');
        if (sort == "latest" || !sort) {
            return Share.find({}, { sort: { time: -1 } });
        } else {
            return Share.find({}, { sort: { likesQty: -1 } } );
        }
    }
});
