Avatars = new FS.Collection('avatars', {
    stores: [
        new FS.Store.FileSystem('thumbs', {
            // transformWrite: function(fileObj, readStream, writeStream) {
            //     // Transform the image into a 50x50 thumbnail
            //     gm(readStream, fileObj.name()).autoOrient().resize('50', '50', '^').gravity('Center').extent('50', '50').stream().pipe(writeStream);
            // }
        }),
        new FS.Store.FileSystem('avatars', {
            // transformWrite: function(fileObj, readStream, writeStream) {
            //     // Transform the image into a 280x280 thumbnail
            //     gm(readStream, fileObj.name()).autoOrient().resize('280', '280', '^').gravity('Center').extent('280', '280').stream().pipe(writeStream);
            // }
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
    update: function (userId, doc) {
        return userId === doc.userId;
    },
    remove: function (userId, doc) {
        return userId === doc.userId;
    },
    download: function () { return true; }
});
