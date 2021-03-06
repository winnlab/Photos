'use strict';
Template.photoUploadForm.rendered = function () {
    $('.uploadForm').bootstrapValidator({
        message: 'Dieser Wert ist ungültig',
        trigger: null,
        live: false,
        submitButtons: null,
        fields: {
            agree: {
                message: ' ',
                validators: {
                    notEmpty: {
                        message: ' '
                    }
                }
            },
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
                    stringLength: {
                        max: 200,
                        trim: true,
                        message: 'Die Anzahl der Zeichen muss weniger als 200 sein'
                    },
                    callback: {
                        message: 'Bitte gib mindestens drei Tags an',
                        callback: function (value) {
                            var count = 0;
                            _.each(value.split(','), function (tag) {
                                if (tag.replace(' ', '').length) {
                                    count += 1;
                                }
                            });
                            return count >= 3;
                        }
                    }
                }
            }
        }
    }).on('success.form.bv', function (ev) { ev.preventDefault(); });
};

var status = new ReactiveVar('waiting'),
    photoData = {},
    getFormData = function ($form, template) {
        var data = getFormObj($form),
            query = Router.current().params.query;

        data.tags = _.map(data.tags.split(','), function (tag) {
            return tag.replace(' ', '');
        });

        return _.extend(data, {
            missionId: (query && query.missionId) || null,
            themeId: (template.data && template.data.themeId) || null,
            type: photoData.fileType,
            time: Date.now()
        });
    },
    resetForm = function (form) {
        form.reset();
        $('img.preview-media-object').attr('src', '').addClass('hide');
        $('video.preview-media-object').attr('src', '').addClass('hide');
        status.set('uploaded');
    };

Template.photoUploadForm.helpers({
    status: function () {
        return status.get();
    }
});

Template.photoUploadForm.events({
    'change #file': function (ev) {
        var file = ev.target.files[0],
            reader = new FileReader();

        photoData.file = !!file;

        if (!file) {
            return false;
        }

        status.set('waiting');

        $('.preview-media-object').addClass('hide');

        if (file.type.indexOf('image') !== -1) {
            reader.onload = function (e) {
                $('img.preview-media-object').attr('src', e.target.result).removeClass('hide');
                photoData.fileType = 'img';
            };
            // Read in the image file as a data URL.
            reader.readAsDataURL(file);
        }
        if (file.type.indexOf('video') !== -1) {
            if (navigator.userAgent.toLowerCase().indexOf('chrome') !== -1) {
                $('video.preview-media-object').attr('src', URL.createObjectURL(file)).removeClass('hide');
            } else {
                $('span.preview-media-object').text('File name: ' + file.name).removeClass('hide');
            }
            photoData.fileType = 'video';
        }
    },

    'submit .uploadForm': function (ev, template) {
        ev.preventDefault();
        var $form = $(ev.target),
            formData;

        if (photoData.file && $form.data('bootstrapValidator').isValid()) {
            status.set('loading');
            formData = getFormData($form, template);
            submitShareForm(formData, function () {
                resetForm(ev.target);
            });
        }
    }
});
