Template.passwordForm.rendered = function () {
    $('.pwdForm').bootstrapValidator({
        message: 'Dieser Wert ist ungültig',
        trigger: null,
        submitButtons: null,
        fields: {
            oldPwd: {
                message: 'Bitte gib deine  an',
                validators: {
                    notEmpty: {
                        message: 'Bitte gib deine an'
                    },
                    stringLength: {
                        max: 20,
                        min: 6,
                        message: 'Die neus Passwort muss mehr als 6 und weniger als 20 Zeichen lang sein'
                    }
                }
            },
            newPwd: {
                message: 'Bitte gib deine an',
                validators: {
                    notEmpty: {
                        message: 'Bitte gib deine an'
                    },
                    identical: {
                        field: 'cNewPwd',
                        message: 'Das Kennwort und seine Bestätigung sind nicht dasselbe'
                    },
                    stringLength: {
                        max: 20,
                        min: 6,
                        message: 'Die neus Passwort muss mehr als 6 und weniger als 20 Zeichen lang sein'
                    }
                }
            },
            cNewPwd: {
                message: 'Bitte gib deine an',
                validators: {
                    notEmpty: {
                        message: 'Bitte gib deine an'
                    },
                    identical: {
                        field: 'newPwd',
                        message: 'Das Kennwort und seine Bestätigung sind nicht dasselbe'
                    },
                    stringLength: {
                        max: 20,
                        min: 6,
                        message: 'Die neus Passwort muss mehr als 6 und weniger als 20 Zeichen lang sein'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
    });
}

Template.passwordForm.events({
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
});
