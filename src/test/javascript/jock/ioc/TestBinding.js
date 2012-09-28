describe("Binding", function () {
    "use strict";

    var Binding = jock.ioc.Binding,
        Scope = jock.ioc.Scope;

    var InvalidMockModule = function(){
        return Object.freeze(Object.create({}));
    };

    var MockModule = function () {
        var instance = Object.create(jock.ioc.AbstractModule);
        instance.configure = function () {
        };
        return Object.freeze(instance);
    };

    var MockObject = function(){
        return Object.freeze(Object.create({}));
    };

    var InvalidMockProvider = function(){
        return Object.freeze(Object.create({}));
    };

    var MockProvider = function(){
        var instance = Object.create(jock.ioc.Provider, {
            get: {
                get: function(){
                    return MockObject();
                }
            }
        });
        return Object.freeze(instance);
    };


    it("should be an instance of Scope", function () {
        var binding = Binding(MockModule(), String);
        expect(binding).toBeType(Scope);
    });

    it("should passing null on binding throw ArgumentError", function () {
        expect(function () {
            Binding(null, String);
        }).toThrow(new jock.errors.ArgumentError("Module can not be null/undefined"));
    });

    it("should passing invalid instance of AbstractModule throw a TypeError", function () {
        expect(function () {
            Binding(InvalidMockModule(), String);
        }).toThrow(new jock.errors.TypeError());
    });

    it("should passing object throw a TypeError", function () {
        expect(function () {
            Binding({}, String);
        }).toThrow(new jock.errors.TypeError());
    });

    it("should passing null as a bindType throw an ArgumentError", function () {
        expect(function () {
            Binding(MockModule(), null);
        }).toThrow(new jock.errors.ArgumentError("BindType can not be null/undefined"));
    });

    it("should passing String as a bindType should return same when calling bind", function () {
        var bindingType = String;
        var binding = Binding(MockModule(), bindingType);

        expect(binding.bind() === bindingType).toBeTruthy();
    });

    it("should calling toInstance with null will throw ArgumentError", function () {
        var bindingType = String;
        var binding = Binding(MockModule(), bindingType);

        expect(function () {
            binding.toInstance(null);
        }).toThrow(new jock.errors.ArgumentError("Instance can not be null/undefined"));
    });

    it("should calling toInstance return the binding class", function () {
        var bindingType = String;
        var binding = Binding(MockModule(), bindingType);

        expect(binding.toInstance(String) == binding).toBeTruthy();
    });

    it("should calling toInstance then getInstance return a an instance of Option", function () {
        var bindingType = String;
        var binding = Binding(MockModule(), bindingType);

        expect(binding.toInstance(String).getInstance()).toBeType(jock.option.Option);
    });

    it("should calling toInstance then getInstance return a new instance", function () {
        var bindingType = String;
        var binding = Binding(MockModule(), bindingType);

        expect(binding.toInstance(String).getInstance().get == String).toBeTruthy();
    });

    it("should calling to return the binding class", function () {
        var bindingType = String;
        var binding = Binding(MockModule(), bindingType);

        expect(binding.to(String) == binding).toBeTruthy();
    });

    it("should calling to with null should throw ArgumentError", function () {
        var bindingType = String;
        var binding = Binding(MockModule(), bindingType);

        expect(function () {
            binding.to(null);
        }).toThrow(new jock.errors.ArgumentError("Instance can not be null/undefined"));
    });

    it("should calling to with String then getInstance return a an instance of Option", function () {
        var module = MockModule();
        module.initialize();

        var bindingType = String;
        var binding = Binding(module, bindingType);

        expect(binding.to(String).getInstance()).toBeType(jock.option.Option);
    });

    it("should calling to with String then getInstance return a valid String", function () {
        var module = MockModule();
        module.initialize();

        var bindingType = String;
        var binding = Binding(module, bindingType);

        expect(binding.to(String).getInstance().get instanceof String).toBeTruthy();
    });

    it("should calling to with String then getInstance return a empty String", function () {
        var module = MockModule();
        module.initialize();

        var bindingType = String;
        var binding = Binding(module, bindingType);

        expect(binding.to(String).getInstance().get).toEqual("");
    });

    it("should calling toProvider with null should throw ArgumentError", function () {
        var bindingType = String;
        var binding = Binding(MockModule(), bindingType);

        expect(function () {
            binding.toProvider(null);
        }).toThrow(new jock.errors.ArgumentError("Provider can not be null/undefined"));
    });

    it("should calling toProvider with InvalidProvider should not throw TypeError", function () {
        var bindingType = String;
        var binding = Binding(MockModule(), bindingType);

        expect(binding.toProvider(InvalidMockProvider) == binding).toBeTruthy();
    });

    it("should calling getInstance without adding a type should return an Option", function () {
        var bindingType = String;
        var binding = Binding(MockModule(), bindingType);

        expect(binding.getInstance()).toBeType(jock.option.Option);
    });

    it("should calling getInstance without adding a type should return some", function () {
        var bindingType = String;
        var binding = Binding(MockModule(), bindingType);

        expect(binding.getInstance().isDefined).toBeTruthy();
    });

    it("should calling getInstance without adding a type should return some", function () {
        var bindingType = String;
        var binding = Binding(new MockModule(), bindingType);

        expect(binding.getInstance().get instanceof String).toBeTruthy();
    });

    it("should calling asSingleton should not throw AbstractMethodError", function () {
        var bindingType = String;
        var binding = Binding(MockModule(), bindingType);

        binding.asSingleton();
    });

    it("should calling asSingleton should return same binding instance", function () {
        var bindingType = String;
        var binding = Binding(MockModule(), bindingType);

        expect(binding.asSingleton() == binding).toBeTruthy();
    });

    it("should calling asSingleton, to and getInstance should return same instance", function () {
        var bindingType = String;
        var binding = Binding(MockModule(), bindingType);

        binding.toInstance(MockObject).asSingleton();

        var a = binding.getInstance();
        var b = binding.getInstance();

        expect(a === b).toBeTruthy();
    });
});