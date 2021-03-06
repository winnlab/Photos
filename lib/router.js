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
        }
        return subscriptions;
    }
});

Router.map(function() {

    this.route('/', function () {
        Router.go('categories', { type: 'neueste' });
    }, {
        name: 'home'
    });

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

    this.route('notifications', {
        path: '/notifications',
        template: 'notificationList'
    });

    this.route('search', {
        path: '/search/:search?',
        onAfterAction: function () {
            $(window).scrollTop(0);
        }
    });

    this.route('pickUsername', {
        path: '/pick-username',
        onBeforeAction: function () {
            if (Meteor.user().generatedUsername === 0) {
                Router.go('/');
            }
            this.next();
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
},
requireUserName = function () {
    if (Meteor.user() && Meteor.user().generatedUsername === 1) {
        Router.go('pickUsername');
    }
    this.next();
};

Router.onBeforeAction(requireUserName);
Router.onBeforeAction(requireLogin, {
    only: ['profile.edit', 'addPhoto', 'addShare', 'themeUpload', 'pickUsername', 'notifications']
});
