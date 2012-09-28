describe("Scope", function () {
    "use strict";

    var Scope = jock.ioc.Scope,
        scope;

    beforeEach(function () {
        scope = Scope();
    });

    it("should calling asSingleton throw an AbstractMethodError", function () {
        expect(function(){
            scope.asSingleton();
        }).toThrow(new jock.errors.AbstractMethodError());
    });
});