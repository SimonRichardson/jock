jock.bundle("jock.tuple", {
    tuple3:(function () {
        "use strict";

        var Impl = function Tuple3() {
            jock.tuple.Tuple.call(this);
        };
        Impl.prototype = new jock.tuple.Tuple();
        Impl.prototype.productArity = function () {
            return 3;
        };
        Impl.prototype.productElement = function (index) {
            switch (index) {
                case 0:
                    return this._1;
                case 1:
                    return this._2;
                case 2:
                    return this._3;
                default:
                    throw new jock.errors.RangeError();
            }
        };
        Impl.prototype.productPrefix = function () {
            return "Tuple3";
        };

        return function (_1, _2, _3) {
            var instance = Object.create(new Impl());
            Object.defineProperties(instance, {
                "_1": {
                    get:function () {
                        return _1;
                    },
                    configurable:false
                },
                "_2": {
                    get:function () {
                        return _2;
                    },
                    configurable:false
                },
                "_3": {
                    get:function () {
                        return _3;
                    },
                    configurable:false
                }
            });
            return Object.freeze(instance);
        };
    })()
});
