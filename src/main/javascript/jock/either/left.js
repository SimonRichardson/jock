jock.either = jock.either || {};
jock.either.left = (function () {
    "use strict";

    var Impl = function () {
        jock.either.Either.call(this);
    };
    Impl.prototype = new jock.either.Either();
    Impl.prototype.name = "left";

    var Methods = {
        isLeft:function () {
            return true;
        },
        isRight:function () {
            return false;
        }
    };

    jock.utils.extends(Impl, Methods);

    return function () {
        return new Impl();
    };
}).call(this);