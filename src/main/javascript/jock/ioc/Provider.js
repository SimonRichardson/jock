jock.bundle("jock.ioc", {
    Provider:(function () {
        "use strict";

        var Methods = {
            get:function () {
                throw new jock.errors.AbstractMethodError();
            }
        };

        return jock.extend(function Provider() {
        }, Methods);
    })()
});