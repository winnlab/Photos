Template.registerHelper('activeRouteClass', function () {
    var args = Array.prototype.slice.call(arguments, 0),
    routeName = Router.current().route.getName();

    args.pop();

    var active = _.any(args, function(name) {
        return routeName === name;
    });

    return active && 'active';
})

Template.registerHelper('addMissionPhoto', function (id) {
    return Router.routes['addPhoto'].path({}, {
        query: {
            missionId: id
        }
    });
})

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

    return type == 'number' ? number : (type == 'period' ? period : number + period);
});

Template.registerHelper('$even', function (a) {
    return a % 2 === 0;
});

Template.registerHelper('$odd', function (a) {
    return a % 2 !== 0;
});

Template.registerHelper('isFirefox', function () {
    return navigator.userAgent.indexOf("Firefox") > -1;
});

Template.registerHelper('avatar', function (_id, size, isBg) {
    if (typeof size === 'object') {
        size = null;
    }
    if (typeof isBg === 'object') {
        isBg = null;
    }
    Meteor.subscribe('avatar', { _id: _id });
    var avatar = _id && Avatars.findOne({ _id: _id }),
        options = size ? { store: size } : null;
    return avatar ? avatar.url(options) : (isBg ? '/img/default_user_background.png' : '/img/generic-avatar_transparent.png');
});

Template.registerHelper('userAvatar', function (userId, color) {
    if (typeof color === 'object') {
        color = null;
    }
    Meteor.subscribe('avatar', { userId: userId });
    var avatar = Avatars.findOne({ userId: userId });
    return avatar ? avatar.url() : color ? '/img/generic-avatar_white.png' : '/img/generic-avatar_transparent.png';
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

Template.registerHelper('log', function (name) {
    console.log(name ? this[name] : this);
});

Template.registerHelper('$isChecked', function (a, b) {
    return a == b ? { checked: true } : null;
});

Template.registerHelper('shares', function () {
    var sort = Session.get('sortBy');
    if (sort == "latest" || !sort) {
        return Share.find({}, { sort: { time: -1 } });
    } else {
        return Share.find({}, { sort: { likesQty: -1 } } );
    }
});

Template.registerHelper('moreResults', function () {
    var instance = Template.instance();
    return !(Share.find().count() < instance.limit.get());
});
