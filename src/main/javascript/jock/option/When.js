jock.option = jock.option || {};
jock.option.When = function (option, cases) {
    if (typeof cases != "object") throw new jock.errors.ArgumentError("Expected cases to be an Object");

    if (option instanceof jock.option.Option) {
        if (option instanceof jock.option.None) {
            if (cases["none"]) return cases["none"]();
            else {
                if (cases["any"]) return cases["any"]();
                else throw new jock.errors.NoSuchElementError("Expected none in cases");
            }
        } else if (option instanceof  jock.option.Some) {
            if (cases["some"]) return cases["some"](option.get());
            else {
                if (cases["any"]) return cases["any"](option.get());
                else throw new jock.errors.NoSuchElementError("Expected some in cases");
            }
        } else throw new jock.errors.TypeError("Expected: funk.option.Option");
    }
};