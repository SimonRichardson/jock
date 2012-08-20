jock.utils = jock.utils || {};
jock.utils.isType = function (expected, actual) {
    if(expected && typeof expected.is !== "undefined") {
        var index = expected.is.length;
        while(--index > -1) {
            if(expected.is[index] === actual)
                return true;
        }
    }

    // Nothing was found, go back to native.
    if(expected instanceof actual) return true;
    else return false;
};