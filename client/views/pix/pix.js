var columns = new ReactiveVar([]),
    active = new ReactiveVar(),
    getColumns = function () {
        var winWidth = $(window).width(),
            arr = [],
            qty;

        if (winWidth < 768) {
            qty = 1
        } else if (winWidth < 992) {
            qty = 2
        } else if (winWidth < 1200) {
            qty = 3
        } else {
            qty = 4
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
    inColumn: function (i, j) {
        var columnsQty = columns.get().length;
        return (i + (columnsQty - j)) % columnsQty == 0;
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
        active.set(ev.currentTarget.attributes['data-id'].value);
    }
});

Template.pix.rendered = function () {
    getColumns();
    active.set(false);
    if (!Session.get('sortBy')) {
        Session.set('sortBy', 'latest');
    }
}

Template.pix.created = function() {
    $(window).on('resize', getColumns);
};

Template.pix.destroyed = function() {
    $(window).off('resize');
};
