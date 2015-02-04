getFormObj = function ($form) {
    return _.reduce($form.serializeArray(), function (itemObj, item) {
        itemObj[item.name] = item.value;
        return itemObj;
    }, {});
};
