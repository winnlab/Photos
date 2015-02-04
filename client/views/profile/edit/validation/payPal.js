payPalValidationRules = {
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
}
