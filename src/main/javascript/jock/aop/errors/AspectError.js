jock.bundle("jock.aop.errors", {
    AspectError:(function () {
        "use strict";

        var Impl = function AspectError(message) {
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