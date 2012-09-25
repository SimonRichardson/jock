jock.bundle("jock.tuple", {
    toTuple:function () {
        "use strict";

        var args = Array.prototype.slice.call(arguments);

        switch (args.length) {
            case 1:
                return jock.tuple.tuple1(args[0]);
            case 2:
                return jock.tuple.tuple2(args[0], args[1]);
            case 3:
                return jock.tuple.tuple3(args[0], args[1], args[2]);
            case 4:
                return jock.tuple.tuple4(args[0], args[1], args[2], args[3]);
            case 5:
                return jock.tuple.tuple5(args[0], args[1], args[2], args[3], args[4]);
            default:
                // This will be slow as hell compared to the built in ones, but does offer flexibility.
                return (function (args) {
                    var total = args.length;

                    var RuntimeTuple = Object.create(jock.tuple.Tuple);
                    RuntimeTuple.productElement = function (index) {
                        if (index >= 0 && index < total) return this["_" + (index + 1)];
                        else throw new jock.errors.RangeError();
                    };

                    var instance = Object.create(RuntimeTuple, {
                        productArity:{
                            get:function () {
                                return total;
                            },
                            configurable:false
                        },
                        productPrefix:{
                            get:function () {
                                return "Tuple" + total;
                            }
                        }
                    });

                    var closure = function (value) {
                        return function () {
                            return value;
                        };
                    };

                    var properties = {};
                    args.forEach(function (value, index) {
                        properties["_" + (index + 1)] = {
                            get:closure(value),
                            configurable:false
                        }
                    });
                    Object.defineProperties(instance, properties);

                    return Object.freeze(instance);
                })(args.slice());
        }
    }
});
