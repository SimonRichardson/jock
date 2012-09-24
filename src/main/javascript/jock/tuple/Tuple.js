jock.bundle("jock.tuple", {
    Tuple:(function () {
        "use strict";

        var Impl = jock.mixin(function Tuple() {
        }, jock.product.Product);

        Impl.prototype.productPrefix = function () {
            return "Tuple";
        };

        return Impl;
    })()
});
