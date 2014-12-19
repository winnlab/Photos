var preventValidator = function (e, data) {
    e.preventDefault();
}

Template.profileEdit.rendered = function () {
    Session.set('payInfo', 'paypal');
    Session.set('pwd', false);

    $('.addressForm').bootstrapValidator({
        message: 'Dieser Wert ist ungültig',
        trigger: null,
        submitButtons: null,
        fields: {
            street: {
                message: 'Bitte gib deine Strasse an',
                validators: {
                    notEmpty: {
                        message: 'Bitte gib deine Strasse an'
                    },
                    stringLength: {
                        max: 50,
                        min: 10,
                        trim: true,
                        message: 'Die Adresse muss mehr als 10 und weniger als 50 Zeichen lang sein'
                    }
                }
            },
            plz: {
                message: 'Bitte gib deine PLZ an',
                validators: {
                    notEmpty: {
                        message: 'Bitte gib deine PLZ an'
                    },
                    zipCode: {
                        message: 'Der Wert ist nicht gültig Postleitzahl'
                    }
                }
            },
            city: {
                message: 'Bitte gib deinen Ort an',
                validators: {
                    notEmpty: {
                        message: 'Bitte gib deinen Ort an'
                    },
                    stringLength: {
                        max: 30,
                        min: 3,
                        trim: true,
                        message: 'Die Stadt muss mehr als 3 und weniger als 30 Zeichen lang sein'
                    }
                }
            }
        }
    }).on('success.form.bv', preventValidator);

    $('.bankForm').bootstrapValidator({
        message: 'Dieser Wert ist ungültig',
        trigger: null,
        submitButtons: null,
        fields: {
            iban: {
                message: 'Bitte gib deine IBAN an',
                validators: {
                    notEmpty: {
                        message: 'Bitte gib deine IBAN an'
                    },
                    iban: {
                        country: 'DE',
                        message: 'Der Wert ist nicht gültig IBAN'
                    }
                }
            },
            swiftCode: {
                message: 'Bitte gib deine SWIFT code an',
                validators: {
                    notEmpty: {
                        message: 'Bitte gib deine SWIFT code an'
                    },
                    stringLength: {
                        max: 30,
                        min: 3,
                        trim: true,
                        message: 'Die SWIFT code muss mehr als 3 und weniger als 30 Zeichen lang sein'
                    }
                }
            }
        }
    }).on('success.form.bv', preventValidator);

    $('.paypalForm').bootstrapValidator({
        message: 'Dieser Wert ist ungültig',
        trigger: null,
        submitButtons: null,
        fields: {
            paypalEmail: {
                message: 'Bitte gib deine E-Mail-Adresse an',
                validators: {
                    notEmpty: {
                        message: 'Bitte gib deine E-Mail-Adresse an'
                    },
                    emailAddress: {
                        message: 'Der Wert ist keine gültige E-Mail-Adresse'
                    }
                }
            }
        }
    }).on('success.form.bv', preventValidator);
}
