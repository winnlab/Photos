var $carousel;

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
