jock.bundle("jock.tuple", {
    tuple1:(function () {
        "use strict";

        var Impl = function Tuple1() {
            jock.tuple.Tuple.call(this);
        };
        Impl.prototype = new jock.tuple.Tuple();
        Impl.prototype.productArity = function () {
            return 1;
        };
        Impl.prototype.productElement = function (index) {
            if (index === 0) return this._1;
            else throw new jock.errors.RangeError();
        };
        Impl.prototype.productPrefix = function () {
            return "Tuple1";
        };

        return function (_1) {
            var instance = Object.create(new Impl());
            Object.defineProperty(instance, "_1", {
                get: function(){
                    return _1;
                },
                configurable: false
            });
            return Object.freeze(instance);
        };
    })()
});
