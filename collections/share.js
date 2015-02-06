Share = new Mongo.Collection('shares');

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
        var user = Meteor.user(),
            userId = user._id,
            missionId = shareData.missionId,
            themeId = shareData.themeId,
            data = _.extend(
                _.pick(shareData, 'missionId', 'themeId', 'description', 'tags', 'type', 'time'), {
                    source: _.pick(source, '_id', 'collectionName')
                }, {
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
        if (share.userId !== this.userId) {
            throw new Meteor.Error(403);
        }
        Share.remove({ _id: shareId });
        ShareFiles.remove({ _id: share.source._id });
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
    update: isUserOwn,
    remove: isUserOwn,
    download: function () { return true; }
});
