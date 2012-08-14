jock.ioc = jock.ioc || {};
jock.ioc.Provider = (function(){
    "use strict";

    var Impl = function(){};
    Impl.prototype = {};
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "Provider";

    var Methods = {
        get: function(){
            throw new jock.errors.AbstractMethodError();
        }
    };

    return jock.utils.extend(Impl, Methods);
}).call(this);