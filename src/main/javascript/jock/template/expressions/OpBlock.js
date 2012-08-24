jock.template = jock.template || {};
jock.template.expressions = jock.template.expressions || {};
jock.template.expressions.OpBlock = (function(){
    "use strict";

    var Impl = function(block){
        this.block = block;
    };

    var Methods = {
        getType: function(){
            return jock.template.expressions.OpType.BLOCK;
        }
    };

    return jock.utils.extend(Impl, Methods);
}).call(this);