CategoriesController = RouteController.extend({

    isFilterDisplay: function () {
        return true;
    },

    waitOn: function () {
        return [
            Meteor.subscribe('missionsBanner'),
            Meteor.subscribe('categories'),
            Meteor.subscribe('share', {}, {}),
            Meteor.subscribe('shareSource', {})
        ]
    },

    data: function () {
        return {
            missions: Missions.find().fetch(),
            categories: Categories.find(),
            shares: Share.find(),
            displayFilters: this.isFilterDisplay()
        };
    }

});
