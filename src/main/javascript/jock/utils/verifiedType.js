jock.package("jock.utils", {
    verifiedType:function (expected, actual) {
        "use strict";

        if (jock.utils.isType(expected, actual))
            return expected;

        throw new jock.errors.TypeError();
    }
});