var getPageName = function (username) {
    var user = Meteor.user();
    return username === (user && user.username) ?
        'Mein profil' :
        username;
};

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
            userInfo: this.userInfo(),
            pageName: 'Einstellungen'
        };
    },

    action: carouselOnAction

});

ProfilePhotosController = ProfileController.extend({

    getCurrentUserId: function () {
        var user = Meteor.users.findOne({ username: this.params.username });
        return user && user._id;
    },

    waitOn: function () {
        return photoSubscribe(this.params.shareId, [
            Meteor.subscribe('userInfo', this.params.username)
        ]);
    },

    data: function () {
        return {
            userInfo: this.userInfo(),
            userId: this.getCurrentUserId(),
            pageName: getPageName(this.params.username)
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
            userInfo: targetUser,
            pageName: getPageName(this.params.username)
        };
    }

});

FollowersController = FollowingsController.extend({

    data: function () {
        var targetUser = this.userInfo();
        return {
            userInfo: targetUser,
            pageName: getPageName(this.params.username)
        };
    }

});
