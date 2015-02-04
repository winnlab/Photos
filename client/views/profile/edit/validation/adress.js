adressValidationRules = {
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
};
