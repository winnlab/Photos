var shareUploaded = function (err, shareFile, formData, cb) {
    if (err) {
        console.error(err);
    }
    Meteor.call('addShare',
        formData,
        _.pick(shareFile, '_id', 'collectionName'),
        function (err, shareId) {
            console.log(arguments);
            if (err) {
                console.error(err);
            }
            if (cb && typeof cb === 'function') {
                cb(shareId);
            }
        }
    );
};

submitShareForm = function (formData, cb) {
    var file = $('#file')[0].files[0],
        userId = Meteor.userId(),
        fileObj;

    fileObj = new FS.File(file);
    fileObj.userId = userId;

    if (formData.type === 'img') {
        ShareFiles.insert(fileObj, function (err, shareFile) {
            shareUploaded(err, shareFile, formData, cb);
        });
    }

    if (formData.type === 'video') {
        ShareVideo.insert(fileObj, function (err, shareFile) {
            shareUploaded(err, shareFile, formData, cb);
        });
    }
};
