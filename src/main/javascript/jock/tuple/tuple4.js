jock.package("jock.tuple", {
    tuple4:(function () {
        "use strict";

        var Impl = function (_1, _2, _3, _4) {
            jock.tuple.Tuple.call(this);

            this.__1 = _1;
            this.__2 = _2;
            this.__3 = _3;
            this.__4 = _4;
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
            _4:function () {
                return this.__4;
            },
            productArity:function () {
                return 4;
            },
            productElement:function (index) {
                switch (index) {
                    case 0:
                        return this._1();
                    case 1:
                        return this._2();
                    case 2:
                        return this._3();
                    case 3:
                        return this._4();
                    default:
                        throw new jock.errors.RangeError();
                }
            },
            productPrefix:function () {
                return "Tuple4";
            }
        };

        Impl = jock.extend(Impl, Methods);

        return function (_1, _2, _3, _4) {
            return new Impl(_1, _2, _3, _4);
        };
    })()
});
