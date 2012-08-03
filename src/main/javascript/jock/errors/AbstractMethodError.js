jock.errors = jock.errors || {};
jock.errors.AbstractMethodError = (function(){
    "use strict";

    var Impl = function(){
        Error.apply(this, arguments);
    };
    Impl.prototype = new Error();
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "AbstractMethodError";
    return Impl;
}).call(this);