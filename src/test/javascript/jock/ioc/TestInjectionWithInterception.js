describe("Injector", function () {
    "use strict";

    var Injector = jock.ioc.Injectors.DEFAULT,
        InjectionPoint = jock.ioc.InjectionPoint,
        inject = jock.ioc.inject;

    var MockModule = function () {
        var instance = Object.create(jock.ioc.AbstractModule);
        instance.configure = function () {
        };
        return Object.freeze(instance);
    };

    describe("when injecting and then intercepting around", function () {
        var module;

        var A = function () {
        };
        A.prototype = {
            identity:function (x){
                return x;
            },
            getName:function (){
                return "Name(A)";
            },
            toString:function () {
                return "A";
            }
        };
        var value = new A();

        beforeEach(function () {
            module = MockModule();
            module.configure = function () {
                this.bind(A).toInstance(value);
            };

            module = Injector.initialize(module);
        });

        afterEach(function () {
            Injector.clearAll();
        });

        it("should intercept and return B", function () {
            var object = module.getInstance(function () {
                this.object = inject(A).intercept.around({
                    toString:function () {
                        return "B";
                    }
                }).get;
            });
            expect(object.object.toString()).toEqual("B");
        });

        it("should intercept more than one method", function () {
            var object = module.getInstance(function () {
                this.object = inject(A).intercept.around({
                    getName:function () {
                        return "Name(B)";
                    },
                    toString:function () {
                        return "B";
                    }
                }).get;
            });
            expect(object.object.getName()).toEqual("Name(B)");
        });

        it("should intercept and return correct arguments, with original method as first argument", function () {
            var num = 1;
            var object = module.getInstance(function () {
                this.object = inject(A).intercept.around({
                    identity:function (origin, x) {
                        return "identity(" + x + ")";
                    }
                }).get;
            });
            expect(object.object.identity(num)).toEqual("identity(" + num + ")");
        });

        it("should intercept and return correct multiple arguments, with original method as first argument", function () {
            var num0 = 1;
            var num1 = 2;
            var object = module.getInstance(function () {
                this.object = inject(A).intercept.around({
                    identity:function (origin, x, y) {
                        return "identity(" + x + "," + y + ")";
                    }
                }).get;
            });
            expect(object.object.identity(num0, num1)).toEqual("identity(" + num0 + "," + num1 + ")");
        });

        it("should throw error if method is not present on origin object", function () {
            expect(function(){
                var object = module.getInstance(function () {
                    this.object = inject(A).intercept.around({
                        toString:function () {
                            return "B";
                        },
                        unknown:function () {
                            return "Name(B)";
                        }
                    }).get;
                });
            }).toThrow(new jock.aop.errors.AspectError("Cannot bind unknown method"));
        });
    });
});