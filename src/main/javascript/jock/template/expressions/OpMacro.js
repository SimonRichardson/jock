jock.template = jock.template || {};
jock.template.expressions = jock.template.expressions || {};
jock.template.expressions.OpMacro = (function(){
    "use strict";

    var Impl = function(name, params){
        this.name = name;
        this.params = params;
    };

    var Methods = {
        getType: function(){
            return jock.template.expressions.OpType.MACRO;
        }
    };

    return jock.utils.extend(Impl, Methods);
}).call(this);