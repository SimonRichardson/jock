describe("ProductIterator", function () {
    "use strict";

    var product,
        productIterator;



    beforeEach(function () {
        product = Object.create(jock.product.Product, {
            productArity:{
                get:function () {
                    return 0;
                }
            }
        });

        productIterator = jock.product.ProductIterator(product);
    });

    it("should calling hasNext return false for product instance", function () {
        expect(productIterator.hasNext).toBeFalsy();
    });

    it("should calling next return none for product instance", function () {
        expect(productIterator.next).toEqual(jock.option.none());
    });
});