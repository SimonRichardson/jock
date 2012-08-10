jock.ioc = jock.ioc || {};
jock.ioc.InjectionPoint = (function () {
    "use strict";

    var Aspect = jock.aop.Aspect;

    var Impl = function (value) {
        this._aspect = new Aspect(value);
    };
    Impl.prototype = {};
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "InjectionPoint";

    var Methods = {
        get:function () {
            return this._aspect.get();
        },
        intercept:function () {
            return this._aspect;
        }
    };

    return jock.utils.extends(Impl, Methods);
}).call(this);