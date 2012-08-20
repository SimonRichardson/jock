jock.either = jock.either || {};
jock.either.left = (function () {
    "use strict";

    var Impl = function (value) {
        jock.either.Either.call(this);

        this._value = value;
    };
    Impl.prototype = new jock.either.Either();
    Impl.prototype.name = "left";

    var Methods = {
        equals:function (that) {
            if (that instanceof jock.either.Either)
                return this.isLeft();
            return false;
        },
        isLeft:function () {
            return true;
        },
        isRight:function () {
            return false;
        },
        get:function () {
            return this._value;
        },
        fold:function (a, b) {
            a = jock.utils.verifiedTypeOf(a, "function");
            b = jock.utils.verifiedTypeOf(b, "function");

            return jock.either.left(a(this.get()));
        },
        left:function () {
            return jock.option.some(this.get());
        },
        right:function () {
            return jock.option.none();
        },
        swap:function () {
            return jock.either.right(this.get());
        },
        productPrefix:function () {
            return "left";
        },
        productArity:function () {
            return 1;
        },
        productElement:function (index) {
            if(index === 0) return this.get();
            else throw new jock.errors.RangeError();
        }
    };

    jock.utils.extend(Impl, Methods);

    return function (value) {
        return new Impl(value);
    };
}).call(this);