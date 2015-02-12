'use strict';

var signInTemplate = (function () {
        return Meteor.Device.isPhone() || Meteor.Device.isTablet() ? 'mobileSignIn' : false;
    }()),
    signUpTemplate = (function () {
        return Meteor.Device.isPhone() || Meteor.Device.isTablet() ? 'mobileSignUp' : false;
    }());

Meteor.startup(function () {

    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_AND_EMAIL',
        requestPermissions: {
            facebook: ['public_profile', 'publish_actions']
        }
    });

    accountsUIBootstrap3.map('de', {
        loginButtonsLoggedOutDropdown: {
            signIn: 'Login',
            up: 'Neu Anmelden'
        }
    });

    accountsUIBootstrap3.setLanguage('de');

    AccountsEntry.config({
        signInTemplate: signInTemplate,
        signUpTemplate: signUpTemplate,
        homeRoute: '/',
        dashboardRoute: '/',
        profileRoute: 'profile',
        language: 'de',
        passwordSignupFields: 'USERNAME_AND_EMAIL'
    });
});
