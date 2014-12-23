MissionItemController = RouteController.extend({


    waitOn: function () {
        return [
            Meteor.subscribe('missionItem', this.params._id),
            Meteor.subscribe('share', { missionId: this.params._id }),
            Meteor.subscribe('shareSource')
        ];
    },

    data: function () {
        return {
            mission: Missions.findOne(),
            displayFilters: true
        };
    }

});
