'use strict';

var $carousel,
    imgWrapperHeight = new ReactiveVar(),
    photoAction = new ReactiveVar(),
    conversionClosed = new ReactiveVar(false),
    imgSize = function () {
        var footer = $('.slide-container-footer:visible'),
            footerHeight = footer.length ? footer.outerHeight() : 0,
            wrapperHeight = $(window).height() - footerHeight;
        return imgWrapperHeight.set(wrapperHeight);
    };

Template.pixBtns.helpers({
    isLiked: function (likes) {
        return likes.indexOf(Meteor.userId()) !== -1;
    }
});

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
        };
    },
    shareData: function() {
        var img = ShareFiles.findOne({ _id: this.source._id }),
            url = function () {
                return img.url({ store: 'shares' });
            };
        return img ? {
            title: this.description,
            author: this.username,
            excerpt: '12Selfie - Geld verdienen mit deinen Handy-Fotos!',
            description: '12Selfie - Geld verdienen mit deinen Handy-Fotos!',
            summary: '12Selfie - Geld verdienen mit deinen Handy-Fotos!',
            thumbnail: url,
            image: url
        } : {};
    }
});

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
            setShareId(null);
            photoAction.set(null);
            template.data.active.set(false);
        });
    },

    'click .cancel-delete-btn': function (ev) {
        ev.preventDefault();
        photoAction.set(null);
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
    Meteor.defer(imgSize);
    Meteor.setTimeout(imgSize, 100);
};

Template.carousel.created = function() {
    $(window).on('resize', imgSize);
    $('html').addClass('noScroll');
};

Template.carousel.destroyed = function() {
    $('html').removeClass('noScroll');
    $(window).off('resize');
    $carousel.off('slide.bs.carousel');
};
