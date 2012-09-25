jock.bundle("jock.tuple", {
    tuple2:(function () {
        "use strict";

        var Tuple2 = Object.create(jock.tuple.Tuple, {
            productArity:{
                get:function () {
                    return 2;
                },
                configurable:false
            },
            productPrefix:{
                get:function () {
                    return "Tuple2";
                },
                configurable:false
            }
        });
        Tuple2.productElement = function (index) {
            switch (index) {
                case 0:
                    return this._1;
                case 1:
                    return this._2;
                default:
                    throw new jock.errors.RangeError();
            }
        };

        return function (_1, _2) {
            var instance = Object.create(Tuple2, {
                _1:{
                    get:function () {
                        return _1;
                    },
                    configurable:false
                },
                _2:{
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
