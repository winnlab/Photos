'use strict';

Meteor.publishComposite('missionsBanner', {
    find: function () {
        // Find last six missions
        return Missions.find({}, {
            limit: 6,
            sort: { to: -1 },
            fields: { _id: 1, name: 1, teaser: 1 }
        });
    },
    children: [{
        find: function (mission) {
            return MissionTeaser.find({ _id: mission.teaser }, {
                limit: 1,
                fields: { original: 0, uploadedAt: 0 }
            });
        }
    }]
});

Meteor.publish('missionsList', function () {
    return Missions.find({}, {
        fields: { description: 0, participants: 0 }
    });
});

Meteor.publish('missionsListImg', function () {
    return MissionBrand.find({}, {
        fields: { original: 0, uploadedAt: 0 }
    });
});

Meteor.publish('about', function () {
    return About.find({}, {
        sort: { position: -1 }
    });
});

Meteor.publishComposite('missionItem', function (missionId) {
    return {
        find: function() {
            return Missions.find({ _id: missionId }, { fields: { participants: 0 } });
        },
        children: [{
            find: function (mission) {
                return MissionTeaser.find({ _id: mission.teaser }, {
                    limit: 1,
                    fields: { original: 0, uploadedAt: 0 }
                });
            }
        }, {
            find: function (mission) {
                return MissionSponsor.find({ _id: mission.sponsor }, {
                    limit: 1,
                    fields: { original: 0, uploadedAt: 0 }
                });
            }
        }]
    };
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
        });
    }
    if (query && query.userId) {
        check(query, {
            userId: String
        });
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
    var publish = [Themes.find(query || {}, { sort: { position: -1 }, })]
    if (!query) {
        publish.push(ThemeBg.find());
    }
    return publish;
});

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
});

Meteor.publish('notifications', function (userId) {
    return Notification.find({ userId: userId, read: false }, { sort: { date: -1 } });
});
