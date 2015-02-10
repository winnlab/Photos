'use strict';

Template.pickUsername.events({
    'submit form': function (ev) {
        ev.preventDefault();
        var $form = $(ev.target),
            username = $form.serializeArray()[0].value;

        if ($form.data('bootstrapValidator').isValid()) {
            Meteor.call('setUsername', username, function (err) {
                if (err) {
                    console.error(err);
                }
                Router.go('/');
            });
        }
    }
});

Template.pickUsername.rendered = function () {
    $('.username-form').bootstrapValidator({
            trigger: null,
            submitButtons: null,
            fields: {
                username: {
                    message: 'Bitte gib deine Benutzername an',
                    validators: {
                        notEmpty: {
                            message: 'Bitte gib deine Benutzername an'
                        }
                    }
                }
            }
        }
    ).on('success.form.bv', function (ev) {
        ev.preventDefault();
    });
};
