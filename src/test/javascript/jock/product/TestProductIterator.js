describe("Product", function () {
    "use strict";

    var product,
        productIterator;

    beforeEach(function () {
        product = new jock.product.Product();
        productIterator = new jock.product.ProductIterator();
    });

    it("should calling hasNext return false for product instance", function () {
        expect(productIterator.hasNext()).toBeFalsy();
    });

    it("should calling next return None for product instance", function () {
        expect(productIterator.next()).toEqual(jock.option.None());
    });
});