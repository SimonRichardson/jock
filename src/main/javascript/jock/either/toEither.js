jock.bundle("jock.either", {
    toEither:function (successful, value) {
        "use strict";

        return successful ? jock.either.left(value) : jock.either.right(value);
    }
});