jock.bundle("jock.ioc", {
    Module:(function () {
        "use strict";

        var Module = Object.create({});

        Module.initialize = function () {
            throw new jock.errors.AbstractMethodError();
        };
        Module.getInstance = function (value) {
            throw new jock.errors.AbstractMethodError();
        };
        Module.binds = function (value) {
            throw new jock.errors.AbstractMethodError();
        };

        return Module;
    })()
});