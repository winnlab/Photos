Accounts.onCreateUser(function(options, user) {
    if (options && options.profile && options.profile.name) {
        user.username = options.profile.name.replace(' ', '');
    }
    return user;
});
