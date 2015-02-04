'use strict';

var payType = new ReactiveVar(false);

Template.payForm.events({
    'change .payInfo': function (ev) {
        payType.set(ev.target.value);
    }
});

Template.payForm.helpers({
    payType: function () {
        return payType.get();
    }
});

Template.payForm.destroyed = function () {
    payType.set(false);
};

Template.payForm.rendered = function () {
    var preventValidator = function (e) {
        e.preventDefault();
    };
    $('.bankForm').bootstrapValidator(bankValidationRules).on('success.form.bv', preventValidator);
    $('.paypalForm').bootstrapValidator(payPalValidationRules).on('success.form.bv', preventValidator);
};
