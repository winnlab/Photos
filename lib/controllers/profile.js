ProfileController = RouteController.extend({

    userInfo: function () {
        return Meteor.users.findOne({
            username: this.params.username
        });
    },

    waitOn: function () {
        return [
            Meteor.subscribe('userInfo', this.params.username)
        ];
    },

    data: function () {
        return {
            userInfo: this.userInfo()
        }
    }

});

ProfilePhotosController = ProfileController.extend({

    getCurrentUserId: function () {
        var user = Meteor.users.findOne({ username: this.params.username });
        return user._id;
    },

    waitOn: function () {
        return [
            Meteor.subscribe('userInfo', this.params.username),
            Meteor.subscribe('share', { userId: this.getCurrentUserId() }),
            Meteor.subscribe('shareSource', { userId: this.getCurrentUserId() })
        ];
    },

    data: function () {
        return {
            userInfo: this.userInfo(),
            shares: Share.find()
        }
    }

});

FollowingsController = ProfileController.extend({

    waitOn: function () {
        return [
            Meteor.subscribe('userInfo', this.params.username),
            Meteor.subscribe('usersList')
        ];
    },

    data: function () {
        var targetUser = this.userInfo();
        return {
            userInfo: targetUser,
            users: targetUser.followings && Meteor.users.find({
                _id: { $in: targetUser.followings }
            })
        }
    }

});

FollowersController = FollowingsController.extend({

    data: function () {
        var targetUser = this.userInfo();
        return {
            userInfo: targetUser,
            users: targetUser.followers && Meteor.users.find({
                _id: { $in: targetUser.followers }
            })
        }
    }

});
