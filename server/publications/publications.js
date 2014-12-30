Meteor.publish('missionsBanner', function () {
    return Missions.find({}, {
        limit: 6,
        sort: {
            to: -1
        },
        fields: {
            _id: 1,
            name: 1,
            bg: 1
        }
    });
});

Meteor.publish('missionsList', function () {
    return Missions.find({}, {
        description: 0
    });
});

Meteor.publish('about', function () {
    return About.find({});
});

Meteor.publish('missionItem', function (missionId) {
    return Missions.find({ _id: missionId });
});

Meteor.publish('missionName', function () {
    return Missions.find({}, {
        fields: { name: 1 }
    });
});

Meteor.publish('categories', function () {
    return Categories.find()
});

Meteor.publish('avatar', function (query) {
    if (query && query._id) {
        check(query, {
            _id: String
        })
    }
    if (query && query.userId) {
        check(query, {
            userId: String
        })
    }
    return Avatars.find(query || {}, {
        fields: {
            original: 0,
            uploadedAt: 0
        }
    });
});

Meteor.publish('userInfo', function (username) {
    return username && Meteor.users.find({ username: username }, {
        fields: {
            createdAt: 0,
            emails: 0,
            services: 0
        }
    });
});

Meteor.publish('usersList', function (users) {
    check(users, Array);
    return Meteor.users.find({
        _id: { $in: users }
    }, {
        fields: {
            username: 1,
            avatar: 1
        }
    });
});

Meteor.publish('share', function (query, options) {
    checkSharesQuery(query);
    return Share.find(query || {}, options || {});
});

Meteor.publish('shareSource', function (query, opts) {
    checkSharesQuery(query);
    var options = {
        fields: {
            original: 0,
            uploadedAt: 0
        }
    };
    if (opts && opts.limit) {
        check(opts.limit, Number);
        options.limit = opts.limit;
    }
    if (opts && opts.sort) {
        options.sort = opts.sort;
    }
    return ShareFiles.find(query || {}, options);
});

Meteor.publish('themes', function (query) {
    if (query) {
        check(query, {
            link: String
        });
    }
    return Themes.find(query || {});
})

Meteor.publish('tags', function (name, exist) {
    var query = {
        name: {
            $regex: new RegExp('^' + name + '.*', 'i')
        }
    };
    check(name, String);
    if (exist && exist.length) {
        check(exist, Array);
        query = {
            $and: [query, {
                name: { $nin: exist }
            }]
        };
    }
    return name ? Tags.find(query, {
            limit: 6
        }) : [];
})
