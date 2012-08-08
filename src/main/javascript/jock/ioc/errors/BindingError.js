jock.ioc = jock.ioc || {};
jock.ioc.errors = jock.ioc.errors || {};
jock.ioc.errors.BindingError = (function(){
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
    Impl.prototype.name = "BindingError";
    return Impl;
}).call(this);