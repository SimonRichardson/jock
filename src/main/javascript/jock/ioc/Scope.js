jock.bundle("jock.ioc", {
    Scope:(function () {
        "use strict";

        var Methods = {
            asSingleton:function () {
                throw new jock.errors.AbstractMethodError();
            }
        };

        return jock.extend(function () {
        }, Methods);
    })()
});