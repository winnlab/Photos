Share = new Mongo.Collection('shares');

Share.attachSchema(new SimpleSchema({
    description: {
        label: 'Description',
        type: String,
        max: 200
    },
    username: {
        label: 'Username',
        type: String,
        max: 40
    },
    userId: {
        label: 'UserId',
        type: String,
        max: 20
    },
    themeId: {
        label: 'themeId',
        type: String,
        optional: true,
        max: 20
    },
    missionId: {
        label: 'missionId',
        type: String,
        optional: true,
        max: 20
    },
    type: {
        label: 'Type',
        type: String,
        max: 5
    },
    likes: {
        label: 'Likes',
        type: [String],
        optional: true
    },
    likesQty: {
        label: 'Likes quantity',
        type: Number,
        optional: true
    },
    commentsQty: {
        label: 'Comments quantity',
        type: Number,
        optional: true
    },
    'source._id': {
        label: 'SourceId',
        type: String
    },
    'source.collectionName': {
        label: 'Source name',
        type: String
    },
    tags: {
        label: 'Tags',
        type: [String]
    },
    blocked: {
        label: 'Blocked',
        type: Boolean,
        optional: true
    },
    edChoice: {
        label: 'Editor choice',
        type: Number,
        optional: true
    },
    winner: {
        label: 'Winner',
        type: Number,
        optional: true
    },
    main: {
        label: 'Main',
        type: Number,
        optional: true
    },
    time: {
        label: 'Time',
        type: Number,
        optional: true
    }
}));

var shareCounting = function (ids, inc) {
    if (ids.userId) {
        Meteor.users.update({ _id: ids.userId }, {
            $inc: { uploads: inc }
        });
    }
    if (ids.missionId) {
        var updObj = {
                $inc: { uploadsQty: inc }
            };
        if (Meteor.isServer && ids.userId) {
            var exist = Missions.findOne({
                _id: ids.missionId
            });
            if (!exist.participants) {
                exist.participants = [];
            }
            if (inc > 0) {
                exist.participants.push(ids.userId);
                updObj.$inc.participantsQty = inc;
            } else {
                var index = exist.participants.indexOf(ids.userId);
                if (index !== -1) {
                    exist.participants.splice(index, 1);
                }
                if (exist.participants.indexOf(ids.userId) === -1) {
                    updObj.$inc.participantsQty = inc;
                }
            }
            updObj.$set = {
                participants: exist.participants
            };
        }
        Missions.update({ _id: ids.missionId }, updObj);
    }
    if (ids.themeId) {
        Themes.update({ _id: ids.themeId }, {
            $inc: { 'meta.photos_count': inc }
        });
    }
};

