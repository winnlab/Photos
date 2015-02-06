carouselOnAction = function () {
    'use strict';
    $('body').trigger('shareView', this.params.shareId);
    this.render();
};
