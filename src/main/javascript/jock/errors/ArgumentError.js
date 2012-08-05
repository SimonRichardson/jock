jock.errors = jock.errors || {};
jock.errors.ArgumentError = (function(){
    "use strict";

    var Impl = function(message){
        Error.apply(this, arguments);

        if(typeof message !== "undefined")
            this.message = message;
    };
    Impl.prototype = new Error();
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "ArgumentError";
    return Impl;
}).call(this);