jock.bundle("jock.ioc", {
    Module:(function () {
        "use strict";

        var Methods = {
            initialize:function () {
                throw new jock.errors.AbstractMethodError();
            },
            getInstance:function (value) {
                throw new jock.errors.AbstractMethodError();
            },
            binds:function (value) {
                throw new jock.errors.AbstractMethodError();
            }
        };

        return jock.extend(function Module() {
        }, Methods);
    })()
});