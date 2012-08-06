jock.ioc = jock.ioc || {};
jock.ioc.AbstractModule = (function(){
    "use strict";

    var Impl = function(){
    };
    Impl.prototype = {};
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "AbstractModule";

    var Methods = {
    };

    jock.utils.extends(Impl, Methods);

    return Impl;
}).call(this);