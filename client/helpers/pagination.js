setupPagination = function (instance) {
    instance.limit = new ReactiveVar(SHARES_LIMIT);
    $(window).on('scroll', function () {
        showMoreVisible(instance);
    });
    return instance;
};

simplePagination = function (instance, query) {
    instance.autorun(function () {
        var options = {
                limit: instance.limit.get(),
                sort: { time: -1 }
            };
        Meteor.subscribe('share', query, options);
    });
};

showMoreVisible = function (instance) {
    var target = $('.show-more-results'),
        threshold;

    if (!target.length) return;

    threshold = $(window).scrollTop() + $(window).height() - target.height();

    if (target.offset().top < threshold) {
        if (!target.data('visible')) {
            // console.log('target became visible (inside viewable area)');
            target.data('visible', true);
            instance.limit.set(instance.limit.get() + SHARES_LIMIT);
        }
    } else {
        if (target.data('visible')) {
            // console.log('target became invisible (below viewable arae)');
            target.data('visible', false);
        }
    }
};
