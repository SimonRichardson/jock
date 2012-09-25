jock.bundle("jock.product", {
    ProductIterator:(function () {
        "use strict";

        // Note (Simon) : prevent scope instances leaking.
        var ProductIterator = {
            init:function (product) {
                jock.utils.verifiedType(product, jock.utils.Product);

                this._index = 0;
                this._product = product;
            }
        };

        Object.defineProperties(ProductIterator, {
            hasNext:{
                get:function () {
                    return this._index < this._product.arity;
                },
                configurable:false
            },
            next:{
                get:function(){
                    if(this.hasNext) return jock.option.some(this._product.productElement(this._index++));
                    else return jock.option.none();
                },
                configurable:false
            }
        })


        return ProductIterator;
    })()
});