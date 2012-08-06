describe("Binding", function () {
    "use strict";

    var Binding = jock.ioc.Binding,
        Scope = jock.ioc.Scope;

    var InvalidMockModule = function(){};
    var MockModule = function(){
        jock.ioc.AbstractModule.call(this);
    };
    MockModule.prototype = new jock.ioc.AbstractModule();
    MockModule.prototype.constructor = MockModule;
    MockModule.prototype.name = "MockModule";

    it("should be an instance of Scope", function () {
        var binding = new Binding(new MockModule(), String);
        expect(binding instanceof Scope).toBeTruthy();
    });

    it("should passing null on binding throw ArgumentError", function () {
        expect(function(){
            new Binding(null, String);
        }).toThrow(new jock.errors.ArgumentError("Module can not be null/undefined"));
    });

    it("should passing invalid instance of AbstractModule throw a TypeError", function () {
        expect(function(){
            new Binding(new InvalidMockModule(), String);
        }).toThrow(new jock.errors.TypeError());
    });

    it("should passing object throw a TypeError", function () {
        expect(function(){
            new Binding({}, String);
        }).toThrow(new jock.errors.TypeError());
    });

    it("should passing null as a bindType throw an ArgumentError", function () {
        expect(function(){
            new Binding(new MockModule(), null);
        }).toThrow(new jock.errors.ArgumentError("BindType can not be null/undefined"));
    });

    it("should passing String as a bindType should return same when calling bind", function () {
        var bindingType = String;
        var binding = new Binding(new MockModule(), bindingType);

        expect(binding.bind() === bindingType).toBeTruthy();
    });

    it("should calling toInstance return the binding class", function () {
        var bindingType = String;
        var binding = new Binding(new MockModule(), bindingType);

        expect(binding.toInstance(String) == binding).toBeTruthy();
    });

    it("should calling toInstance then getInstance return a an instance of Option", function () {
        var bindingType = String;
        var binding = new Binding(new MockModule(), bindingType);

        expect(binding.toInstance(String).getInstance() instanceof jock.option.Option).toBeTruthy();
    });

    it("should calling toInstance then getInstance return a new instance", function () {
        var bindingType = String;
        var binding = new Binding(new MockModule(), bindingType);

        expect(binding.toInstance(String).getInstance().get() == String).toBeTruthy();
    });
});