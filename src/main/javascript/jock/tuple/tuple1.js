jock.bundle("jock.tuple", {
    tuple1:(function () {
        "use strict";

        var Tuple1 = Object.create(jock.tuple.Tuple);
        Tuple1.productElement = function(index) {
            if (index === 0) return this._1;
            else throw new jock.errors.RangeError();
        };

        return function (_1) {
            var instance = Object.create(Tuple1, {
                _1: {
                    get: function(){
                        return _1;
                    },
                    configurable:false
                },
                productArity: {
                    get: function(){
                        return 1;
                    },
                    configurable:false
                },
                productPrefix: {
                    get: function(){
                        return "Tuple1";
                    }
                }
            });
            return Object.freeze(instance);
        };
    })()
});
