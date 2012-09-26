jock.bundle("jock.either", {
    right:(function () {
        "use strict";

        var Right = Object.create(jock.either.Either, {
            isLeft:{
                get:function () {
                    return false;
                },
                configurable:false
            },
            isRight:{
                get:function () {
                    return true;
                },
                configurable:false
            },
            left:{
                get:function () {
                    return jock.option.none();
                },
                configurable:false
            },
            right:{
                get:function () {
                    return jock.option.some(this.get);
                },
                configurable:false
            },
            swap:{
                get:function () {
                    return jock.either.left(this.get);
                },
                configurable:false
            },
            productPrefix:{
                get:function () {
                    return "right";
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

        Right.equals = function (that) {
            if (that instanceof jock.either.Either)
                return this.isRight;
            return false;
        };
        Right.fold = function (a, b) {
            a = jock.utils.verifiedTypeOf(a, "function");
            b = jock.utils.verifiedTypeOf(b, "function");

            return jock.either.right(b(this.get));
        };
        Right.productElement = function (index) {
            if (index === 0) return this.get;
            else throw new jock.errors.RangeError();
        };

        return function (value) {
            var instance = Object.create(Right, {
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