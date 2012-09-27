jock.bundle("jock.product", {
    ProductIterator:(function () {
        "use strict";

        return function(product) {

            var index = 0;
            var arity = product.productArity;

            var instance = Object.create(null, {
                hasNext:{
                    get:function () {
                        return index < arity;
                    },
                    configurable:false
                },
                next:{
                    get:function(){
                        if(this.hasNext) return jock.option.some(product.productElement(index++));
                        else return jock.option.none();
                    },
                    configurable:false
                }
            });

            return Object.freeze(instance);
        };
    })()
});