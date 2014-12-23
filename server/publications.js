Meteor.publish('missionsBanner', function () {
    return Missions.find({}, {
        limit: 18,
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

Meteor.publish('avatar', function () {
    return Avatars.find({}, {
        fields: {
            original: 0,
            uploadedAt: 0
        }
    });
});

Meteor.publish('usersAvatar', function (options) {
    return Avatars.find(options);
});

Meteor.publish('userInfo', function(username) {
    return username && Meteor.users.find({ username: username }, {
        fields: {
            createdAt: 0,
            emails: 0,
            services: 0
        }
    });
});

Meteor.publish('usersList', function() {
    return Meteor.users.find({}, {
        fields: {
            username: 1,
            avatar: 1
        }
    });
});

Meteor.publish('share', function (query, options) {
    return Share.find(query || {}, options || {});
});

Meteor.publish('shareSource', function () {
    return ShareFiles.find({}, {
        fields: {
            original: 0,
            uploadedAt: 0
        }
    });
});
