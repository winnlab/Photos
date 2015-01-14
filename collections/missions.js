Missions = new Mongo.Collection('missions');

Missions.attachSchema(new SimpleSchema({
    name: {
        label: "Name",
        type: String,
        max: 60
    },
    from: {
        label: "From",
        type: Date
    },
    to: {
        label: "To",
        type: Date
    },
    uploadsQty: {
        label: 'Uploads quantity',
        type: Number,
        optional: true,
        autoform: {
            disabled: true
        }
    },
    description: {
        label: 'Description',
        type: String,
        autoform: {
            rows: 5
        }
    },
    prize: {
        label: 'Prize',
        type: Number,
        min: 0
    },
    prizeQty: {
        label: 'Prize quantity',
        type: Number,
        min: 1,
        max: 5
    },
    prizeType: {
        label: 'Prize type',
        type: String,
        autoform: {
            options: [{
                label: 'Money',
                value: 'money'
            }, {
                label: 'Facebook',
                value: 'coupons'
            }]
        }
    },
    sponsorName: {
        label: 'Sponsor name',
        type: String,
        optional: true,
        max: 60
    },
    sponsorLink: {
        label: 'Sponsor link',
        type: String,
        optional: true,
        max: 60
    },
    ended: {
        label: 'Ended',
        type: Boolean
    },
    active: {
        label: 'Active',
        type: Boolean
    },
    teaser: {
        type: String,
        autoform: {
            type: 'fileUpload',
            collection: 'MissionTeaser'
        }
    },
    brand: {
        type: String,
        autoform: {
            type: 'fileUpload',
            collection: 'MissionBrand'
        }
    },
    sponsor: {
        type: String,
        optional: true,
        autoform: {
            type: 'fileUpload',
            collection: 'MissionSponsor'
        }
    }
}));

MissionTeaser = new FS.Collection('missionTeasers', {
    stores: [
        new FS.Store.FileSystem('mission-teaser-768', {
            // transformWrite: function(fileObj, readStream, writeStream) {
            //     gm(readStream, fileObj.name()).autoOrient().resize('768', '264', '^').gravity('North').extent('768', '264').stream().pipe(writeStream);
            // }
        }),
        new FS.Store.FileSystem('mission-teaser-992', {
            // transformWrite: function(fileObj, readStream, writeStream) {
            //     gm(readStream, fileObj.name()).autoOrient().resize('992', '341', '^').gravity('North').extent('992', '341').stream().pipe(writeStream);
            // }
        }),
        new FS.Store.FileSystem('mission-teaser-1200', {
            // transformWrite: function(fileObj, readStream, writeStream) {
            //     gm(readStream, fileObj.name()).autoOrient().resize('1200', '413', '^').gravity('North').extent('1200', '413').stream().pipe(writeStream);
            // }
        }),
        new FS.Store.FileSystem('mission-teaser-1680', {
            // transformWrite: function(fileObj, readStream, writeStream) {
            //     gm(readStream, fileObj.name()).autoOrient().resize('1680', '578', '^').gravity('North').extent('1680', '578').stream().pipe(writeStream);
            // }
        }),
    ],
    filter: {
        allow: {
            contentTypes: ['image/*'] //allow only images in this FS.Collection
        }
    }
});

MissionBrand = new FS.Collection('missionBrand', {
    stores: [
        new FS.Store.FileSystem('mission-brand', {
            // transformWrite: function(fileObj, readStream, writeStream) {
            //     gm(readStream, fileObj.name()).autoOrient().resize('640', '200', '^').gravity('Center').extent('640', '200').stream().pipe(writeStream);
            // }
        })
    ],
    filter: {
        allow: {
            contentTypes: ['image/*'] //allow only images in this FS.Collection
        }
    }
});

MissionSponsor = new FS.Collection('missionSponsor', {
    stores: [
        new FS.Store.FileSystem('mission-sponsor')
    ],
    filter: {
        allow: {
            contentTypes: ['image/*'] //allow only images in this FS.Collection
        }
    }
});

var missionAllowRules = {
    insert: function (userId) { return !!userId; },
    update: function (userId) { return !!userId; },
    remove: function (userId) { return !!userId; },
    download: function () { return true; }
};

MissionBrand.allow(_.extend({}, missionAllowRules));
MissionTeaser.allow(_.extend({}, missionAllowRules));
MissionSponsor.allow(_.extend({}, missionAllowRules));
