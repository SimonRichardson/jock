describe("None", function () {
    "use strict";

    var None = jock.option.None,
        Some = jock.option.Some,
        identity = jock.utils.identity;

    it("should not accept any arguments", function () {
        expect(
            function () {
                None({})
            }).toThrow(new jock.errors.ArgumentError('Unexpected arguments'));
    });

    it("should be defined", function () {
        expect(None().isDefined()).toBeFalsy();
    });

    it("should be empty", function () {
        expect(None().isEmpty()).toBeTruthy();
    });

    it("should have no value", function () {
        expect(
            function () {
                None().get()
            }).toThrow(new jock.errors.NoSuchElementError());
    });

    describe("when getOrElse on none", function () {

        it("should result in undefined if pass result back", function () {
            expect(None().getOrElse(identity)).toBeUndefined();
        });

        it("should return some value", function () {
            var value = {};

            expect(None().getOrElse(function () {
                return value;
            })).toEqual(value);
        });
    });

    describe("when filter on none", function () {

        it("should not filter if called", function () {
            None().filter(function (v) {
                fail();
            });
        });
    });

    describe("when foreach on none", function () {

        it("should not iterate if called", function () {
            None().foreach(function (v) {
                fail();
            });
        });
    });

    describe("when flatMap on none", function () {

        it("should not iterate if called", function () {
            None().flatMap(function (v) {
                fail();
            });
        });
    });

    describe("when map on none", function () {

        it("should not iterate if called", function () {
            None().map(function (v) {
                fail();
            });
        });
    });

    describe("when orElse on none", function () {

        it("should none value be some", function () {
            expect(None().orElse(function () {
                return Some(true);
            })).toBeType(jock.option.Some);
        });

        it("should none value be false", function () {
            expect(None().orElse(
                function () {
                    return Some(false);
                }).get()).toBeFalsy();
        });

        it("should none be equal to expected orElse call", function () {
            var func = function () {
                return Some(false);
            }
            expect(func().equals(None().orElse(func))).toBeTruthy();
        });
    });

    describe("when equals on none", function () {

        it("none should equal none", function () {
            expect(None().equals(None())).toBeTruthy();
        });

        it("some null should not equal none", function () {
            expect(Some(null).equals(None())).toBeFalsy();
        });

        it("some undefined should not equal none", function () {
            expect(Some(undefined).equals(None())).toBeFalsy();
        });
    });

    describe("when toString on none", function () {

        it("should none be None", function () {
            expect(None().toString()).toEqual("None");
        });
    });

    describe("when product on some", function () {

        it("should have product arity of 0", function () {
            expect(None().productArity()).toEqual(0);
        });

        it("should have product prefix of None", function () {
            expect(None().productPrefix()).toEqual("None");
        });

        it("should throw RangeError for product element at 0", function () {
            expect(
                function () {
                    None().productElement(1)
                }).toThrow(new jock.errors.RangeError());
        });
    });
});