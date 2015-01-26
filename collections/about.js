About = new Mongo.Collection('about');
About.attachSchema(new SimpleSchema({
    title: {
        label: 'Title',
        type: String,
        max: 80
    },
    link: {
        label: 'Link',
        type: String,
        max: 20
    },
    position: {
        label: 'Position (first is greater)',
        type: Number
    },
    description: {
        label: 'Description',
        type: String,
        autoform: {
            afFieldInput: {
                type: 'summernote',
                class: 'editor'
            }
        }
    }
}));
