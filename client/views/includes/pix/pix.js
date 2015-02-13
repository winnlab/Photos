'use strict';
var columns = new ReactiveVar([]),
    active = new ReactiveVar(),
    getColumns = function () {
        var winWidth = $(window).width(),
            arr = [],
            qty;

        if (winWidth < 300) {
            qty = 1;
        } else if (winWidth < 767) {
            qty = 2;
        } else if (winWidth < 992) {
            qty = 3;
        } else {
            qty = 4;
        }

        for (var i = 0; i < qty; i += 1) {
            arr.push({ key: i });
        }
        columns.set(arr);
    };

Template.pix.helpers({
    columns: function () {
        return columns.get();
    },
    columnsQty: function () {
        return columns.get().length;
    },
    inColumn: function (i, j) {
        var columnsQty = columns.get().length;
        return (i + (columnsQty - j)) % columnsQty === 0;
    },
    show: function () {
        return active.get();
    },
    active: function () {
        return active;
    }
});

Template.pix.events({
    'click .order-selector': function (e) {
        e.preventDefault();
        Session.set('sortBy', e.target.attributes['data-sort'].value);
    },
    'click .showShare': function (ev) {
        var shareId = ev.currentTarget.attributes['data-id'].value;
        setShareId(shareId);
        active.set(shareId);
    }
});

Template.pix.rendered = function () {
    getColumns();
    active.set(Router.current().params.shareId);
    if (!Session.get('sortBy')) {
        Session.set('sortBy', 'top');
    }
};

Template.pix.created = function() {
    $(window).on('resize', getColumns);
    $('body').on('shareView', function (ev, shareId) {
        active.set(shareId, !!shareId ? shareId : null);
    });
};

Template.pix.destroyed = function() {
    $(window).off('resize');
    $('body').off('shareView');
};
