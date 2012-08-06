jock.ioc = jock.ioc || {};
jock.ioc.Module = (function(){
    "use strict";

    var Impl = function(){
    };
    Impl.prototype = {};
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "Module";

    var Methods = {
        initialize: function(){
            throw new jock.errors.AbstractMethodError();
        },
        getInstance: function(value){
            throw new jock.errors.AbstractMethodError();
        },
        binds: function(value){
            throw new jock.errors.AbstractMethodError();
        }
    };

    return jock.utils.extends(Impl, Methods);
}).call(this);