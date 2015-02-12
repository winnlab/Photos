Avatars = new FS.Collection('avatars', {
    stores: [
        new FS.Store.FileSystem('thumbs', {
            beforeWrite: renameFile,
            transformWrite: function(fileObj, readStream, writeStream) {
                // Transform the image into a 50x50 thumbnail
                gm(readStream, fileObj.name()).autoOrient().resize('50', '50', '^').gravity('Center').extent('50', '50').stream().pipe(writeStream);
            }
        }),
        new FS.Store.FileSystem('avatars', {
            beforeWrite: renameFile,
            transformWrite: function(fileObj, readStream, writeStream) {
                // Transform the image into a 280x280 thumbnail
                gm(readStream, fileObj.name()).autoOrient().resize('280', '280', '^').gravity('Center').extent('280', '280').stream().pipe(writeStream);
            }
        }),
        new FS.Store.FileSystem('avatar-blur', {
            beforeWrite: renameFile,
            transformWrite: function(fileObj, readStream, writeStream) {
                gm(readStream, fileObj.name())
                    .autoOrient()
                    .resize('500', '500', '^')
                    .gravity('Center')
                    .extent('500', '500')
                    .blur(0, 24)
                    .stream()
                    .pipe(writeStream);
            }
        })
    ],
    filter: {
        allow: {
            contentTypes: ['image/*'] //allow only images in this FS.Collection
        }
    }
});

Avatars.allow({
    insert: function (userId) {
        return !!userId;
    },
    update: isUserOwn,
    remove: isUserOwn,
    download: function () { return true; }
});
