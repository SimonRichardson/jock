jock.tuple = jock.tuple || {};
jock.tuple.tuple5 = (function () {
    "use strict";

    var Impl = function (_1, _2, _3, _4, _5) {
        jock.tuple.Tuple.call(this);

        this.__1 = _1;
        this.__2 = _2;
        this.__3 = _3;
        this.__4 = _4;
        this.__5 = _5;
    };
    Impl.prototype = new jock.tuple.Tuple();
    Impl.prototype.name = "Tuple5";

    var Methods = {
        _1: function(){
            return this.__1;
        },
        _2: function(){
            return this.__2;
        },
        _3: function(){
            return this.__3;
        },
        _4: function(){
            return this.__4;
        },
        _5: function(){
            return this.__5;
        },
        productArity: function(){
            return 5;
        },
        productElement: function(index){
            switch(index) {
                case 0: return this._1();
                case 1: return this._2();
                case 2: return this._3();
                case 3: return this._4();
                case 4: return this._5();
                default: throw new jock.errors.RangeError();
            }
        },
        productPrefix: function() {
            return "Tuple5";
        }
    };

    jock.utils.extend(Impl, Methods);

    return function(_1, _2, _3, _4, _5){
        return new Impl(_1, _2, _3, _4, _5);
    };
}).call(this);
