'use strict';

var rendered = function () {
        $('.pwdForm').bootstrapValidator(authValidationRules).on('success.form.bv', function (e) {
            e.preventDefault();
        });
    },
    events = {
        'submit .pwdForm': function (ev) {
            ev.preventDefault();
            var $form = $(ev.target),
                data = getFormObj($form);
            if ($form.data('bootstrapValidator').isValid()) {
                Accounts.changePassword(data.oldPwd, data.newPwd, function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        }
    };

Template.passwordForm.rendered = rendered;
Template.passwordForm.events(events);

Template.privacyForm.rendered = rendered;
Template.privacyForm.events(events);
