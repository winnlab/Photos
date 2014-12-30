Tags = new Mongo.Collection('tags');

Meteor.methods({
    addTags: function (tags) {
        if (!tags) {
            return;
        }
        _.each(tags, function (tag) {
            check(tag, String);
            var exist = Tags.findOne({ name: tag });
            if (!exist) {
                Tags.insert({ name: tag });
            }
        });
    }
})
