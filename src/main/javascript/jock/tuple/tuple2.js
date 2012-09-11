jock.package("jock.tuple", {
    tuple2:(function () {
        "use strict";

        var Impl = function (_1, _2) {
            jock.tuple.Tuple.call(this);

            this.__1 = _1;
            this.__2 = _2;
        };
        Impl.prototype = new jock.tuple.Tuple();

        var Methods = {
            _1:function () {
                return this.__1;
            },
            _2:function () {
                return this.__2;
            },
            productArity:function () {
                return 2;
            },
            productElement:function (index) {
                switch (index) {
                    case 0:
                        return this._1();
                    case 1:
                        return this._2();
                    default:
                        throw new jock.errors.RangeError();
                }
            },
            productPrefix:function () {
                return "Tuple2";
            }
        };

        jock.extend(Impl, Methods);

        return function (_1, _2) {
            return new Impl(_1, _2);
        };
    })()
});
