jock.ioc = jock.ioc || {};
jock.ioc.InjectionPoint = (function () {
    "use strict";

    var Impl = function (value) {
        this._value = value;
    };
    Impl.prototype = {};
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "InjectionPoint";

    var Methods = {
        get:function () {
            return this._value;
        },
        intercept:function () {

        }
    };

    return jock.utils.extends(Impl, Methods);
}).call(this);