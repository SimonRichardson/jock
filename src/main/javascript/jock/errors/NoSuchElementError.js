jock.errors = jock.errors || {};
jock.errors.NoSuchElementError = (function(){
    "use strict";

    var Impl = function(){
        Error.apply(this, arguments);
    };
    Impl.prototype = new Error();
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "NoSuchElementError";
    return Impl;
}).call(this);