jock.package("jock.product", {
    ProductIterator:(function () {
        "use strict";

        // Note (Simon) : prevent scope instances leaking.
        return function (product) {
            var index = 0;
            var arity = product.productArity();

            this.hasNext = function(){
                return index < arity;
            };
            this.next = function(){
                if(this.hasNext())
                    return jock.option.some(product.productElement(index++));
                return jock.option.none();
            };
        };
    })()
});