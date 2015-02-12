About = new Mongo.Collection('about');

About.attachSchema(new SimpleSchema({
    title: {
        label: 'Überschrift',
        type: String,
        max: 80
    },
    link: {
        label: 'Link',
        type: String,
        max: 20
    },
    position: {
        label: 'Position (klein nach groß)',
        type: Number
    },
    description: {
        label: 'Beschreibung',
        type: String,
        autoform: {
            afFieldInput: {
                'type': 'summernote',
                'class': 'editor'
            }
        }
    }
}));
