jock.bundle("jock.ioc", {
    Scope:(function () {
        "use strict";

        var Scope = Object.create({});

        Scope.asSingleton = function () {
            throw new jock.errors.AbstractMethodError();
        };

        return function(){
            return Object.create(Scope);
        }
    })()
});