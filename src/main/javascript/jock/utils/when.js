jock.bundle("jock.utils", {
    when:function (type, cases) {
        if (!type)
            throw new jock.errors.ArgumentError("Type can not be null or undefined");
        if (typeof cases !== "object")
            throw new jock.errors.ArgumentError("Expected cases to be an Object");

        if (jock.utils.isType(type, jock.option.Option)) {
            var OptionTypes = {
                NONE:"none",
                SOME:"some",
                ANY:"any"
            };

            var defined = type.isDefined();
            if (!defined && typeof cases[OptionTypes.NONE] === "function")
                return cases[OptionTypes.NONE]();
            else if (defined && typeof cases[OptionTypes.SOME] === "function")
                return cases[OptionTypes.SOME](type.get());

            if (typeof cases[OptionTypes.ANY] === "function")
                return cases[OptionTypes.ANY].apply(this, defined ? [type.get()] : []);
            else {
                var name = defined ? OptionTypes.SOME : OptionTypes.NONE;
                throw new jock.errors.NoSuchElementError("Expected " + name + " in cases");
            }

        } else if (jock.utils.isType(type, jock.either.Either)) {

            var EitherTypes = {
                LEFT:"left",
                RIGHT:"right",
                ANY:"any"
            };

            var left = type.isLeft();
            if (left && typeof cases[EitherTypes.LEFT] === "function")
                return cases[EitherTypes.LEFT](type.get());
            else if (!left && typeof cases[EitherTypes.RIGHT] === "function")
                return cases[EitherTypes.RIGHT](type.get());

            if (typeof cases[EitherTypes.ANY] === "function")
                return cases[EitherTypes.ANY](type.get());
            else {
                var name = left ? EitherTypes.LEFT : EitherTypes.RIGHT;
                throw new jock.errors.NoSuchElementError("Expected " + name + " in cases");
            }
        }

        throw new jock.errors.TypeError("Invalid type");
    }
});