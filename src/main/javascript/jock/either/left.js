jock.bundle("jock.either", {
    left:(function () {
        "use strict";

        var Left = Object.create(jock.either.Either, {
            isLeft:{
                get:function () {
                    return true;
                },
                configurable:false
            },
            isRight:{
                get:function () {
                    return false;
                },
                configurable:false
            },
            left:{
                get:function () {
                    return jock.option.some(this.get);
                },
                configurable:false
            },
            right:{
                get:function () {
                    return jock.option.none();
                },
                configurable:false
            },
            swap:{
                get:function () {
                    return jock.either.right(this.get);
                },
                configurable:false
            },
            productPrefix:{
                get:function () {
                    return "left";
                },
                configurable:false
            },
            productArity:{
                get:function () {
                    return 1;
                },
                configurable:false
            }
        });

        Left.equals = function (that) {
            if (that instanceof jock.either.Either)
                return this.isRight;
            return false;
        };
        Left.fold = function (a, b) {
            a = jock.utils.verifiedTypeOf(a, "function");
            b = jock.utils.verifiedTypeOf(b, "function");

            return jock.either.left(a(this.get));
        };
        Left.productElement = function (index) {
            if (index === 0) return this.get;
            else throw new jock.errors.RangeError();
        };

        return function (value) {
            var instance = Object.create(Left, {
                get:{
                    get:function () {
                        return value;
                    },
                    configurable:false
                }
            });
            return Object.freeze(instance);
        };
    })()
});