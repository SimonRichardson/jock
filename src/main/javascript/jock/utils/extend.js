jock.utils = jock.utils || {};
jock.utils.extend = function (type, methods) {
    for (var i in methods)
        type.prototype[i] = methods[i];

    return type;
};