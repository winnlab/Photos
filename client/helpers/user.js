Template.registerHelper('$isFollowed', function (id) {
    var user = Meteor.user();
    return (user && user.followings && user.followings.indexOf(id) !== -1);
});
