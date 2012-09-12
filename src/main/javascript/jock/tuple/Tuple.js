jock.bundle("jock.tuple", {
    Tuple: (function(){
        "use strict";

        var Impl = function () {};
        Impl = jock.mixin(Impl, jock.product.Product);

        var Methods = {
            productPrefix: function(){
                return "Tuple";
            }
        };

        return jock.extend(Impl, Methods);
    })()
});
