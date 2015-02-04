'use strict';

var preventValidator = function (e) {
    e.preventDefault();
};

Template.profileEdit.rendered = function () {
    Session.set('payInfo', 'paypal');
    Session.set('pwd', false);

    $('.addressForm').bootstrapValidator(adressValidationRules).on('success.form.bv', preventValidator);

    $('.bankForm').bootstrapValidator(bankValidationRules).on('success.form.bv', preventValidator);

    $('.paypalForm').bootstrapValidator(payPalValidationRules).on('success.form.bv', preventValidator);
};
