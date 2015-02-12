CategoriesController = RouteController.extend({

    isFilterDisplay: function () {
        return true;
    },

    waitOn: function () {
        return photoSubscribe(this.params.shareId, [
            Meteor.subscribe('missionsBanner'),
            Meteor.subscribe('categories')
        ]);
    },

    data: function () {
        return {
            missions: Missions.find().fetch(),
            categories: Categories.find(),
            displayFilters: this.isFilterDisplay(),
            type: this.typeLink
        };
    },

    action: function () {
        if (!this.typeLink) {
            this.typeLink = new ReactiveVar(this.params.type);
        } else {
            this.typeLink.set(this.params.type);
        }
        _.bind(carouselOnAction, this)();
    }

});
