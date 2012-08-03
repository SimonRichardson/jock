jock.errors = jock.errors || {};
jock.errors.ArgumentError = (function(){
    "use strict";

    var Impl = function(){
        Error.apply(this, arguments);
    };
    Impl.prototype = new Error();
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "ArgumentError";
    return Impl;
}).call(this);