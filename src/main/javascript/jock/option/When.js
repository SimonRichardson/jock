jock.bundle("jock.option", {
    when:function (option, cases) {
        if (!option)
            throw new jock.errors.ArgumentError("Option can not be null or undefined");
        if (typeof cases !== "object")
            throw new jock.errors.ArgumentError("Expected cases to be an Object");

        var OptionTypes = {
            NONE: "none",
            SOME: "some",
            ANY: "any"
        };

        if (option instanceof jock.option.Option) {
            if (option.isEmpty()) {

                if (cases[OptionTypes.NONE])
                    return cases[OptionTypes.NONE]();
                else {
                    if (cases[OptionTypes.ANY])
                        return cases[OptionTypes.ANY]();
                    else
                        throw new jock.errors.NoSuchElementError("Expected " + OptionTypes.NONE + " in cases");
                }

            } else if (option.isDefined()) {

                if (cases[OptionTypes.SOME])
                    return cases[OptionTypes.SOME](option.get());
                else {
                    if (cases[OptionTypes.ANY])
                        return cases[OptionTypes.ANY](option.get());
                    else
                        throw new jock.errors.NoSuchElementError("Expected " + OptionTypes.SOME + " in cases");
                }

            }
        }

        throw new jock.errors.TypeError("Expected: jock.option.Option");
    }
});