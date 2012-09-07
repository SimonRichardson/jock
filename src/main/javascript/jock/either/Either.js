jock.package("jock.either", {
    Either:(function () {
        "use strict";

        return jock.mixin(function () {
            this._value = null;
        }, jock.product.Product);
    })()
});