Template.photoUploadForm.rendered = function () {
    // Desc text validation
    // Bitte gib eine Beschreibung an

    // Tags text validation
    // Bitte gib mindestens drei Tags an

    $('.uploadForm').bootstrapValidator({
        message: 'Dieser Wert ist ungültig',
        trigger: null,
        submitButtons: null,
        fields: {
            description: {
                message: 'Bitte gib eine Beschreibung an',
                validators: {
                    notEmpty: {
                        message: 'Bitte gib eine Beschreibung an'
                    },
                    stringLength: {
                        max: 200,
                        trim: true,
                        message: 'Die Anzahl der Zeichen muss weniger als 200 sein'
                    }
                }
            },
            tags: {
                message: 'Bitte gib mindestens drei Tags an',
                validators: {
                    notEmpty: {
                        message: 'Bitte gib mindestens drei Tags an'
                    },
                    zipCode: {
                        message: 'Der Wert ist nicht gültig Postleitzahl'
                    }
                }
            }
        }
    }).on('success.form.bv', function (ev) { ev.preventDefault() });

}
var photoData = {},
    getFormData = function ($form) {
        var data = getFormObj($form),
            query = Router.current().params.query;

        data.tags = _.map(data.tags.split(','), function (tag) {
            return tag.replace(' ', '');
        });

        return _.extend(data, {
            missionId: query && query.missionId,
            categoryId: false,
            type: photoData.fileType
        });
    };


Template.photoUploadForm.events({
    'change #file': function (ev) {
        var file = ev.target.files[0],
            reader = new FileReader();

        photoData.file = !!file;

        if (!file) {
            return false;
        }

        reader.onload = (function(e) {
            if (file.type.indexOf('image') !== -1) {
                $('img.preview-media-object').attr('src', e.target.result);
                photoData.fileType = 'img';
            }
        });

        // Read in the image file as a data URL.
        reader.readAsDataURL(file);
    },

    'submit .uploadForm': function (ev) {
        ev.preventDefault();
        var $form = $(ev.target),
            file = $('#file')[0].files[0],
            userId = Meteor.userId(),
            fileObj;

        if (photoData.file && $form.data('bootstrapValidator').isValid()) {
            fileObj = new FS.File(file);
            fileObj.userId = userId;

            ShareFiles.insert(fileObj, function (err, shareFile) {
                if (err) {
                    console.error(err);
                }
                Meteor.call('addShare',
                    getFormData($form),
                    _.pick(shareFile, '_id', 'collectionName'),
                    function (err) {
                        if (err) {
                            console.error(err);
                        }
                    }
                );
            });
        }
    }
});
