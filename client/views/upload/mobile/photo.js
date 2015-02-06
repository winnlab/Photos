'use strict';

var step = new ReactiveVar(1),
    tags = new ReactiveVar([]),
    desc = new ReactiveVar(''),
    fileType = new ReactiveVar(''),
    getFormData = function () {
        var query = Router.current().params.query;
        return {
            tags: tags.get(),
            description: desc.get(),
            missionId: (query && query.missionId) || null,
            themeId: (query && query.themeId) || null,
            type: fileType.get(),
            time: Date.now()
        };
    },
    changeStep = function (inc) {
        step.set(step.get() + inc);
    }, $fakeTextArea, shareFileId;

Template.addPhotoMobile.helpers({
    step: function () {
        return step.get();
    },
    tags: function () {
        return tags.get();
    },
    isShowPrev: function () {
        var currentStep = step.get();
        if (currentStep === 1 || currentStep >= 4) {
            return false;
        }
        return true;
    },
    isShowNext: function () {
        var currentStep = step.get();
        switch (currentStep) {
            case 1:
                return !!fileType.get();
            case 2:
                return desc.get().length > 5;
            case 3:
                return tags.get().length >= 3;
            default:
                return false;
        }
    },
    uploadTitle: function () {
        var query = Router.current().params.query,
            mission, theme;

        if (query) {
            if (query.missionId) {
                mission = Missions.findOne({_id: query.missionId});
                return 'Für Mission ' + (mission ? mission.name : '');
            }
            if (query.themeId) {
                theme = Themes.findOne({_id: query.themeId});
                return 'Für Kathegorie ' + (theme ? theme.name : '');
            }
        } else {
            return 'ins Profil';
        }
    }
});

Template.addPhotoMobile.events({
    'click .prev': function () {
        changeStep(-1);
    },
    'click .next': function () {
        changeStep(1);
    },
    'click .fake-textarea': function () {
        $('.tags')[0].focus();
    },
    'keydown .tags': function (ev) {
        if (ev.keyCode === 32) {
            var newTags = tags.get();
            newTags.push(ev.target.value);
            tags.set(newTags);
            ev.target.value = '';
            $fakeTextArea.html('');
            ev.preventDefault();
        }
        if (ev.keyCode === 8 && ev.target.value === '') {
            var oldTags = tags.get();
            oldTags.pop();
            tags.set(oldTags);
        }
    },
    'keyup .tags': function (ev) {
        $fakeTextArea.html(ev.target.value);
    },
    'click .remove': function (ev) {
        var index = $(ev.target).closest('.tag').index(),
            oldTags = tags.get();
        oldTags.splice(index, 1);
        tags.set(oldTags);
    },
    'keyup .upload-desc': function (ev) {
        desc.set(ev.target.value);
    },
    'change #file': function (ev) {
        var file = ev.target.files[0],
            reader = new FileReader();
        if (!file) {
            return false;
        }
        reader.onload = function (e) {
            if (file.type.indexOf('image') !== -1) {
                fileType.set('image');
                $('.share-container').css('background-image', 'url(' + e.target.result + ')');
            }
        };
        reader.readAsDataURL(file);
    },
    'click .start-upload': function () {
        submitShareForm(getFormData(), function (_id) {
            shareFileId = _id;
            changeStep(1);
        });
    },
    'click .social-share': function () {
        FB.api('/me/photos', 'POST', {
            url: window.location.origin + ShareFiles.findOne({ _id: shareFileId }).url({ storage: 'shares' }),
            message: desc.get()
        }, function (response) {});
        Router.go('categories', { type: 'neueste' });
    }
});

Template.addPhotoMobile.created = function () {
    $('html').addClass('upload-page');
};

Template.addPhotoMobile.rendered = function () {
    $fakeTextArea = $('.hash-content');
};

Template.addPhotoMobile.destroyed = function () {
    $('html').removeClass('upload-page');
};
