Template.categories.helpers({
    isActive: function (type) {
        return type === Router.current().params.type ? 'active' : '';
    }
});

Template.categories.created = function () {
    var instance = this;

    setupPagination(instance);

    instance.autorun(function () {
        var type = instance.data.type.get(),
            query = {},
            options = {
                limit: instance.limit.get(),
                sort: { time: -1 }
            };

        switch (type) {
            case 'mein1414':
                query.main = 1;
                break;
            case 'neueste':
                options.sort ={
                    time: -1
                };
                break;
            case 'top100':
                options.sort ={
                    likesQty: -1
                };
                break;
            case 'gw1414':
                query.winner = 1;
                break;
        }

        Meteor.subscribe('share', query, options);
        Meteor.subscribe('shareSource', query, options);

    });
}

Template.categories.destroyed = function () {
    $(window).off('scroll');
}
