jock.bundle("jock.tuple", {
    tuple2:(function () {
        "use strict";

        var Impl = function Tuple2() {
            jock.tuple.Tuple.call(this);
        };
        Impl.prototype = new jock.tuple.Tuple();
        Impl.prototype.productArity = function () {
            return 2;
        };
        Impl.prototype.productElement = function (index) {
            switch (index) {
                case 0:
                    return this._1;
                case 1:
                    return this._2;
                default:
                    throw new jock.errors.RangeError();
            }
        };
        Impl.prototype.productPrefix = function () {
            return "Tuple2";
        };

        return function (_1, _2) {
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
                }
            });
            return Object.freeze(instance);
        };
    })()
});
