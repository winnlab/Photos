var $carousel,
    imgWrapperHeight = new ReactiveVar(),
    imgSize = function () {
        var footer = $(".slide-container-footer:visible"),
            footerHeight = footer.length ? footer.outerHeight() : 0,
            wrapperHeight = $(window).height() - footerHeight;
        return imgWrapperHeight.set(wrapperHeight)
    }

Template.carousel.helpers({
    photoAction: function () {
        return null;
    },
    since: function (time) {
        return 'vor 4 Tagen';
    },
    manySlides: function () {
        return true;
    },
    // Variables
    deleteSuccessMessage: function () {

    },
    deleteErrorMessage: function () {

    },
    flagSuccessMessage: function () {
        return false;
    },
    containerSize: function () {
        var wrapperHeight = imgWrapperHeight.get() || 0;
        return {
            style: 'height: ' + wrapperHeight + 'px; line-height:' + wrapperHeight + 'px;'
        }
    },
    activeSlides: function () {
        console.log(arguments);
        return [];
    }
})

Template.carousel.events({

    'click .close': function (ev, template) {
        template.data.active.set(false);
    },

    'click .carousel-control': function (ev) {
        $carousel.carousel($(ev.target).data('slide'));
    },

    'click .toggleLike': function (ev) {
        ev.preventDefault();
    },

    'click .togglePhotoAction': function (ev) {
        ev.preventDefault();
    },

    'click .openSharer': function(ev) {
        ev.preventDefault();

        var product = $(ev.target).data('product'),
            url = Router.current().originalUrl,
            $window = window;

        switch (product) {
            case "link":
                $window.prompt("Zum Kopieren: Ctrl+C drücken (CMD+C auf dem Mac)", url);
                break;
            case "facebook":
                $window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url), "facebook-share-dialog", "width=626,height=436");
                break;
            case "twitter":
                $window.open("https://twitter.com/share?url=" + encodeURIComponent(url), "twitter-share-dialog", "width=626,height=436");
                break;
            case "googleplus":
                $window.open("https://plus.google.com/share?url=" + encodeURIComponent(url), "googleplus-share-dialog", "width=626,height=436");
        }
    },

    'click .conversion-banner-close': function (ev) {
        ev.preventDefault();
    },

    'click .to-register-button': function (ev) {
        ev.preventDefault();
    },

    /**
     * Delete
     */

    'click .delete-btn': function () {

    },

    'click .cancel-btn': function () {

    },

    /**
    * Flagging
    */

    'click .flagging-reason': function (ev) {
        var reason = $(ev.target).data('reason');
    }

});

Template.carousel.rendered = function () {
    imgSize();
    $carousel = $('#photoCarousel');
    $carousel.carousel()
}

Template.carousel.created = function() {
    $(window).on('resize', imgSize);
};

Template.carousel.destroyed = function() {
    $(window).off('resize');
};
