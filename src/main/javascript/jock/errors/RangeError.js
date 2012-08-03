jock.errors = jock.errors || {};
jock.errors.RangeError = (function(){
    "use strict";

    var Impl = function(){
        Error.apply(this, arguments);
    };
    Impl.prototype = new Error();
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "RangeError";
    return Impl;
}).call(this);