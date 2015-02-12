renameFile = function (fileObj) {
    return {
        name: fileObj.name().replace(/ /g, '')
    };
};
