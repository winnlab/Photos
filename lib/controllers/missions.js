MissionItemController = RouteController.extend({


    waitOn: function () {
        return [
            Meteor.subscribe('missionItem', this.params._id)
        ];
    },

    data: function () {
        return {
            mission: Missions.findOne(),
            displayFilters: true
        };
    }

});
