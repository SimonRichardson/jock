jock.either = jock.either || {};
jock.either.right = (function () {
    "use strict";

    var Impl = function () {
        jock.either.Either.call(this);
    };
    Impl.prototype = new jock.either.Either();
    Impl.prototype.name = "right";

    var Methods = {
        isLeft:function () {
            return false;
        },
        isRight:function () {
            return true;
        }
    };

    jock.utils.extend(Impl, Methods);

    return function () {
        return new Impl();
    };
}).call(this);