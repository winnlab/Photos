'use strict';

Meteor.startup(function () {
    AccountsEntry.config({
        homeRoute: '/',
        dashboardRoute: '/',
        profileRoute: 'profile',
        language: 'de',
        passwordSignupFields: 'USERNAME_AND_EMAIL',
        signInTemplate: (function () {
            return Meteor.Device.isPhone() || Meteor.Device.isTablet() ? 'mobileSignIn' : false;
        }()),
        signUpTemplate: (function () {
            return Meteor.Device.isPhone() || Meteor.Device.isTablet() ? 'mobileSignUp' : false;
        }())
    });

    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_AND_EMAIL'
    });

    accountsUIBootstrap3.map('de', {
        loginButtonsLoggedOutDropdown: {
            signIn: 'Login',
            up: 'Neu Anmelden'
        }
    });

    accountsUIBootstrap3.setLanguage('de');
});
