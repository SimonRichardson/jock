jock.utils = jock.utils || {};
jock.utils.verifiedType = function (expected, actual) {
    if(jock.utils.isType(expected, actual))
        return expected;

    throw new jock.errors.TypeError();
};