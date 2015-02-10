Accounts.onCreateUser(function(options, user) {
    if (user && user.services && user.services.facebook) {
        user.username = user.services.facebook.link.split('app_scoped_user_id/')[1].slice(0, -1);
        user.generatedUsername = 1;
    }
    return user;
});
