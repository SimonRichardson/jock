jock.ioc = jock.ioc || {};
jock.ioc.Scope = (function(){
    "use strict";

    var Impl = function(){
    };
    Impl.prototype = {};
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "Scope";

    var Methods = {
        asSingleton: function(){
            throw new jock.errors.AbstractMethodError();
        }
    };

    return jock.utils.extend(Impl, Methods);
}).call(this);