describe("AbstractModule", function () {
    "use strict";

    var AbstractModule = jock.ioc.AbstractModule,
        abstractModule;

    beforeEach(function () {
        abstractModule = new AbstractModule();
    });

    it("should calling initialize throw AbstractMethodError", function () {
        expect(function(){
            abstractModule.initialize();
        }).toThrow(new jock.errors.AbstractMethodError());
    });

    it("should calling configure throw AbstractMethodError", function () {
        expect(function(){
            abstractModule.initialize();
        }).toThrow(new jock.errors.AbstractMethodError());
    });

    it("should calling getInstance with null should throw ArgumentError", function () {
        expect(function(){
            abstractModule.getInstance(null);
        }).toThrow(new jock.errors.ArgumentError("Value can not be null/undefined"));
    });

    it("should calling getInstance with {} should throw BindingError", function () {
        expect(function(){
            abstractModule.getInstance({});
        }).toThrow(new jock.ioc.errors.BindingError("Modules have to be created using Injector."));
    });
});