Template.themes.helpers({
    themeBg: function (bg, bgImg) {
        if (!bgImg) {
            return bg;
        }
        var img = ThemeBg.findOne({ _id: bgImg });
        return img ? img.url() : '';
    }
});
