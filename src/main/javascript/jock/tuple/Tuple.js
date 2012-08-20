jock.tuple = jock.tuple || {};
jock.tuple.Tuple = (function () {
    "use strict";

    var Impl = function () {};
    Impl = jock.utils.mixin(Impl, jock.product.Product);

    var Methods = {
        productPrefix: function(){
            return "Tuple";
        }
    };

    return jock.utils.extend(Impl, Methods);
}).call(this);
