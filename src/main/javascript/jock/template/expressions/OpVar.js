jock.template = jock.template || {};
jock.template.expressions = jock.template.expressions || {};
jock.template.expressions.OpVar = (function(){
    "use strict";

    var Impl = function(variable){
        this.variable = variable;
    };

    var Methods = {
        getType: function(){
            return jock.template.expressions.OpType.VAR;
        }
    };

    return jock.utils.extend(Impl, Methods);
}).call(this);