jock.bundle("jock.ioc", {
    InjectionPoint:(function () {
        "use strict";

        var Aspect = jock.aop.Aspect;

        var Impl = function InjectionPoint(value) {
            this._aspect = new Aspect(value);
        };
        Impl.prototype = {};
        Impl.prototype.constructor = Impl;

        var Methods = {
            get:function () {
                return this._aspect.get();
            },
            intercept:function () {
                return this._aspect;
            }
        };

        return jock.extend(Impl, Methods);
    })()
});