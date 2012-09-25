jock.bundle("jock.tuple", {
    tuple5:(function () {
        "use strict";

        var Tuple5 = Object.create(jock.tuple.Tuple);
        Tuple5.productElement = function(index) {
            switch(index) {
                case 0:
                    return this._1;
                case 1:
                    return this._2;
                case 2:
                    return this._3;
                case 3:
                    return this._4;
                case 4:
                    return this._5;
                default:
                    throw new jock.errors.RangeError();
            }
        };

        return function (_1, _2, _3, _4, _5) {
            var instance = Object.create(Tuple5, {
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
                _4: {
                    get: function(){
                        return _4;
                    },
                    configurable:false
                },
                _5: {
                    get: function(){
                        return _5;
                    },
                    configurable:false
                },
                productArity: {
                    get: function(){
                        return 5;
                    },
                    configurable:false
                },
                productPrefix: {
                    get: function(){
                        return "Tuple5";
                    }
                }
            });
            return Object.freeze(instance);
        };
    })()
});
