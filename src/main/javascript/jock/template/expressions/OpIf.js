jock.template = jock.template || {};
jock.template.expressions = jock.template.expressions || {};
jock.template.expressions.OpIf = (function(){
    "use strict";

    var Impl = function(expression, exprIf, exprElse){
        this.expression = expression;
        this.exprIf = exprIf;
        this.exprElse = exprElse;
    };

    var Methods = {
        getType: function(){
            return jock.template.expressions.OpType.IF;
        }
    };

    return jock.utils.extend(Impl, Methods);
}).call(this);