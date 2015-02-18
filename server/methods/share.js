'use strict';
Meteor.methods({
    shareToFB: function (shareId) {
        var share = Share.findOne({_id: shareId}),
            user = Meteor.user(),
            accessToken = user.services.facebook.accessToken,
            source, url;

        if (!user || !accessToken) {
            throw new Meteor.Error(500, 'Not a valid Facebook user logged in');
        }

        if (share.type === 'img') {
            source = ShareFiles.findOne({_id: share.source._id}).url({ storage: 'shares' });
        }

        if (share.type === 'video') {
            source = ShareVideo.findOne({_id: share.source._id}).url({ storage: 'share-video-thumb' });
        }

        url = process.env.ROOT_URL.slice(0, -1) + source;

        return HTTP.post('https://graph.facebook.com/v2.2/me/photos', {
            data: {
                'access_token': accessToken,
                'format': 'json',
                'message': share.description,
                'method': 'post',
                'pretty': 0,
                'suppress_http_code': 1,
                'url': url
            }
        });
    }
});
