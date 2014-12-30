var $carousel,
    imgWrapperHeight = new ReactiveVar(),
    photoAction = new ReactiveVar(),
    conversionClosed = new ReactiveVar(false),
    imgSize = function () {
        var footer = $(".slide-container-footer:visible"),
            footerHeight = footer.length ? footer.outerHeight() : 0,
            wrapperHeight = $(window).height() - footerHeight;
        return imgWrapperHeight.set(wrapperHeight)
    }

Template.carousel.helpers({
    photoAction: function () {
        return photoAction.get();
    },
    since: function (time) {
        return moment(time).fromNow();
    },
    manySlides: function () {
        return !!(Template.instance().data.shares.count() > 1);
    },
    isLiked: function (likes) {
        return likes.indexOf(Meteor.userId()) !== -1;
    },
    // Variables
    conversionClosed: function () {
        return conversionClosed.get();
    },
    flagSuccessMessage: function () {
        return false;
    },
    containerSize: function () {
        var wrapperHeight = imgWrapperHeight.get() || 0;
        return {
            style: 'height: ' + wrapperHeight + 'px; line-height:' + wrapperHeight + 'px;'
        }
    }
})

Template.carousel.events({

    'click .close': function (ev, template) {
        setShareId(null);
        template.data.active.set(false);
    },

    'click .carousel-control': function (ev, template) {
        photoAction.set(null);
        $carousel.carousel($(ev.target).data('slide'));
    },

    'click .toggleLike': function (ev) {
        ev.preventDefault();
        var id = $(ev.target).parents('.item')[0].attributes['data-id'].value;
        Meteor.call('toggleLike', id);
    },

    'click .togglePhotoAction': function (ev) {
        ev.preventDefault();
        var currentAction = photoAction.get(),
            action = ev.currentTarget.attributes['data-action'].value;
        photoAction.set(action !== currentAction ? action : null);
    },

    'click .openSharer': function(ev) {
        ev.preventDefault();
        var product = $(ev.currentTarget).data('product'),
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
        conversionClosed.set(true);
    },

    'click .to-register-button': function (ev) {
        ev.preventDefault();
    },

    /**
     * Delete
     */

    'click .delete-btn': function (ev, template) {
        ev.preventDefault();
        var shareId = $(ev.target).parents('.item')[0].attributes['data-id'].value;

        Meteor.call('removeShare', shareId, function (err) {
            if (err) {
                console.error(err);
            }
            photoAction.set(null);
            template.data.active.set(false);
        });
    },

    'click .cancel-delete-btn': function (ev) {
        ev.preventDefault();
        photoAction.set(null);
    },

    /**
    * Flagging
    */

    'click .flagging-reason': function (ev) {
        var reason = $(ev.target).data('reason');
    }

});

Template.carousel.rendered = function () {
    photoAction.set(null);
    $carousel = $('#photoCarousel');
    $carousel.carousel({ interval: false });
    $carousel.on('slide.bs.carousel', function (e) {
        var id = e.relatedTarget.attributes['data-id'].value;
        setShareId(id);
    });
    imgSize();
}

Template.carousel.created = function() {
    $(window).on('resize', imgSize);
    $('body').addClass('noScroll');
};

Template.carousel.destroyed = function() {
    $('body').removeClass('noScroll');
    $(window).off('resize');
    $carousel.off('slide.bs.carousel');
};
