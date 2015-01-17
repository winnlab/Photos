ThemesController = RouteController.extend({

    waitOn: function () {
        return [
            Meteor.subscribe('themes')
        ];
    },

    data: function () {
        return {
            themes: Themes.find()
        };
    }

});

ThemeItemController = RouteController.extend({

    waitOn: function () {
        return [
            Meteor.subscribe('themes', { link: this.params.link })
        ];
    },

    data: function () {
        return {
            theme: Themes.findOne({ link: this.params.link })
        };
    }

});

ThemeUploadController = ThemeItemController.extend({

    data: function () {
        return {
            theme: Themes.findOne({ link: this.params.link })
        };
    }

});
