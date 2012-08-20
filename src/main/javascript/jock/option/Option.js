jock.option = jock.option || {};
jock.option.Option = (function(){
    "use strict";

    var Impl = function(){};
    Impl = jock.utils.mixin(Impl, jock.product.Product);
    return Impl;
}).call(this);