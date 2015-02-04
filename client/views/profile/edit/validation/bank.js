bankValidationRules = {
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
}
