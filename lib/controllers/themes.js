ThemesController = RouteController.extend({

    waitOn: function () {
        return [
            Meteor.subscribe('themes')
        ];
    },

    onBeforeAction: function () {
        var themes = Themes.find().fetch();

        Meteor.subscribe('shareSource', { _id: { $in: _.pick(themes, 'shareSourceId') } });

        this.next();
    },

    data: function () {
        return {
            themes: Themes.find()
        }
    }

});

ThemeItemController = RouteController.extend({

    waitOn: function () {
        return [
            Meteor.subscribe('themes', { link: this.params.link })
        ];
    },

    onBeforeAction: function () {
        var theme = Themes.find({ link: this.params.link });
        Meteor.subscribe('share', { themeId: theme._id });
        Meteor.subscribe('shareSource');
        this.next();
    },

    data: function () {
        return {
            theme: Themes.findOne({ link: this.params.link })
        }
    }

});

ThemeUploadController = ThemeItemController.extend({

    onBeforeAction: function () {
        this.next();
    },

    data: function () {
        return {
            theme: Themes.findOne({ link: this.params.link })
        }
    }

});
