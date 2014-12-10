Template.missionItem.helpers({
    timeLeft: function (to) {
        var diff = to - Date.now();
        console.log(diff);
        return diff;
    }
});
