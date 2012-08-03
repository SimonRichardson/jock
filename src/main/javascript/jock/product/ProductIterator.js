jock.product = jock.product || {};
jock.product.ProductIterator = (function () {
    "use strict";

    var Impl = function (product) {
        this._product = product;
        this._arity = product.productArity();
        this._index = 0;
    };
    Impl.prototype = {};
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "ProductIterator";

    var Methods = {
        hasNext:function () {
            return this._index < this._arity;
        },
        next:function () {
            if (this.hasNext()) return jock.option.some(this._product.productElement(this._index++));
            else return jock.option.none();
        }
    };

    jock.utils.extends(Impl, Methods);

    return Impl;
}).call(this);