jock.template = jock.template || {};
jock.template.expressions = jock.template.expressions || {};
jock.template.expressions.OpStr = (function(){
    "use strict";

    var Impl = function(string){
        this.string = string;
    };

    var Methods = {
        getType: function(){
            return jock.template.expressions.OpType.STR;
        }
    };

    return jock.utils.extend(Impl, Methods);
}).call(this);