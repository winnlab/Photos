'use strict';

var $searchContainer,
    $searchInput,
    $document,
    adjustInputFieldSize = function() {
        var maxWidth,
            safeRegion = 10,
            searchContainerWidth = $searchContainer.width(),
            widthForTagItems = 0;

        _.each($('.tag'), function (tag, i) {
            widthForTagItems += $(tag).outerWidth(!0) + (i > 0 ? 10 : 0);
        });

        maxWidth = searchContainerWidth - widthForTagItems - safeRegion;

        $searchInput.css('width', maxWidth);
    },
    addTag = function (template, value) {
        var tags = template.tags.get();
        $searchInput.val('');
        template.suggest.set('');
        if (tags.indexOf(value) === -1) {
            tags.push(value.toLowerCase());
            template.tags.set(tags);
            Meteor.setTimeout(adjustInputFieldSize, 1);
        }
    };

Template.search.helpers({
    tags: function () {
        return Template.instance().tags.get();
    },
    suggested: function () {
        return Tags.find();
    },
    shares: function () {
        return Share.find();
    },
    adjustPosition: function () {
        var top = $searchInput.offset().top + $searchInput.height() + 27 - $document.scrollTop(),
            left = $searchInput.offset().left;
        return 'top:' + top.toString() + 'px; left:' + left.toString() + 'px;';
    }
});

Template.search.events({
    'click .addTag': function (ev, template) {
        var value = ev.target.attributes['data-name'].value;
        addTag(template, value);
        $searchInput.focus();
    },
    'mouseenter .addTag': function (ev) {
        $('.tag').removeClass('active');
        $(ev.currentTarget).addClass('active');
    },
    'mouseleave .addTag': function (ev) {
        $(ev.currentTarget).removeClass('active');
    },
    'keydown .tag-input': function (ev) {
        var up = 38,
            down = 40,
            activeTag, nextTag;
        if ((ev.keyCode === up || ev.keyCode === down) && $('.addTag').length) {
            ev.preventDefault();
            activeTag = $('.addTag.active');
            if (!activeTag.length) {
                return $('.addTag:eq(0)').addClass('active');
            }
            switch (ev.keyCode) {
                case up:
                    nextTag = activeTag.prev();
                    break;
                case down:
                    nextTag = activeTag.next();
                    break;
            }
            if (nextTag.length) {
                activeTag.removeClass('active');
                nextTag.addClass('active');
            }
        }
    },
    'keyup .tag-input': function (ev, template) {
        var value = $(ev.target).val(),
            currentSugges = template.suggest.get(),
            tags = template.tags.get(),
            activeTag;
        if (value === ' ') {
            return $(ev.target).val('');
        }
        if (ev.keyCode === 32) {
            addTag(template, value.replace(' ', ''));
        } else if (ev.keyCode === 13) {
            activeTag = $('.addTag.active');
            addTag(template, activeTag.length ? activeTag.data('name') : value);
        } else {
            template.suggest.set(value);
        }
        if (ev.keyCode == 8 && !currentSugges.length) {
            tags.pop();
            template.tags.set(tags);
            Meteor.setTimeout(adjustInputFieldSize, 1);
        }
    },
    'click .remove-tag': function (ev, template) {
        var index = $(ev.target).parents('li').index() - 1,
            tags = template.tags.get();
        $searchInput.val('');
        template.suggest.set('');
        tags.splice(index, 1);
        template.tags.set(tags);
        Meteor.setTimeout(adjustInputFieldSize, 1);
    },
    'click .remove-all-tags': function (ev, template) {
        template.tags.set([]);
    },
    'click .go-back': function (ev) {
        ev.preventDefault();
        if (history && history.go) {
            history.go(-1);
        } else {
            Router.go('categories', { type: 'neueste' });
        }
    }
});

Template.search.created = function () {
    var searchParams = Router.current().params.search,
        instance = this;

    setupPagination(instance);
    instance.tags = new ReactiveVar(searchParams ? decodeURIComponent(searchParams.toLowerCase()).split(',') : []);
    instance.suggest = new ReactiveVar('');

    instance.autorun(function () {
        var tags = instance.tags.get(),
            suggest = instance.suggest.get(),
            shareQuery = {
                tags: { $all: tags }
            },
            shareOptions = {
                limit: instance.limit.get(),
                sort: { time: -1 }
            },
            subscription = Meteor.subscribe('tags', suggest.toString(), tags);
        if (tags.length) {
            Meteor.subscribe('share', shareQuery, shareOptions);
            Meteor.subscribe('shareSource', shareQuery, shareOptions);
        }
        subscription.ready();
    });

    $('.search').hide();
};

Template.search.rendered = function () {
    $searchContainer = $('#search-tags');
    $searchInput = $('.tag-input');
    $document = $(document);
    adjustInputFieldSize();
};

Template.search.destroyed = function () {
    $(window).off('scroll');
    $('.search').show();
};
