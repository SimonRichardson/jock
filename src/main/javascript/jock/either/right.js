jock.bundle("jock.either", {
    right:(function () {
        "use strict";

        var Impl = function right(value) {
            jock.either.Either.call(this);

            this._value = value;
        };
        Impl.prototype = new jock.either.Either();

        var Methods = {
            equals:function (that) {
                if (that instanceof jock.either.Either)
                    return this.isRight();
                return false;
            },
            isLeft:function () {
                return false;
            },
            isRight:function () {
                return true;
            },
            get:function () {
                return this._value;
            },
            fold:function (a, b) {
                a = jock.utils.verifiedTypeOf(a, "function");
                b = jock.utils.verifiedTypeOf(b, "function");

                return jock.either.right(b(this.get()));
            },
            left:function () {
                return jock.option.none();
            },
            right:function () {
                return jock.option.some(this.get());
            },
            swap:function () {
                return jock.either.left(this.get());
            },
            productPrefix:function () {
                return "right";
            },
            productArity:function () {
                return 1;
            },
            productElement:function (index) {
                if (index === 0) return this.get();
                else throw new jock.errors.RangeError();
            }
        };

        Impl = jock.extend(Impl, Methods);

        return function (value) {
            return new Impl(value);
        };
    })()
});