describe("Injector", function () {
    "use strict";

    var Injector = jock.ioc.Injectors.DEFAULT,
        Provider = jock.ioc.Provider,
        InjectionPoint = jock.ioc.InjectionPoint,
        inject = jock.ioc.inject;

    var MockModule = function(){
        jock.ioc.AbstractModule.call(this);
    };
    MockModule.prototype = new jock.ioc.AbstractModule();
    MockModule.prototype.constructor = MockModule;
    MockModule.prototype.name = "MockModule";
    MockModule.prototype.configure = function(){};

    var MockSingleton = function(){
        MockSingleton.numInstances++;
    };
    MockSingleton.prototype = {};
    MockSingleton.prototype.constructor = MockSingleton;
    MockSingleton.prototype.name = "MockSingleton";
    MockSingleton.numInstances = 0;

    describe("when injecting null", function(){

        it("throws jock.errors.ArgumentError", function(){
            expect(function(){
                inject(null);
            }).toThrow(new jock.errors.ArgumentError("Given type must not be null."));
        });
    });

    describe("when injecting un-prepared item", function(){

        it("throws jock.ioc.errors.BindingError", function(){
            expect(function(){
                inject(Date);
            }).toThrow(new jock.ioc.errors.BindingError("No binding could be found"));
        });
    });

    describe("when injecting object getInstance is not null", function(){

        it("module is not null when inject into Injector", function(){
            expect(Injector.initialize(new MockModule())).not.toBeNull();
        });
    });

    describe("when injecting String", function(){
        var value = "Test";
        var module;

        beforeEach(function(){
            module = new MockModule();
            module.configure = function() {
                this.bind(String).toInstance(value);
            };

            module = Injector.initialize(module);
        });

        afterEach(function(){
            Injector.clearAll();
        });

        it("should string not be null", function(){
            var object = module.getInstance(function(){
                this.string = inject(String).get();
            });
            expect(object.string).not.toBeNull();
        });

        it("should string be equal to \"Test\"", function(){
            var object = module.getInstance(function(){
                this.string = inject(String).get();
            });
            expect(object.string).toEqual(value);
        });

        it("should string not be null with a new module", function(){
            var object = new MockModule();
            object.configure = function(){
                this.string = inject(String).get();
            };
            expect(object.string).not.toBeNull();
        });

        it("should string be equal to \"Test\" with a new module", function(){
            var object = new MockModule();
            object.configure = function(){
                this.string = inject(String).get();
            };
            expect(object.string).toBeUndefined();
        });

        it("should string be equal to \"Test\" when getting two instances", function(){
            var object0 = module.getInstance(function(){
                this.string = inject(String).get();
            });
            var object1 = module.getInstance(function(){
                this.string = inject(String).get();
            });
            expect(object0.string).toEqual(object1.string);
        });
    });

    describe("when injecting Object", function(){
        var value = {};
        var module;

        beforeEach(function(){
            module = new MockModule();
            module.configure = function() {
                this.bind(Object).toInstance(value);
            };

            module = Injector.initialize(module);
        });

        afterEach(function(){
            Injector.clearAll();
        });

        it("should object not be null", function(){
            var object = module.getInstance(function(){
                this.object = inject(Object).get();
            });
            expect(object.object).not.toBeNull();
        });

        it("should object be equal to \"Test\"", function(){
            var object = module.getInstance(function(){
                this.object = inject(Object).get();
            });
            expect(object.object).toEqual(value);
        });

        it("should object not be null with a new module", function(){
            var object = new MockModule();
            object.configure = function(){
                this.object = inject(Object).get();
            };
            expect(object.object).not.toBeNull();
        });

        it("should object be equal to undefined with a new module", function(){
            var object = new MockModule();
            object.configure = function(){
                this.object = inject(Object);
            };
            expect(object.object).toBeUndefined();
        });

        it("should object be equal to same object when getting two instances", function(){
            var object0 = module.getInstance(function(){
                this.object = inject(Object).get();
            });
            var object1 = module.getInstance(function(){
                this.object = inject(Object).get();
            });
            expect(object0.object).toEqual(object1.object);
        });
    });

    describe("when injecting Singleton", function(){
        var module;

        beforeEach(function(){
            module = new MockModule();
            module.configure = function() {
                this.bind(MockSingleton).asSingleton();
            };

            module = Injector.initialize(module);
        });

        afterEach(function(){
            MockSingleton.numInstances = 0;

            Injector.clearAll();
        });

        it("should object not be null", function(){
            var object = module.getInstance(function(){
                this.singleton = inject(MockSingleton).get();
            });
            expect(object.singleton).not.toBeNull();
        });

        it("should object not be null with a new module", function(){
            var object = new MockModule();
            object.configure = function(){
                this.singleton = inject(MockSingleton).get();
            };
            expect(object.singleton).not.toBeNull();
        });

        it("should object be equal to undefined with a new module", function(){
            var object = new MockModule();
            object.configure = function(){
                this.singleton = inject(MockSingleton).get();
            };
            expect(object.singleton).toBeUndefined();
        });

        it("should object be equal to object when getting two instances", function(){
            var object0 = module.getInstance(function(){
                this.singleton = inject(MockSingleton).get();
            });
            var object1 = module.getInstance(function(){
                this.singleton = inject(MockSingleton).get();
            });
            expect(object0.singleton).toEqual(object1.singleton);
        });

        it("should numInstances be equal to 1 when getting two instances", function(){
            module.getInstance(function(){
                this.singleton = inject(MockSingleton).get();
            });
            module.getInstance(function(){
                this.singleton = inject(MockSingleton).get();
            });
            expect(MockSingleton.numInstances).toEqual(1);
        });
    });

    describe("when injecting a Provider", function(){
        var module;

        var IMockProvider = function(){};
        var IMockProviderObject = function(){};

        var ProvidedObject = function(){};

        var MockProvider = function(){
            Provider.call(this);
        };
        MockProvider.prototype = new Provider();
        MockProvider.prototype.constructor = MockProvider;
        MockProvider.prototype.name = "MockProvider";
        MockProvider.prototype.get = function(){
            return new ProvidedObject();
        };

        beforeEach(function(){
            module = new MockModule();
            module.configure = function() {
                this.bind(IMockProviderObject).toProvider(IMockProvider);
                this.bind(IMockProvider).to(MockProvider);
            };

            module = Injector.initialize(module);
        });

        afterEach(function(){
            Injector.clearAll();
        });

        it("should object not be null", function(){
            var object = module.getInstance(function(){
                this.provider = inject(IMockProviderObject).get();
            });
            expect(object.provider).not.toBeNull();
        });

        it("should object be instance of ProvidedObject", function(){
            var object = module.getInstance(function(){
                this.provider = inject(IMockProviderObject).get();
            });
            expect(object.provider).toBeType(ProvidedObject);
        });

        it("should object be instance of ProvidedObject", function(){
            var object0 = module.getInstance(function(){
                this.provider = inject(IMockProviderObject).get();
            });
            var object1 = module.getInstance(function(){
                this.provider = inject(IMockProviderObject).get();
            });
            expect(object0.provider === object1.provider).toBeFalsy();
        });
    });

    describe("when injecting", function(){
        var value = "Test";
        var module;

        beforeEach(function(){
            module = new MockModule();
            module.configure = function() {
                this.bind(String).toInstance(value);
            };

            module = Injector.initialize(module);
        });

        afterEach(function(){
            Injector.clearAll();
        });

        it("should return an InjectionPoint even for a none prepared injected type", function(){
            var object = module.getInstance(function(){
                this.point = inject(Date);
            });

            expect(object.point instanceof InjectionPoint).toBeTruthy();
        });

        it("should return an InjectionPoint", function(){
            var object = module.getInstance(function(){
                this.point = inject(String);
            });

            expect(object.point instanceof InjectionPoint).toBeTruthy();
        });
    });
});