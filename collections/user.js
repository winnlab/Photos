Meteor.methods({

    setAvatar: function (avatar) {
        return Meteor.users.update({ _id: Meteor.userId() }, {
            $set: {
                'avatar': _.pick(avatar, '_id', 'collectionName')
            }
        });
    },

    setProfile: function (profileData, infoType) {
        var checkList;
        switch (infoType) {
            case 'address':
                checkList = ['street', 'city', 'plz'];
                break;
            case 'bank':
                checkList = ['iban', 'swiftCode'];
                break;
            case 'paypal':
                checkList = ['paypalEmail'];
                break;
        }
        if (!checkList) {
            throw new Meteor.Error('invalid', "You must set a correct info type");
        }
        var user = Meteor.user(),
            profile = user.profile;
        _.each(_.pick(profileData, checkList), function (value, key) {
            profile[key] = value;
        });
        return Meteor.users.update({ _id: user._id }, {
            $set: { profile: profile }
        });
    },

    toggleFollow: function (username) {
        var user = Meteor.user(),
            followingUser;

        if (username == user.username) {
            throw new Meteor.Error("same", "You cannot follow by yourself");
        }

        followingUser = Meteor.users.findOne({ username: username });

        if (!followingUser) {
            throw new Meteor.Error(404, "User that you are trying to follow is not found");
        }

        if (!user.followings || user.followings.indexOf(followingUser._id) === -1) {
            // Add user id in followings array of currentUser
            proceedFollow(user._id, '$push', { followings: followingUser._id });
            proceedFollow(followingUser._id, '$push', { followers: user._id });
        } else {
            // Remove user id from followings array of currentUser
            proceedFollow(user._id, '$pull', { followings: followingUser._id });
            proceedFollow(followingUser._id, '$pull', { followers: user._id });
        }

        function proceedFollow (userId, action, upd) {
            var updQuery = {};
            updQuery[action] = upd
            Meteor.users.update({ _id: userId }, updQuery)
        }

    }

});
