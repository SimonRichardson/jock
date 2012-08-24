jock.template = jock.template || {};
jock.template.expressions = jock.template.expressions || {};
jock.template.expressions.OpExpr = (function(){
    "use strict";

    var Impl = function(expression){
        this.expression = expression;
    };

    var Methods = {
        getType: function(){
            return jock.template.expressions.OpType.EXPR;
        }
    };

    return jock.utils.extend(Impl, Methods);
}).call(this);