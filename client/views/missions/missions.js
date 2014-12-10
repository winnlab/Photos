Template.missions.helpers({
    mode: function () {
        var query = Router.current().params.query;
        return query && query.upload ? 'upload' : '';
    }
});
