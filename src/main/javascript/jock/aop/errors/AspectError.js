jock.aop = jock.aop || {};
jock.aop.errors = jock.aop.errors || {};
jock.aop.errors.AspectError = (function(){
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
    Impl.prototype.name = "AspectError";
    return Impl;
}).call(this);