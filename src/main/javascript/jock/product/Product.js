jock.product = jock.product || {};
jock.product.Product = (function () {
    "use strict";

    var MakeString = function (product, separator) {
        var total = product.productArity();

        var buffer = "";
        for (var i = 0; i < total; i++) {
            var element = product.productElement(i);
            buffer += element && element.hasOwnProperty("toString") ? element.toString() : element;

            if (i < total - 1) buffer += separator;
        }
        return buffer;
    };

    var Impl = function () {
    };
    Impl.prototype = {};
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "Product";

    var Methods = {
        productArity:function () {
            throw new jock.errors.AbstractMethodError();
        },
        productElement:function (index) {
            throw new jock.errors.AbstractMethodError();
        },
        equals:function (value) {
            if (value instanceof jock.product.Product) {
                if (this.productArity() === value.productArity()) {
                    var index = this.productArity();
                    while (--index > -1) {
                        if (jock.utils.ne(this.productElement(index), value.productElement(index)))
                            return false;
                    }
                    return true;
                }
            }
            return false;
        },
        productPrefix:function () {
            return "";
        },
        getIterator:function () {
            return new jock.product.ProductIterator(this);
        },
        toString:function () {
            if (0 === this.productArity()) return this.productPrefix();
            else return this.productPrefix() + "(" + MakeString(this, ", ") + ")";
        }
    };

    return jock.utils.extends(Impl, Methods);
}).call(this);