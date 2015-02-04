'use strict';

Template.accountForm.rendered = function () {
    $('.addressForm').bootstrapValidator(adressValidationRules).on('success.form.bv', function (e) {
        e.preventDefault();
    });
};
