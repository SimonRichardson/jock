jock.bundle("jock.option", {
    Option:(function () {
        "use strict";

        var Option = Object.create(jock.product.Product, {
            productPrefix: {
                get : function(){
                    return 'Option';
                }
            }
        });

        return Option;
    })()
});