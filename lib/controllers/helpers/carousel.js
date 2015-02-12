carouselOnAction = function () {
    'use strict';
    $('body').trigger('shareView', this.params.shareId);
    this.render();
};

photoSubscribe = function (shareId, subscribeArr) {
    var subscribe = null;
    if (shareId) {
        subscribe = Meteor.subscribe('share', { _id: shareId });
    }
    if (typeof subscribeArr !== 'undefined' && subscribeArr.length) {
        if (subscribe) {
            subscribeArr.push(subscribe);
        }
        return subscribeArr;
    } else {
        return subscribe;
    }
};
