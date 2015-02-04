'use strict';

var setProfile = function (ev, infoType) {
        ev.preventDefault();
        var $form = $(ev.currentTarget);
        console.log(ev);
        if ($form.data('bootstrapValidator').isValid()) {
            Meteor.call('setProfile', getFormObj($form), infoType);
        }
    };

Template.profileEdit.events({
    'click .logOut': function (ev) {
        ev.preventDefault();

        Meteor.logout(function() {
            Router.go('categories', {
                type: 'neueste'
            });
        });
    },

    'click .togglePwd': function () {
        Session.set('pwd', !Session.get('pwd'));
    },

    'submit .avatarForm': function (ev) {
        ev.preventDefault();
        var file = $('#avatar')[0].files[0],
        user = Meteor.user(),
        userId = user._id,
        fileObj;
        if (!file) {
            return;
        }
        fileObj = new FS.File(file);
        fileObj.userId = userId;

        if (user.avatar) {
            Avatars.remove({ _id: user.avatar._id });
        }
        Avatars.insert(fileObj, function (err, avatar) {
            if (err) {
                console.error(err);
            }
            Meteor.call('setAvatar', _.pick(avatar, ['_id', 'collectionName']), function (err) {
                if (err) {
                    console.error(err);
                }
            });
        });
    },

    'change .payInfo': function (ev) {
        Session.set('payInfo', ev.target.value);
    },

    'submit .addressForm': function (ev) {
        setProfile(ev, 'address');
    },

    'submit .bankForm': function (ev) {
        setProfile(ev, 'bank');
    },

    'submit .paypalForm': function (ev) {
        setProfile(ev, 'paypal');
    }
});
