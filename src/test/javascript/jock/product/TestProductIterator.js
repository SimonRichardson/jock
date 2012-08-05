describe("Product", function () {
    "use strict";

    var product,
        productIterator;

    var MockProduct = function(){
        jock.product.Product.call(this);
    };
    MockProduct.prototype = new jock.product.Product();
    MockProduct.prototype.constructor = MockProduct;
    MockProduct.prototype.name = "MockProduct"
    MockProduct.prototype.productArity = function(){
        return 0;
    };

    beforeEach(function () {
        product = new MockProduct();
        productIterator = new jock.product.ProductIterator(product);
    });

    it("should calling hasNext return false for product instance", function () {
        expect(productIterator.hasNext()).toBeFalsy();
    });

    it("should calling next return None for product instance", function () {
        expect(productIterator.next()).toEqual(jock.option.None());
    });
});