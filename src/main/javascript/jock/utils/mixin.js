jock.utils = jock.utils || {};
jock.utils.mixin = function (impl, trait) {

    if (!impl.prototype)
        impl.prototype = {};

    if (!impl.prototype.is)
        impl.prototype.is = [];

    if (impl.prototype.is.indexOf(trait) < 0)
        impl.prototype.is.push(trait);

    // Note (Simon) : Prevent jslint from moaning about the creation of generating functions in loops.
    function handler(method) {
        return function () {
            return method.apply(this, arguments);
        };
    }

    for (var name in trait.prototype) {
        var method = trait.prototype[name];
        if (name === "constructor" || name === "name")
            continue;

        impl.prototype[name] = handler(method);
    }

    return impl;
};