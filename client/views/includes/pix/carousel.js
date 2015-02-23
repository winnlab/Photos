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
    },
    closeShareView = function (err, template) {
        if (err) {
            console.error(err);
        }
        setShareId(null);
        photoAction.set(null);
        template.data.active.set(false);
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
    // controls visibility of navigation and close buttons
    isNavVisible: function () {
        return (Meteor.Device.isPhone() || Meteor.Device.isTablet()) &&
            photoAction.get() === 'comment';
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
        var share, store, url;
        if (this.type === 'img') {
            share = ShareFiles.findOne({ _id: this.source._id });
            store = 'shares';
        }
        if (this.type === 'video') {
            share = ShareVideo.findOne({ _id: this.source._id });
            store = 'share-video-thumb';
        }
        url = function () {
            return share ? share.url({ store: store }) : '';
        };
        return share ? {
            title: this.description,
            author: this.username,
            description: '12Selfie - Geld verdienen mit deinen Handy-Fotos!',
            excerpt: '12Selfie - Geld verdienen mit deinen Handy-Fotos!',
            summary: '12Selfie - Geld verdienen mit deinen Handy-Fotos!',
            image: url,
            thumbnail: url
        } : {};
    }
});

Template.carousel.events({

    'click .close': function (ev, template) {
        ev.preventDefault();
        closeShareView(false, template);
    },

    'click .carousel-control': function (ev) {
        var video = $('.item.active').find('video');
        if (video.length) {
            video[0].pause();
        }
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

    'click .block': function (ev, template) {
        ev.preventDefault();
        var shareId = $(ev.target).parents('.item')[0].attributes['data-id'].value,
            block = !!parseInt($(ev.target)[0].attributes['data-block'].value, 10);
        Meteor.call('toggleBlockShare', shareId, block, function (err) {
            closeShareView(err, template);
        });
    },

    'click .complaint': function (ev, template) {
        ev.preventDefault();
        var $el = $(ev.target),
            shareId = $el.parents('.item')[0].attributes['data-id'].value,
            reason = $el[0].attributes['data-reason'].value;
        Meteor.call('complaintOnShare', shareId, reason, function (err) {
            photoAction.set(null);
        });
    },

    'click video': function (ev) {
        var video = ev.target;
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    },

    /**
     * Delete
     */

    'click .delete-btn': function (ev, template) {
        ev.preventDefault();
        var shareId = $(ev.target).parents('.item')[0].attributes['data-id'].value;

        Meteor.call('removeShare', shareId, function (err) {
            closeShareView(err, template);
        });
    },

    'click .cancel-btn': function (ev) {
        ev.preventDefault();
        photoAction.set(null);
    }

});

Template.carousel.rendered = function () {
    photoAction.set(null);
    $carousel = $('#photoCarousel');
    $carousel.carousel({ interval: false });
    $carousel.on('slid.bs.carousel', function (e) {
        var id = e.relatedTarget.attributes['data-id'].value;
        Meteor.defer(function () {
            setShareId(id);
        });
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
