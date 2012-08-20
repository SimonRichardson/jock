jock.either = jock.either || {};
jock.either.Either = (function () {
    "use strict";

    var Impl = function () {
        this._value = null;
    };
    Impl = jock.utils.mixin(Impl, jock.product.Product);

    return Impl;
}).call(this);