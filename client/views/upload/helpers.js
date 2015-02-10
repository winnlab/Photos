var shareUploaded = function (err, shareFile, formData, cb) {
    if (err) {
        console.error(err);
    }
    Meteor.subscribe('shareSource', {_id: shareFile._id});
    Meteor.call('addShare',
        formData,
        _.pick(shareFile, '_id', 'collectionName'),
        function (err) {
            if (err) {
                console.error(err);
            }
            if (cb && typeof cb === 'function') {
                cb(shareFile._id);
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
