Themes = new Mongo.Collection('themes');

Themes.attachSchema(new SimpleSchema({
    name: {
        label: 'Name',
        type: String,
        max: 60
    },
    link: {
        label: 'Link',
        type: String,
        max: 60
    },
    position: {
        label: 'Position',
        type: Number
    },
    title: {
        label: 'Überschrift',
        optional: true,
        type: String,
        max: 200
    },
    uploadsQty: {
        label: 'Hochgeladene Menge',
        type: Number,
        optional: true,
        autoform: {
            disabled: true
        }
    },
    displayFilters: {
        label: 'Anzeige: Sortierung',
        type: Boolean
    },
    displayUploadButton: {
        label: 'Anzeige Hochlade Button',
        type: Boolean
    },
    bgImg: {
        label: 'Hintergrundbild',
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
