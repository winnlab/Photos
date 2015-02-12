carouselOnAction = function () {
    'use strict';
    $('body').trigger('shareView', this.params.shareId);
    this.render();
};

photoSubscribe = function (shareId) {
    return Meteor.subscribe('share', { _id: shareId });
};
