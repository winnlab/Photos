'use strict';

var step = new ReactiveVar(1),
    tags = new ReactiveVar([]),
    desc = new ReactiveVar(''),
    changeStep = function (inc) {
        step.set(step.get() + inc);
    }, $fakeTextArea;

Template.addPhotoMobile.helpers({
    step: function () {
        return step.get();
    },
    tags: function () {
        return tags.get();
    },
    isShowPrev: function () {
        var currentStep = step.get();
        if (currentStep === 1 || currentStep >= 3) {
            return false;
        }
        return true;
    },
    isShowNext: function () {
        var currentStep = step.get();
        if (currentStep === 1) {
            return desc.get().length > 5;
        }
        if (currentStep === 2) {
            return tags.get().length >= 3;
        }
        if (currentStep >= 3) {
            return false;
        }
        return false;
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
    'click .start-upload': function () {
        changeStep(1);
    },
    'keyup .upload-desc': function (ev) {
        desc.set(ev.target.value);
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
