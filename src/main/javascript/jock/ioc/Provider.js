jock.bundle("jock.ioc", {
    Provider:(function () {
        "use strict";

        var Provider = Object.create({}, {
            get:{
                get:function () {
                    throw new jock.errors.AbstractMethodError();
                }
            }
        });

        return Provider;
    })()
});