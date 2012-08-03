jock.utils = jock.utils || {};
jock.utils.eq = function (a, b) {
    "use strict";

    var a0 = a !== null && a !== undefined && (typeof a.equals !== "undefined");
    var b0 = b !== null && b !== undefined && (typeof b.equals !== "undefined");

    if(a0 && b0) return a.equals(b);
    else if((a0 && !b0) || (!a0 && b0)) {

        // Possible option to value comparison
        var a1 = a instanceof jock.option.Option;
        var b1 = b instanceof jock.option.Option;

        if(a1 || b1) {
            var opt = a1 ? a : b;
            var val = a1 ? b : a;

            return when(opt, {
                none: function(){
                    return jock.utils.eq(false, val);
                },
                some: function(value){
                    return jock.utils.eq(value, val);
                }
            });
        }
    }
    else return a === b;
};