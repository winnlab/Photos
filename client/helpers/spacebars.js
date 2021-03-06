'use strict';
Template.registerHelper('activeRouteClass', function () {
    var args = Array.prototype.slice.call(arguments, 0),
    routeName = Router.current().route.getName();

    args.pop();

    var active = _.any(args, function(name) {
        return routeName === name;
    });

    return active && 'active';
});

Template.registerHelper('showSettings', function () {
    var routeName = Router.current().route.getName(),
        routes = ['followings', 'followers', 'profile'];
    return routes.indexOf(routeName) !== -1;
});

Template.registerHelper('showLoginButtons', function () {
    var routeName = Router.current().route.getName(),
        routes = ['entryResetPassword'];
    return routes.indexOf(routeName) === -1;
});

var pathForUpload = function (query) {
    var route;
    if (Meteor.Device.isPhone() || Meteor.Device.isTablet()) {
        route = Router.routes.addShare;
    } else {
        route = Router.routes.addPhoto;
    }
    return route.path({}, {
        query: query
    });
};

Template.registerHelper('addMissionPhoto', function (id) {
    return pathForUpload({ missionId: id });
});
Template.registerHelper('addThemePhoto', function (id) {
    return pathForUpload({ themeId: id });
});

Template.registerHelper('timeLeft', function (to, type) {
    var diff = (to - Date.now()) / (3600 * 1000),
        number,
        period;

    switch (false) {
        case !(diff < 24):
            number = Math.ceil(diff);
            period = 'Stund' + (number != 1 ? 'en' : '');
            break;
        case !(diff < 24 * 30):
            number = Math.ceil(diff / 24);
            period = 'Tag' + (number != 1 ? 'e' : '');
            break;
        case !(diff < 24 * 30 * 12):
            number = Math.ceil(diff / (24 * 30));
            period = 'Monat' + (number != 1 ? 'e' : '');
            break;
        default:
            number = Math.ceil(diff / (24 * 30 * 12));
            period = 'Jahr' + (number != 1 ? 'e' : '');
            break;
    }

    return type === 'number' ? number : (type === 'period' ? period : number + period);
});

Template.registerHelper('avatarById', function (_id, size, isBg) {
    if (typeof size === 'object') {
        size = null;
    }
    if (typeof isBg === 'object') {
        isBg = null;
    }
    Meteor.subscribe('avatar', { _id: _id });
    var avatar = _id && Avatars.findOne({ _id: _id }),
        options = size ? { store: size } : null,
        result = '';
    if (avatar) {
        result = avatar.url(options);
    } else {
        result = '/img/' + (isBg ? 'default_user_background.png' : 'generic-avatar_transparent.png');
    }
    return result;
});

Template.registerHelper('userAvatar', function (userId, color, store) {
    if (typeof color === 'object') {
        color = null;
    }
    if (typeof store === 'object') {
        store = null;
    }
    Meteor.subscribe('avatar', { userId: userId });
    var avatar = Avatars.findOne({ userId: userId });
    return avatar ? avatar.url(store ? { store: store } : {}) : color ? '/img/generic-avatar_white.png' : '/img/generic-avatar_transparent.png';
});

Template.registerHelper('getImage', function (Collection, _id, store) {
    if (typeof store === 'object') {
        store = null;
    }
    var img = window[Collection].findOne({ _id: _id }),
        options = store ? { store: store } : null;
    return img ? img.url(options) : '';
});

Template.registerHelper('Session', function (input) {
    return Session.get(input);
});

Template.registerHelper('log', function (name, value) {
    if (value) {
        console.log(name, value);
    } else {
        console.log(name ? this[name] : this);
    }
});

Template.registerHelper('$isChecked', function (a, b) {
    return a === b ? { checked: true } : null;
});

Template.registerHelper('shares', function () {
    var sort = Session.get('sortBy');
    if (sort === 'latest' || !sort) {
        return Share.find({}, { sort: { time: -1 } });
    } else {
        return Share.find({}, { sort: { likesQty: -1 } } );
    }
});

Template.registerHelper('moreResults', function () {
    var instance = Template.instance();
    return !(Share.find().count() < instance.limit.get());
});

Template.registerHelper('isMobileDevice', function () {
    return Meteor.Device.isPhone() || Meteor.Device.isTablet();
});

Template.registerHelper('timeAgo', function (date) {
    return moment(date).fromNow();
});
