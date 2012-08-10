describe("Injector", function () {
    "use strict";

    var Injector = jock.ioc.Injectors.DEFAULT,
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
                this.string = inject(String);
            });
            expect(object.string).not.toBeNull();
        });

        it("should string be equal to \"Test\"", function(){
            var object = module.getInstance(function(){
                this.string = inject(String);
            });
            expect(object.string).toEqual(value);
        });

        it("should string not be null with a new module", function(){
            var object = new MockModule();
            object.configure = function(){
                this.string = inject(String);
            };
            expect(object.string).not.toBeNull();
        });

        it("should string be equal to \"Test\" with a new module", function(){
            var object = new MockModule();
            object.configure = function(){
                this.string = inject(String);
            };
            expect(object.string).toBeUndefined();
        });

        it("should string be equal to \"Test\" when getting two instances", function(){
            var object0 = module.getInstance(function(){
                this.string = inject(String);
            });
            var object1 = module.getInstance(function(){
                this.string = inject(String);
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
                this.object = inject(Object);
            });
            expect(object.object).not.toBeNull();
        });

        it("should object be equal to \"Test\"", function(){
            var object = module.getInstance(function(){
                this.object = inject(Object);
            });
            expect(object.object).toEqual(value);
        });

        it("should object not be null with a new module", function(){
            var object = new MockModule();
            object.configure = function(){
                this.object = inject(Object);
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
                this.object = inject(Object);
            });
            var object1 = module.getInstance(function(){
                this.object = inject(Object);
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
                this.singleton = inject(MockSingleton);
            });
            expect(object.singleton).not.toBeNull();
        });

        it("should object not be null with a new module", function(){
            var object = new MockModule();
            object.configure = function(){
                this.singleton = inject(MockSingleton);
            };
            expect(object.singleton).not.toBeNull();
        });

        it("should object be equal to undefined with a new module", function(){
            var object = new MockModule();
            object.configure = function(){
                this.singleton = inject(MockSingleton);
            };
            expect(object.singleton).toBeUndefined();
        });

        it("should object be equal to object when getting two instances", function(){
            var object0 = module.getInstance(function(){
                this.singleton = inject(MockSingleton);
            });
            var object1 = module.getInstance(function(){
                this.singleton = inject(MockSingleton);
            });
            expect(object0.singleton).toEqual(object1.singleton);
        });

        it("should numInstances be equal to 1 when getting two instances", function(){
            module.getInstance(function(){
                this.singleton = inject(MockSingleton);
            });
            module.getInstance(function(){
                this.singleton = inject(MockSingleton);
            });
            expect(MockSingleton.numInstances).toEqual(1);
        });
    });
});