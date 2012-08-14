describe("Injector", function () {
    "use strict";

    var Injector = jock.ioc.Injector,
        injector;

    var InvalidMockModule = function(){};
    var MockModule = function(){
        jock.ioc.AbstractModule.call(this);
    };
    MockModule.prototype = new jock.ioc.AbstractModule();
    MockModule.prototype.constructor = MockModule;
    MockModule.prototype.name = "MockModule";
    MockModule.prototype.configure = function(){};

    beforeEach(function () {
        injector = new Injector();
    });

    it("should calling initialize with null should throw a TypeError", function () {
        expect(function(){
            injector.initialize(null);
        }).toThrow(new jock.errors.TypeError());
    });

    it("should calling initialize with invalid module should throw a TypeError", function () {
        expect(function(){
            injector.initialize(new InvalidMockModule());
        }).toThrow(new jock.errors.TypeError());
    });

    it("should calling initialize with valid module should not throw a TypeError", function () {
        injector.initialize(new MockModule());
    });

    it("should calling initialize with valid module should return module", function () {
        var module = new MockModule();
        expect(injector.initialize(module) == module).toBeTruthy();
    });

    it("should calling pushScope with null should throw a TypeError", function () {
        expect(function(){
            injector.pushScope(null);
        }).toThrow(new jock.errors.TypeError());
    });

    it("should calling pushScope with invalid module should throw a TypeError", function () {
        expect(function(){
            injector.pushScope(new InvalidMockModule());
        }).toThrow(new jock.errors.TypeError());
    });

    it("should calling pushScope with valid module should not throw a TypeError", function () {
        injector.pushScope(new MockModule());
    });

    it("should calling pushScope with valid module should return module", function () {
        var module = new MockModule();
        expect(injector.pushScope(module) == module).toBeTruthy();
    });

    it("should calling currentScope should return Option", function () {
        var module = new MockModule();
        injector.initialize(module);

        expect(injector.currentScope() instanceof jock.option.Option).toBeTruthy();
    });

    it("should calling currentScope should return none", function () {
        var module = new MockModule();
        injector.initialize(module);

        expect(injector.currentScope().isEmpty()).toBeTruthy();
    });

    it("should calling popScope with 1 valid module should return Option", function () {
        var module = new MockModule();
        injector.pushScope(module);
        injector.popScope();
        expect(injector.currentScope() instanceof jock.option.Option).toBeTruthy();
    });

    it("should calling popScope with 1 valid module should return none", function () {
        var module = new MockModule();
        injector.pushScope(module);
        injector.popScope();
        expect(injector.currentScope().isEmpty()).toBeTruthy();
    });

    it("should calling popScope with 2 valid modules should return Option", function () {
        var module = new MockModule();
        injector.pushScope(module);
        injector.pushScope(module);
        injector.popScope();
        expect(injector.currentScope() instanceof jock.option.Option).toBeTruthy();
    });

    it("should calling popScope with 2 valid modules should return some", function () {
        var module = new MockModule();
        injector.pushScope(module);
        injector.pushScope(module);
        injector.popScope();
        expect(injector.currentScope().isDefined()).toBeTruthy();
    });

    it("should calling popScope with 2 valid modules should return first module", function () {
        var module0 = new MockModule();
        var module1 = new MockModule();
        injector.pushScope(module0);
        injector.pushScope(module1);
        injector.popScope();
        expect(injector.currentScope().get() == module0).toBeTruthy();
    });

    it("should calling clearAll with nothing should not have a defined scope", function () {
        injector.clearAll();
        expect(injector.currentScope().isEmpty()).toBeTruthy();
    });

    it("should calling clearAll should not have a defined scope", function () {
        var module0 = new MockModule();
        var module1 = new MockModule();
        injector.pushScope(module0);
        injector.pushScope(module1);
        injector.popScope();
        injector.clearAll();
        expect(injector.currentScope().isEmpty()).toBeTruthy();
    });
});