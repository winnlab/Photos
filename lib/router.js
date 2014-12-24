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
        controller: 'MissionItemController'
    });

    this.route('about', {
        path: '/about/:link',
        waitOn: function () {
            return Meteor.subscribe('about');
        },
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

    this.route('addPhoto', {
        path: '/photos/new',
        waitOn: function () {
            return Meteor.subscribe('missionName');
        },
        data: function () {
            return [];
        }
    });

    this.route('themes', {
        path: '/kategorien',
        controller: 'ThemesController'
    });

    this.route('themeItem', {
        path: '/kategorien/:link',
        controller: 'ThemeItemController'
    });

    this.route('themeUpload', {
        path: '/kategorien/:link/upload',
        controller: 'ThemeUploadController'
    });

});

var requireLogin = function() {
    if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
}

Router.onBeforeAction(requireLogin, {
    only: ['profile.edit', 'addPhoto', 'themeUpload']
});
