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
        return photoSubscribe(this.params.shareId, [
            Meteor.subscribe('themes', { link: this.params.link })
        ]);
    },

    data: function () {
        var reactive = new ReactiveVar(' ');
        return {
            theme: Themes.findOne({ link: this.params.link }),
            pageNameReactive: reactive,
            pageName: function () {
                return reactive.get();
            }
        };
    },

    action: carouselOnAction

});

ThemeUploadController = ThemeItemController.extend({

    data: function () {
        return {
            theme: Themes.findOne({ link: this.params.link })
        };
    }

});
