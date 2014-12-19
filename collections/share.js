Share = new Mongo.Collection('shares');

Meteor.methods({
    addShare: function (shareData, source) {
        var userId = Meteor.userId(),
            data = _.extend(
                _.pick(shareData, 'missionId', 'categoryId', 'description', 'tags'), {
                    source: _.pick(source, '_id', 'collectionName')
                }, {
                    userId: userId,
                    time: Date.now(),
                    likes: [],
                    edChoice: 0,
                    main: 0,
                    winner: 0
                }
            );

        return Share.insert(data);
    }
});

ShareFiles = new FS.Collection('shares', {
    stores: [
        new FS.Store.FileSystem('thumb', {
            transformWrite: function(fileObj, readStream, writeStream) {
                // Transform the image into a 296xAuto thumbnail
                gm(readStream, fileObj.name()).autoOrient().resize('296').stream().pipe(writeStream);
            }
        }),
        new FS.Store.FileSystem('resize', {
            transformWrite: function(fileObj, readStream, writeStream) {
                // Transform the image into a 960xAuto image
                gm(readStream, fileObj.name()).autoOrient().resize('960').stream().pipe(writeStream);
            }
        })
    ],
    filter: {
        allow: {
            contentTypes: ['image/*'] //allow only images in this FS.Collection
        }
    }
});

ShareFiles.allow({
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
