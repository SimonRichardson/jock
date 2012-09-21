jock.bundle("jock.either", {
    toEither:function (successful, value) {
        "use strict";

        if(jock.utils.isType(value, jock.either.Either)) {
            return value;
        } else {
            return successful ? jock.either.right(value) : jock.either.left(value);
        }
    }
});