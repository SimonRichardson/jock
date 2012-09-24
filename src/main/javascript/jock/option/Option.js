jock.bundle("jock.option", {
    Option:(function () {
        "use strict";

        var Impl = jock.mixin(function Option() {
        }, jock.product.Product);

        Impl.prototype.productPrefix = function () {
            return "Option";
        };

        return Impl;
    })()
});