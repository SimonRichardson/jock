jock.either = jock.either || {};
jock.either.Either = (function () {
    "use strict";

    var Impl = function () {
        jock.product.Product.call(this);

        this._value = null;
    };
    Impl.prototype = new jock.product.Product();
    Impl.prototype.name = "Either";

    return Impl;
}).call(this);