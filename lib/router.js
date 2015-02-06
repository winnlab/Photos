'use strict';

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        var user = Meteor.user(),
            subscriptions = [];
        if (user) {
            subscriptions.push(Meteor.subscribe('userInfo', user.username));
            subscriptions.push(Meteor.subscribe('notifications', user._id));
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
        path: '/categories/:type/:shareId?',
        controller: 'CategoriesController'
    });

    this.route('missions', {
        path: '/missions',
        waitOn: function () {
            return [
                Meteor.subscribe('missionsList'),
                Meteor.subscribe('missionsListImg')
            ];
        },
        data: function () {
            return {
                missions: Missions.find({}),
                pageName: '12Aktionen'
            };
        }
    });

    this.route('missionItem', {
        path: '/mission/:_id/:shareId?',
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

    this.route('followings', {
        path: '/users/:username/followings',
        controller: 'FollowingsController'
    });

    this.route('followers', {
        path: '/users/:username/followers',
        controller: 'FollowersController'
    });

    this.route('profile.edit', {
        path: '/users/:username/edit',
        controller: 'ProfileController'
    });

    this.route('profile', {
        path: '/users/:username/:shareId?',
        controller: 'ProfilePhotosController'
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

    this.route('addShare', {
        path: '/share/new',
        template: 'addPhoto',
        waitOn: function () {
            var waitOn = null,
                query = this.params.query;
            if (query && query.missionId) {
                waitOn = Meteor.subscribe('missionName', query.missionId);
            }
            if (query && query.themeId) {
                waitOn = Meteor.subscribe('themeName', query.themeId);
            }
            return waitOn;
        }
    });

    this.route('themes', {
        path: '/kategorien',
        controller: 'ThemesController'
    });

    this.route('themeUpload', {
        path: '/kategorien/:link/upload',
        controller: 'ThemeUploadController'
    });

    this.route('themeItem', {
        path: '/kategorien/:link/:shareId?',
        controller: 'ThemeItemController'
    });

    this.route('search', {
        path: '/search/:search?',
        onAfterAction: function () {
            $(window).scrollTop(0);
        }
    });

});

var requireLogin = function() {
    if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            if (Meteor.Device.isPhone() || Meteor.Device.isTablet()) {
                AccountsEntry.signInRequired(this);
            } else {
                this.render('accessDenied');
            }
        }
    } else {
        this.next();
    }
};

Router.onBeforeAction(requireLogin, {
    only: ['profile.edit', 'addPhoto', 'themeUpload']
});
