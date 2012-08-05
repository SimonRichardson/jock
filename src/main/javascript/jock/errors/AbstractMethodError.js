jock.errors = jock.errors || {};
jock.errors.AbstractMethodError = (function(){
    "use strict";

    var Impl = function(message){
        Error.apply(this, arguments);

        if(typeof message !== "undefined")
            this.message = message;
    };
    Impl.prototype = new Error();
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "AbstractMethodError";
    return Impl;
}).call(this);