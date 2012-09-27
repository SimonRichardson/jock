jock.bundle("jock.utils", {
    isType:function (expected, actual) {
        "use strict";

        var actualTypeOf = typeof actual;
        var expectedTypeOf = typeof expected;

        if(actualTypeOf === "function" && expected instanceof actual) {
            return true;
        } else if(actualTypeOf === "object" && actual.isPrototypeOf(expected)) {
            return true;
        }

        return false;
    }
});