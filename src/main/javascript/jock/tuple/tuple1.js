jock.tuple = jock.tuple || {};
jock.tuple.tuple1 = (function () {
    "use strict";

    var Impl = function (_1) {
        jock.tuple.Tuple.call(this);

        this.__1 = _1;
    };
    Impl.prototype = new jock.tuple.Tuple();
    Impl.prototype.name = "Tuple1";

    var Methods = {
        _1: function(){
            return this.__1;
        },
        productArity: function(){
            return 1;
        },
        productElement: function(index){
            if(index === 0) return this._1();
            else throw new jock.errors.RangeError();
        },
        productPrefix: function() {
            return "Tuple1";
        }
    };

    jock.utils.extend(Impl, Methods);

    return function(_1){
        return new Impl(_1);
    };
}).call(this);
