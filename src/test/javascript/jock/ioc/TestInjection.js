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

    describe("when injecting null", function(){

        it("throws jock.errors.ArgumentError", function(){
            expect(function(){
                inject(null);
            }).toThrow(new jock.errors.ArgumentError("Given type must not be null."));
        });
    });

    describe("when injecting un-prepaired item", function(){

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
    });
});