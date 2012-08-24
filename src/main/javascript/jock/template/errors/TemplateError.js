jock.template = jock.template || {};
jock.template.errors = jock.template.errors || {};
jock.template.errors.TemplateError = (function(){
    "use strict";

    var Impl = function(message){
        Error.apply(this, arguments);

        if(typeof message !== "undefined")
            this.message = message;
        else
            this.message = "";

        this.message += "\n" + jock.utils.printStackTrace();
    };
    Impl.prototype = new Error();
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "TemplateError";
    return Impl;
}).call(this);