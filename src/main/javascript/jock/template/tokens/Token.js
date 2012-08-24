jock.template.tokens = jock.template.tokens || {};
jock.template.tokens.Token = (function(){
    "use strict";

    var Impl = function(p, s, l){
        this.p = p;
        this.s = s;
        this.l = l;
    };

    return Impl;
}).call(this);