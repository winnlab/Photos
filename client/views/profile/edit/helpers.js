Template.profileEdit.helpers({
    payInfo: function () {
        return Session.get('payInfo') || 'paypal';
    }
})
