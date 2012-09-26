jock.bundle("jock.either", {
    Either:(function () {
        "use strict";

        var Either = Object.create(jock.product.Product, {
            productPrefix: {
                get : function(){
                    return 'Either';
                }
            }
        });

        return Either;
    })()
});