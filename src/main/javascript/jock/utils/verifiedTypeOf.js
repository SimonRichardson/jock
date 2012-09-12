jock.bundle("jock.utils", {
    verifiedTypeOf:function (expected, actual) {
        if (typeof expected === actual)
            return expected;

        throw new jock.errors.TypeError();
    }
});