Complaints = new Mongo.Collection('complaints');

Complaints.attachSchema(new SimpleSchema({
    sourceId: {
        label: 'SourceId',
        type: String,
        max: 20
    },
    'users.$.userId': {
        label: 'BenutzerId',
        type: String,
        max: 20,
        optional: true
    },
    'users.$.username': {
        label: 'Benutzername',
        type: String,
        max: 40,
        optional: true
    },
    reason: {
        label: 'der grund',
        type: String,
        max: 20
    },
    counter: {
        label: 'der grund',
        type: Number
    }
}));

if (Meteor.isServer) {
    Meteor.methods({
        complaintOnShare: function (shareId, reason) {
            var exist = Complaints.findOne({ sourceId: shareId, reason: reason }),
                user = Meteor.user(),
                userObj = { userId: user._id, username: user.username };

            if (!!exist && _.isEmpty(_.where(exist.users, userObj))) {
                return Complaints.update({ _id: exist._id }, {
                    $set: { date: moment().format() },
                    $push: { users: userObj },
                    $inc: { counter: 1 }
                });
            }

            if (!exist) {
                return Complaints.insert({
                    sourceId: shareId,
                    users: [userObj],
                    reason: reason,
                    date: moment().format(),
                    counter: 1
                });
            }

            return false;
        }
    });
}
