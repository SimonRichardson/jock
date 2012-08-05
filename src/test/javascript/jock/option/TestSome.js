describe("Some", function () {
    "use strict";

    var None = jock.option.None,
        Some = jock.option.Some,
        identity = jock.utils.identity;

    it("should be defined", function () {
        expect(Some({}).isDefined()).toBeTruthy();
    });

    it("should be empty", function () {
        expect(Some({}).isEmpty()).toBeFalsy();
    });

    it("should actual value match expected value", function () {
        var value = {};

        expect(Some(value).get()).toEqual(value);
    });

    it("should expected value be undefined if actual value is undefined", function () {
        expect(Some(undefined).get()).toBeUndefined();
    });

    it("should expected value be null if actual value is null", function () {
        expect(Some(null).get()).toBeNull();
    });

    describe("when getOrElse on some", function () {

        it("should not call orElse closure", function () {
            var value = {};

            expect(Some(value).getOrElse(function () {
                fail();
            })).toEqual(value);
        });
    });

    describe("when filter on some", function () {

        it("should pass the same instance as an argument", function () {
            var value = {};
            Some(value).filter(function (v) {
                expect(value).toEqual(v);
            });
        });

        it("should return a valid option", function () {
            var value = {};
            var actual = Some(value).filter(function (v) {
                return v === value;
            });

            expect(value).toEqual(actual.get());
        });

        it("should return a invalid option", function () {
            var value = {};
            var actual = Some(value).filter(function (v) {
                return v !== value;
            });

            expect(actual).toEqual(None());
        });
    });

    describe("when foreach on some", function () {

        it("should pass the same instance as an argument", function () {
            var value = {};

            Some(value).filter(function (v) {
                expect(value).toEqual(v);
            });
        });

        it("should iterate through value", function () {
            var value = {};
            var count = 0;

            Some(value).foreach(function (v) {
                count++;
            });

            expect(count).toEqual(1);
        });
    });

    describe("when flatMap on some", function () {

        it("should pass the same instance as an argument", function () {
            var value = {};

            Some(value).flatMap(function (v) {
                expect(value).toEqual(v);
                return Some(v);
            });
        });

        it("should result in the same value", function () {
            var value = {};

            var actual = Some(value).flatMap(function (v) {
                return Some(v);
            });

            expect(value).toEqual(actual.get());
        });

        it("should result in an TypeError if invalid result", function () {
            var value = {};

            expect(
                function () {
                    Some(value).flatMap(identity);
                }).toThrow(new jock.errors.TypeError());
        });
    });

    describe("when map on some", function () {

        it("should map the value", function () {
            var value = 1234;
            var func = function (x) {
                return x.toString();
            }

            expect(Some(value).map(func).get()).toEqual(func(value));
        });

        it("should map be called multiple times should be the same value", function () {
            var value = 1234;
            var func = function (x) {
                return x.toString();
            }

            expect(Some(value).map(func).get()).toEqual(Some(value).map(func).get());
        });

        it("should map result equal the value entered in some", function () {
            var value = 1234;
            var func = function (x) {
                return x.toString();
            }

            expect(Some(func(value)).equals(Some(value).map(func))).toBeTruthy();
        });
    });

    describe("when orElse on some", function () {

        it("should not call orElse closure", function () {
            var op = Some(true);

            expect(op.orElse(
                function () {
                    fail();
                }).get()).toBeTruthy();
        });

        it("should result in the same value", function () {
            var op = Some(true);

            expect(op.orElse(function () {
                fail();
            })).toEqual(op);
        });
    });

    describe("when equals on some", function () {

        it("should some value 1 equal another some value 1", function () {
            expect(Some(1).equals(Some(1))).toBeTruthy();
        });

        it("should some value null equal another some value null", function () {
            expect(Some(null).equals(Some(null))).toBeTruthy();
        });

        it("should some value undefined equal another some value undefined", function () {
            expect(Some(undefined).equals(Some(undefined))).toBeTruthy();
        });

        it("should some value {} equal same some value {}", function () {
            var value = {};
            expect(Some(value).equals(Some(value))).toBeTruthy();
        });

        it("should some value {} not equal another some value {}", function () {
            expect(Some({}).equals(Some({}))).toBeFalsy();
        });

        it("should some nested be equal to some nested", function () {
            expect(Some(Some(1)).equals(Some(Some(1)))).toBeTruthy();
        });

        it("should some equal match native object match", function () {
            expect(Some(1).equals(Some("1"))).toEqual(Object(1) == Object("1"));
        });
    });

    describe("when toString on some", function () {

        it("should some value be null", function () {
            expect(Some(null).toString()).toEqual("Some(null)");
        });

        it("should some value be undefined", function () {
            expect(Some(undefined).toString()).toEqual("Some(undefined)");
        });

        it("should some value be Array (1,2,3)", function () {
            expect(Some([1, 2, 3]).toString()).toEqual("Some(1,2,3)");
        });

        it("should some value be 1", function () {
            expect(Some(1).toString()).toEqual("Some(1)");
        });

        it("should some value be 1 (as a string)", function () {
            expect(Some("1").toString()).toEqual("Some(1)");
        });

        it("should some value be {}", function () {
            expect(Some({}).toString()).toEqual("Some([object Object])");
        });

        it("should some value be true", function () {
            expect(Some(true).toString()).toEqual("Some(true)");
        });

        it("should some value be false", function () {
            expect(Some(false).toString()).toEqual("Some(false)");
        });
    });

    describe("when product on some", function () {

        it("should have product arity of 1", function () {
            expect(Some(true).productArity()).toEqual(1);
        });

        it("should have product prefix of Some", function () {
            expect(Some(true).productPrefix()).toEqual("Some");
        });

        it("should have product element at 0 of true", function () {
            expect(Some(true).productElement(0)).toBeTruthy();
        });

        it("should throw RangeError for product element at 1", function () {
            expect(
                function () {
                    Some(true).productElement(1)
                }).toThrow(new jock.errors.RangeError());
        });
    });
});