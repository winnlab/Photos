Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.route('/', function () {
    this.redirect('/categories/neueste');
}, {
    name: 'home'
});

Router.map(function() {

    this.route('categories', {
        path: '/categories/:type',
        data: function () {
            return {
                missions: Missions.find({}, {
                    limit: 18,
                    sort: {
                        to: -1
                    },
                    fields: {
                        _id: 1,
                        name: 1,
                        bg: 1
                    }
                }).fetch(),
                pix: []
            };
        }
    });

    this.route('missions', {
        path: '/missions',
        data: function () {
            return Missions.find({}, {
                fields: {
                    description: -1
                }
            });
        }
    });

    this.route('missionItem', {
        path: '/mission/:_id',
        data: function () {
            return Missions.findOne({_id: this.params._id});
        }
    });

    this.route('kategorien', {
        path: '/kategorien',
        data: function () {
            return [];
        }
    });

    this.route('addPhoto', {
        path: '/photos/new',
        data: function () {
            return [];
        }
    });

    this.route('leserreporter', {
        path: '/leserreporter',
        data: function () {
            return [];
        }
    });


});
