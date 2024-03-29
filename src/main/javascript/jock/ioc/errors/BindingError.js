jock.bundle("jock.ioc.errors", {
    BindingError:(function () {
        "use strict";

        var Impl = function BindingError(message) {
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