jock.tuple = jock.tuple || {};
jock.tuple.Tuple = (function () {
    "use strict";

    var Impl = function () {
        jock.product.Product.call(this);
    };
    Impl.prototype = new jock.product.Product();
    Impl.prototype.name = "Tuple";

    var Methods = {
        productPrefix: function(){
            return "Tuple";
        }
    };

    return jock.utils.extend(Impl, Methods);
}).call(this);
