jock.bundle("jock.tuple", {
    Tuple:(function () {
        "use strict";

        var Tuple = Object.create(jock.product.Product, {
            productPrefix: {
                get : function(){
                    return 'Tuple';
                }
            }
        });

        return Tuple;
    })()
});
