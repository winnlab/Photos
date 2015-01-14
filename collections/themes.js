Themes = new Mongo.Collection('themes');

Themes.attachSchema(new SimpleSchema({
    name: {
        label: "Name",
        type: String,
        max: 60
    },
    link: {
        label: "Link",
        type: String,
        max: 60
    },
    position: {
        label: "Position",
        type: Number
    },
    title: {
        label: "Title",
        optional: true,
        type: String,
        max: 200
    },
    uploadsQty: {
        label: 'Uploads quantity',
        type: Number,
        optional: true,
        autoform: {
            disabled: true
        }
    },
    displayFilters: {
        label: 'Display sort buttons',
        type: Boolean
    },
    displayUploadButton: {
        label: 'Display upload button',
        type: Boolean
    },
    bgImg: {
        type: String,
        optional: true,
        autoform: {
            type: 'fileUpload',
            collection: 'ThemeBg'
        }
    }
}));

ThemeBg = new FS.Collection('themeBg', {
    stores: [
        new FS.Store.FileSystem('theme-bg')
    ],
    filter: {
        allow: {
            contentTypes: ['image/*'] //allow only images in this FS.Collection
        }
    }
});

ThemeBg.allow({
    insert: function (userId) { return !!userId; },
    update: function (userId) { return !!userId; },
    remove: function (userId) { return !!userId; },
    download: function () { return true; }
});
