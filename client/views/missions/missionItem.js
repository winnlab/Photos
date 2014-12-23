Template.missionItem.helpers({
    shares: function () {
        var sort = Session.get('sortBy');
        if (sort == "latest" || !sort) {
            return Share.find({}, { sort: { time: -1 } });
        } else {
            return Share.find({}, { sort: { likesQty: -1 } } );
        }
    }
});
