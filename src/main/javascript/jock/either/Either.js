jock.either = jock.either || {};
jock.either.Either = (function () {
    "use strict";

    var Impl = function () {
        jock.product.Product.call(this);
    };
    Impl.prototype = new jock.product.Product();
    Impl.prototype.name = "Either";

    var Methods = {
        isLeft:function () {
            throw new jock.errors.AbstractMethodError();
        },
        isRight:function () {
            throw new jock.errors.AbstractMethodError();
        },
        fold:function () {

        },
        joinLeft:function () {

        },
        joinRight:function () {

        },
        left:function () {

        },
        right:function () {

        },
        swap:function () {

        }
    };

    return jock.utils.extend(Impl, Methods);
}).call(this);