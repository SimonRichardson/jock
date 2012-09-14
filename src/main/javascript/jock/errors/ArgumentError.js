jock.bundle("jock.errors", {
    ArgumentError:(function () {
        "use strict";

        var Impl = function ArgumentError(message) {
            Error.apply(this, arguments);

            if (typeof message !== "undefined")
                this.message = message;
            else
                this.message = "";

            //this.message += "\n" + jock.utils.stackTrace();
        };
        Impl.prototype = new Error();
        Impl.prototype.constructor = Impl;

        return Impl;
    })()
});