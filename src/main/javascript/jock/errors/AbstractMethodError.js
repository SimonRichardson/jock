jock.bundle("jock.errors", {
    AbstractMethodError:(function () {
        "use strict";

        var Impl = function AbstractMethodError(message) {
            Error.apply(this, arguments);

            if (typeof message !== "undefined")
                this.message = message;
            else
                this.message = "";
        };

        Impl.prototype = new Error();
        Impl.prototype.constructor = Impl;

        return Impl;
    })()
});