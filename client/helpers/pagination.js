setupPagination = function (instance) {
    instance.limit = new ReactiveVar(SHARES_LIMIT);
    return instance;
}

showMoreVisible = function (instance) {
    var target = $(".show-more-results"),
        threshold;

    if (!target.length) return;

    threshold = $(window).scrollTop() + $(window).height() - target.height();

    if (target.offset().top < threshold) {
        if (!target.data("visible")) {
            // console.log("target became visible (inside viewable area)");
            target.data("visible", true);
            instance.limit.set(instance.limit.get() + SHARES_LIMIT);
        }
    } else {
        if (target.data("visible")) {
            // console.log("target became invisible (below viewable arae)");
            target.data("visible", false);
        }
    }
}
