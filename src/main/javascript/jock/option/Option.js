jock.option = jock.option || {};
jock.option.Option = (function(){
    "use strict";

    var Impl = function(){
        jock.product.Product.call(this);
    };
    Impl.prototype = new jock.product.Product();
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "Option";
    return Impl;
}).call(this);