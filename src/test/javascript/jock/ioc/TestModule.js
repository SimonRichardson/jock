describe("Module", function () {
    "use strict";

    var Module = jock.ioc.Module,
        module;

    beforeEach(function () {
        module = Object.create(Module);
    });

    it("should calling initialize throw an AbstractMethodError", function () {
        expect(function(){
            module.initialize();
        }).toThrow(new jock.errors.AbstractMethodError());
    });

    it("should calling getInstance throw an AbstractMethodError", function () {
        expect(function(){
            module.getInstance();
        }).toThrow(new jock.errors.AbstractMethodError());
    });

    it("should calling binds throw an AbstractMethodError", function () {
        expect(function(){
            module.binds();
        }).toThrow(new jock.errors.AbstractMethodError());
    });
});