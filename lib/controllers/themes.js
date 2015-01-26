ThemesController = RouteController.extend({

    waitOn: function () {
        return [
            Meteor.subscribe('themes')
        ];
    },

    data: function () {
        return {
            themes: Themes.find(),
            pageName: '12Rubriken',
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
        var theme = Themes.findOne({ link: this.params.link });
        return {
            theme: theme,
            pageName: theme.title
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
