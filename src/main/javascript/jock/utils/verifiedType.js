jock.utils = jock.utils || {};
jock.utils.verifiedType = function (expected, actual) {
    if(expected instanceof actual)
        return expected;

    throw new jock.errors.TypeError();
};