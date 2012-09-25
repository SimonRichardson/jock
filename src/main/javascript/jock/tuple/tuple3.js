jock.bundle("jock.tuple", {
    tuple3:(function () {
        "use strict";

        var Tuple3 = Object.create(jock.tuple.Tuple);
        Tuple3.productElement = function(index) {
            switch(index) {
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

        return function (_1, _2, _3) {
            var instance = Object.create(Tuple3, {
                _1: {
                    get: function(){
                        return _1;
                    },
                    configurable:false
                },
                _2: {
                    get: function(){
                        return _2;
                    },
                    configurable:false
                },
                _3: {
                    get: function(){
                        return _3;
                    },
                    configurable:false
                },
                productArity: {
                    get: function(){
                        return 3;
                    },
                    configurable:false
                },
                productPrefix: {
                    get: function(){
                        return "Tuple3";
                    }
                }
            });
            return Object.freeze(instance);
        };
    })()
});
