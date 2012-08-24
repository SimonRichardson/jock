jock.template = jock.template || {};
jock.template.expressions = jock.template.expressions || {};
jock.template.expressions.OpForeach = (function(){
    "use strict";

    var Impl = function(expression, loop){
        this.expression = expression;
        this.loop = loop;
    };

    var Methods = {
        getType: function(){
            return jock.template.expressions.OpType.FOREACH;
        }
    };

    return jock.utils.extend(Impl, Methods);
}).call(this);