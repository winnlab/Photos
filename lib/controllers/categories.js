CategoriesController = RouteController.extend({

    isFilterDisplay: function () {
        return true;
    },

    waitOn: function () {
        return [
            Meteor.subscribe('missionsBanner'),
            Meteor.subscribe('categories')
        ];
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
        if (this.params.type === 'neueste') {
            Session.set('sortBy', 'latest');
        } else {
            Session.set('sortBy', 'top');
        }
        _.bind(carouselOnAction, this)();
    },

    onAfterAction: function () {
        if (this.params.shareId) {
            photoSubscribe(this.params.shareId);
        }
    }

});
