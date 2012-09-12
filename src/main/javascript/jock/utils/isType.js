jock.bundle("jock.utils", {
    isType:function (expected, actual) {
        "use strict";

        if (expected && typeof expected.is !== "undefined") {
            var index = expected.is.length;
            while (--index > -1) {
                if (expected.is[index] === actual)
                    return true;
            }
        }

        // Nothing was found, go back to native.
        return expected instanceof actual;
    }
});