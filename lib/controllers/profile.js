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
        };
    }

});

ProfilePhotosController = ProfileController.extend({

    getCurrentUserId: function () {
        var user = Meteor.users.findOne({ username: this.params.username });
        return user && user._id;
    },

    waitOn: function () {
        return [
            Meteor.subscribe('userInfo', this.params.username)
        ];
    },

    data: function () {
        return {
            userInfo: this.userInfo(),
            userId: this.getCurrentUserId()
        };
    }

});

FollowingsController = ProfileController.extend({

    waitOn: function () {
        return [
            Meteor.subscribe('userInfo', this.params.username)
        ];
    },

    data: function () {
        var targetUser = this.userInfo();
        return {
            userInfo: targetUser
        };
    }

});

FollowersController = FollowingsController.extend({

    data: function () {
        var targetUser = this.userInfo();
        return {
            userInfo: targetUser
        };
    }

});
