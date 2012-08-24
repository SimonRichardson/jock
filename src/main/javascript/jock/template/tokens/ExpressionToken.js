jock.template = jock.template || {};
jock.template.tokens = jock.template.tokens || {};
jock.template.tokens.ExpressionToken = (function(){
    "use strict";

    var Impl = function(p, s){
        this.p = p;
        this.s = s;
    };

    return Impl;
}).call(this);