checkSharesQuery = function (query) {
    if (query && query.themeId) {
        check(query.themeId, String);
    }
    if (query && query.missionId) {
        check(query.missionId, String);
    }
    if (query && query.userId) {
        check(query.userId, String);
    }
    if (query && query.main) {
        check(query.main, Number);
    }
    if (query && query.winner) {
        check(query.winner, Number);
    }
    if (query && query.tags) {
        check(query.tags['$all'], Array);
    }
}
