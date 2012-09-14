jock.bundle("jock.either", {
    Either:(function () {
        "use strict";

        return jock.mixin(function Either() {
            this._value = null;
        }, jock.product.Product);
    })()
});