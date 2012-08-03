jock.errors = jock.errors || {};
jock.errors.TypeError = (function(){
    "use strict";

    var Impl = function(){
        Error.apply(this, arguments);
    };
    Impl.prototype = new Error();
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "TypeError";
    return Impl;
}).call(this);