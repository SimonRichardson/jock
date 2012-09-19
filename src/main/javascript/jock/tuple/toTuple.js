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
                throw new jock.errors.NoSuchElementError();
        }
    }
});
