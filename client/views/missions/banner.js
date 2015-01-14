var $carousel,
    $body = $(window);

Template.missionsBanner.helpers({
    responsiveImg: function (id, mini) {
        if (typeof mini == 'object') {
            mini = null;
        }
        var width = $body.width(),
            img = MissionTeaser.findOne({ _id: id }),
            options = { store: 'mission-teaser-' };

        if (width < 767 || mini) {
            options.store += 768;
        } else if (width < 991) {
            options.store += 992;
        } else if (width < 1199) {
            options.store += 1200;
        } else {
            options.store += 1680;
        }
        return img ? img.url(options) : '';
    }
});

Template.missionsBanner.events({
    'click .carousel-control span': function (ev) {
        ev.stopPropagation();
        $carousel.carousel($(ev.target).parent().data('slide'));
    },
    'click .carousel-indicators li': function (ev) {
        $carousel.carousel(+ev.currentTarget.attributes['data-target'].value);
    }
});

Template.missionsBanner.rendered = function () {
    $carousel = $('#teasers .carousel');
    $carousel.carousel();
};
