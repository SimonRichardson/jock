jock.bundle("jock.either", {
    toEither:function (successful, value) {
        "use strict";

        return successful ? jock.either.right(value) : jock.either.left(value);
    }
});