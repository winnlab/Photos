Template.addPhoto.helpers({
    license: function () {
        var query = Router.current().params.query;
        return query && query.missionId ? 'mission' : 'community';
    },
    missionName: function () {
        var query = Router.current().params.query,
            mission;
        if (!query) {
            return '';
        }
        mission = Missions.findOne({ _id: query.missionId });
        return mission && mission.name;
    }
});

Template.addPhoto.events({
    'click .chooseLicense': function (ev) {
        var $el = $(ev.currentTarget)
        if ($el.hasClass('active')) {
            return false;
        }

        if ($el.hasClass('mission')) {
            Router.go('missions', {}, { query: 'upload=true' });
        } else {
            Router.go('addPhoto');
        }

    }
});
