Share = new Mongo.Collection('shares');

Meteor.methods({
    addShare: function (shareData, source) {
        var user = Meteor.user(),
            userId = user._id,
            missionId = _.pick(shareData, 'missionId').missionId,
            data = _.extend(
                _.pick(shareData, 'missionId', 'themeId', 'description', 'tags', 'type'), {
                    source: _.pick(source, '_id', 'collectionName')
                }, {
                    userId: userId,
                    username: user.username,
                    time: Date.now(),
                    likes: [],
                    likesQty: 0,
                    edChoice: 0,
                    main: 0,
                    winner: 0
                }
            ),
            share = Share.insert(data);

        Meteor.users.update({ _id: userId }, {
            $inc: { uploads: 1 }
        });

        if (missionId) {
            Missions.update({ _id: missionId }, {
                $inc: { uploadsQty: 1 }
            });
        }

        return share;
    }
});

ShareFiles = new FS.Collection('shares', {
    stores: [
        new FS.Store.FileSystem('shareThumbs', {
            transformWrite: function(fileObj, readStream, writeStream) {
                // Transform the image into a 296xAuto thumbnail
                gm(readStream, fileObj.name()).autoOrient().resize('296').stream().pipe(writeStream);
            }
        }),
        new FS.Store.FileSystem('shares', {
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
