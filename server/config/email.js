Accounts.emailTemplates.siteName = '12Selfie';
Accounts.emailTemplates.from = '12Selfie <12selfie@12selfie.de>';
Accounts.emailTemplates.resetPassword.subject = function () {
    return 'How to reset your password on 12selfie.de';
};
Accounts.emailTemplates.resetPassword.text = function (user, url) {
    return  'Hallo, ' + user.username + '\n\n'
    + 'Um Ihr Passwort zurückzusetzen, klicken Sie einfach auf den Link unten.' + '\n\n'
    + url  + '\n\n'
    + 'Danke Shon.'
};
