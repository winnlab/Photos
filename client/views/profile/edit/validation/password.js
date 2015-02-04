authValidationRules = {
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
};