Meteor.methods({
    addShare: function (shareData, source) {
        shareData.tags = _.compact(_.map(shareData.tags, function (tag) {
            return tag.toLowerCase().replace(/\n|,| /g, '');
        }));
        var user = Meteor.user(),
            userId = user._id,
            missionId = shareData.missionId,
            themeId = shareData.themeId,
            data = _.extend(
                _.pick(shareData, 'missionId', 'themeId', 'description', 'tags', 'type', 'time'), {
                    source: _.pick(source, '_id', 'collectionName')
                }, {
                    blocked: false,
                    userId: userId,
                    username: user.username,
                    likes: [],
                    likesQty: 0,
                    edChoice: 0,
                    main: 0,
                    winner: 0
                }
            ),
            share = Share.insert(data);

        Meteor.call('addTags', shareData.tags);
        Meteor.call('shareNotify', userId, shareData.type);

        shareCounting({
            userId: userId,
            missionId: missionId,
            themeId: themeId
        }, 1);

        return share;
    },

    removeShare: function (shareId) {
        var share = Share.findOne({ _id: shareId });
        if (!share) {
            throw new Meteor.Error(404, 'Not found such share');
        }

        if (!Roles.userIsInRole(this.userId, ['admin']) && share.userId !== this.userId) {
            throw new Meteor.Error(403, 'Not allowed');
        }

        Share.remove({ _id: shareId });

        if (share.type === 'img') {
            ShareFiles.remove({ _id: share.source._id });
        }
        if (share.type === 'video') {
            ShareVideo.remove({ _id: share.source._id });
        }
        shareCounting({
            userId: share.userId,
            missionId: share.missionId,
            themeId: share.themeId
        }, -1);
        return share;
    },

    toggleLike: function (shareId) {
        var share = Share.findOne({ _id: shareId }, {
                fields: { _id: 1, source: 1, userId: 1 }
            }),
            userId = Meteor.userId(),
            isLiked = Share.findOne({
                _id: shareId,
                likes: userId
            }, {
                fields: { _id: 1 }
            });
        if (!share) {
            throw new Meteor.Error(404, 'Not found such share');
        }
        if (!userId) {
            throw new Meteor.Error(401, 'Not authenticated');
        }
        if (isLiked) {
            Share.update({ _id: shareId }, {
                $pull: { likes: userId },
                $inc: { likesQty: -1 }
            });
            ShareFiles.update({ _id: share.source._id }, {
                $inc: { likesQty: -1 }
            });
        } else {
            Share.update({ _id: shareId }, {
                $push: { likes: userId },
                $inc: { likesQty: 1 }
            });
            ShareFiles.update({ _id: share.source._id }, {
                $inc: { likesQty: 1 }
            });
            Meteor.call('likeNotify', share.userId, userId, shareId);
        }
    },

    toggleBlockShare: function (shareId, block) {
        if (!Roles.userIsInRole(this.userId, ['admin'])) {
            throw new Meteor.Error(403, 'Not allowed');
        }
        return Share.update({ _id: shareId }, { $set: { blocked: block } });
    }
});

ShareFiles = new FS.Collection('shares', {
    stores: [
        new FS.Store.FileSystem('shareThumbs', {
            beforeWrite: renameFile,
            transformWrite: function(fileObj, readStream, writeStream) {
                // Transform the image into a 296xAuto thumbnail
                gm(readStream, fileObj.name()).autoOrient().resize('296').stream().pipe(writeStream);
            }
        }),
        new FS.Store.FileSystem('shares', {
            beforeWrite: renameFile,
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

var allow = {
    insert: function (userId) {
        return !!userId;
    },
    update: isUserOwn,
    remove: isUserOwn,
    download: function () { return true; }
};

ShareFiles.allow(_.extend({}, allow));

var shareVideoStores = [];
shareVideoStores.push(new FS.Store.FileSystem('share-video', {
    beforeWrite: renameFile
}));

if (Meteor.isServer) {
    shareVideoStores.push(new FS.Store.FileSystem('share-video-thumb', {
        beforeWrite: function (fileObj) {
            var obj = renameFile(fileObj);
            obj.extension = 'png';
            obj.type = 'image/png';
            return obj;
        },
        transformWrite: function(fileObj, readStream, writeStream) {
            var fs = Npm.require('fs'),
                path = Npm.require('path'),
                folder = path.normalize(__meteor_bootstrap__.serverDir +
                    '../../../../cfs/files/share-video-shots/'),
                filename = fileObj.copies['share-video-thumb'].name;
            ffmpeg(readStream)
            .inputOptions('-analyzeduration 2147483647')
            .inputOptions('-probesize 2147483647')
            .screenshot({
                timemarks: [0.5],
                folder: folder,
                filename: filename
            })
            // setup event handlers
            .on('end', function() {
                var shotReadStream = fs.createReadStream(folder + filename);
                gm(shotReadStream, filename).autoOrient().resize('296').stream().pipe(writeStream);
            })
            .on('error', function(err, stdout, stderr) {
                console.log('an error happened: ' + err.message);
                console.log('ffmpeg standard output:\n' + stdout);
                console.log('ffmpeg standard error:\n' + stderr);
            });
        }
    }));
}

ShareVideo = new FS.Collection('shareVideo', {
    stores: shareVideoStores,
    filter: {
        allow: {
            contentTypes: ['video/mp4']
        }
    }
});

ShareVideo.allow(_.extend({}, allow));
