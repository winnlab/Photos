var columns = new ReactiveVar([]),
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
    avatar: function (userId) {
        var user = Meteor.users.findOne({ _id: userId }),
            avatar = user.avatar._id && Avatars.findOne({ _id: user.avatar._id });
        return avatar ? avatar.url() : '/img/generic-avatar_transparent.png';
    },
    getImage: function (_id, store) {
        var img = ShareFiles.findOne({ _id: _id }),
            options = store ? { store: store } : null;
        return img ? img.url(options) : '/img/generic-avatar_transparent.png';
    },
    columns: function () {
        return columns.get();
    },
    inColumn: function (i, j) {
        var columnsQty = columns.get().length;
        return (i + (columnsQty - j)) % columnsQty == 0;
    }
});

Template.pix.rendered = function () {
    getColumns();
}

Template.pix.created = function() {
    $(window).on('resize', getColumns);
};

Template.pix.destroyed = function() {
    $(window).off('resize');
};
