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
        controller: 'CategoriesController'
    });

    this.route('missions', {
        path: '/missions',
        waitOn: function () {
            return Meteor.subscribe('missionsList');
        },
        data: function () {
            return {
                missions: Missions.find({})
            }
        }
    });

    this.route('missionItem', {
        path: '/mission/:_id',
        waitOn: function () {
            return Meteor.subscribe('missionItem', this.params._id);
        },
        data: function () {
            return Missions.findOne();
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
        controller: 'ProfilePhotosController'
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
        waitOn: function () {
            return Meteor.subscribe('missionName');
        },
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

Router.onBeforeAction(requireLogin, {
    only: ['profile.edit', 'addPhoto']
});
