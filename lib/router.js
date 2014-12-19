Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        var user = Meteor.user(),
            subscriptions = [Meteor.subscribe('avatar'),];
        if (user) {
            subscriptions.push(Meteor.subscribe('userInfo', user.username));
        }
        return subscriptions;
    }
});

Router.route('/', function () {
    Router.go('categories', { type: 'neueste' });
}, {
    name: 'home'
});

Router.map(function() {

    this.route('categories', {
        path: '/categories/:type',
        waitOn: function () {
            return [
                Meteor.subscribe('missionsBanner'),
                Meteor.subscribe('categories')
            ]
        },
        data: function () {
            return {
                missions: Missions.find().fetch(),
                categories: Categories.find(),
                pix: [],
                displayFilters: true
            };
        }
    });

    this.route('missions', {
        path: '/missions',
        data: function () {
            return {
                missions: Missions.find({}, {
                    fields: {
                        description: 0
                    }
                })
            }
        }
    });

    this.route('missionItem', {
        path: '/mission/:_id',
        data: function () {
            return Missions.findOne({_id: this.params._id});
        }
    });

    this.route('about', {
        path: '/about/:link',
        data: function () {
            return {
                page: About.find({})
            };
        }
    });

    this.route('profile', {
        path: '/users/:username',
        controller: 'ProfileController'
    });

    this.route('followings', {
        path: '/users/:username/followings',
        controller: 'FollowingsController'
    });

    this.route('followers', {
        path: '/users/:username/followers',
        controller: 'FollowersController'
    });

    this.route('badges', {
        path: '/users/:username/badges',
        controller: 'ProfileController'
    });

    this.route('profile.edit', {
        path: '/users/:username/edit',
        controller: 'ProfileController'
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

});

var requireLogin = function() {
    if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            Router.go('categories', { type: 'neueste' });
        }
    } else {
        this.next();
    }
}

Router.onBeforeAction(requireLogin, {only: 'profile.edit'});
