describe("Provider", function () {
    "use strict";

    var Provider = jock.ioc.Provider,
        provider;

    beforeEach(function () {
        provider = Object.create(Provider);
    });

    it("should calling get throw an AbstractMethodError", function () {
        expect(function(){
            provider.get;
        }).toThrow(new jock.errors.AbstractMethodError());
    });
});