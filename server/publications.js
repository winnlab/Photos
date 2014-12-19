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
