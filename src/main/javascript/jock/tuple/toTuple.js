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
                    var Impl = function RuntimeTuple() {
                        jock.tuple.Tuple.call(this);
                    };
                    Impl.prototype = new jock.tuple.Tuple();

                    var total = args.length;

                    var Methods = {
                        productArity:function () {
                            return total;
                        },
                        productElement:function (index) {
                            if (index >= 0 && index < total) {
                                return args[index];
                            }
                            throw new jock.errors.RangeError();
                        },
                        productPrefix:function () {
                            return "Tuple" + total;
                        }
                    };

                    var closure = function (index) {
                        return function () {
                            return args[index];
                        };
                    };

                    for (var i = 0; i < total; i++) {
                        Methods["_" + (i + 1)] = closure(i);
                    }

                    Impl = jock.extend(Impl, Methods);

                    return new Impl(args);
                })(args.slice());
        }
    }
});
