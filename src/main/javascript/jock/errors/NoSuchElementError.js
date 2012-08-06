jock.errors = jock.errors || {};
jock.errors.NoSuchElementError = (function(){
    "use strict";

    var Impl = function(message){
        Error.apply(this, arguments);

        if(typeof message !== "undefined")
            this.message = message;
        else
            this.message = "";
    };
    Impl.prototype = new Error();
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "NoSuchElementError";
    return Impl;
}).call(this);