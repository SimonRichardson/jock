describe("Product", function () {
    "use strict";

    var product;

    beforeEach(function () {
        product = new jock.product.Product();
    });

    it("should throw abstract method error when calling productArity", function () {
        expect(
            function () {
                product.productArity();
            }).toThrow(new jock.errors.AbstractMethodError());
    });

    it("should throw abstract method error when calling productElement", function () {
        expect(
            function () {
                product.productElement();
            }).toThrow(new jock.errors.AbstractMethodError());
    });

    it("should calling productPrefix be equal to empty string", function () {
        expect(product.productPrefix()).toEqual("");
    });

    it("should throw abstract method error when calling getIterator", function () {
        expect(
            function () {
                product.getIterator();
            }).toThrow(new jock.errors.AbstractMethodError());
    });

    xit("should passing null to equals should be false", function () {
        expect(product.equals(null)).toBeFalsy();
    });

    xit("should passing undefined to equals should be false", function () {
        expect(product.equals(undefined)).toBeFalsy();
    });

    xit("should passing true to equals should be false", function () {
        expect(product.equals(true)).toBeFalsy();
    });

    xit("should passing false to equals should be false", function () {
        expect(product.equals(false)).toBeFalsy();
    });

    xit("should passing itself to equals should be true", function () {
        expect(product.equals(product)).toBeFalsy();
    });

    xit("should passing an instance of product to equals should be true", function () {
        expect(product.equals(new jock.product.Product())).toBeFalsy();
    });

    it("should throw abstract method error when calling toString", function () {
        expect(
            function () {
                product.toString();
            }).toThrow(new jock.errors.AbstractMethodError());
    });
});