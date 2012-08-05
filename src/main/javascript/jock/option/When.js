jock.option = jock.option || {};
jock.option.When = function (option, cases) {
    if (!option)
        throw new jock.errors.ArgumentError("Option can not be null or undefined");
    if (typeof cases !== "object")
        throw new jock.errors.ArgumentError("Expected cases to be an Object");

    if (option instanceof jock.option.Option) {
        if (option.isEmpty()) {
            if (cases["none"])
                return cases["none"]();
            else {
                if (cases["any"])
                    return cases["any"]();
                else
                    throw new jock.errors.NoSuchElementError("Expected none in cases");
            }
        } else if (option.isDefined()) {
            if (cases["some"])
                return cases["some"](option.get());
            else {
                if (cases["any"])
                    return cases["any"](option.get());
                else
                    throw new jock.errors.NoSuchElementError("Expected some in cases");
            }
        }
    }

    throw new jock.errors.TypeError("Expected: jock.option.Option");
};