jock.template = jock.template || {};
jock.template.tokens = jock.template.tokens || {};
jock.template.tokens.ExpressionToken = (function(){
    "use strict";

    var Impl = function(value, string){
        this.value = value;
        this.string = string;
    };

    return Impl;
}).call(this);