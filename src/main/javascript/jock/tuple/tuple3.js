jock.package("jock.tuple", {
    tuple3:(function () {
        "use strict";

        var Impl = function (_1, _2, _3) {
            jock.tuple.Tuple.call(this);

            this.__1 = _1;
            this.__2 = _2;
            this.__3 = _3;
        };
        Impl.prototype = new jock.tuple.Tuple();

        var Methods = {
            _1:function () {
                return this.__1;
            },
            _2:function () {
                return this.__2;
            },
            _3:function () {
                return this.__3;
            },
            productArity:function () {
                return 3;
            },
            productElement:function (index) {
                switch (index) {
                    case 0:
                        return this._1();
                    case 1:
                        return this._2();
                    case 2:
                        return this._3();
                    default:
                        throw new jock.errors.RangeError();
                }
            },
            productPrefix:function () {
                return "Tuple3";
            }
        };

        Impl = jock.extend(Impl, Methods);

        return function (_1, _2, _3) {
            return new Impl(_1, _2, _3);
        };
    })()
});
