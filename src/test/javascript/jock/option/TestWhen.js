describe("when", function () {

    var none = jock.option.none,
        some = jock.option.some,
        when = jock.option.when;

    it("should throw an error if passing null", function () {
        expect(function () {
            when(null, {
                none:function () {
                    fail();
                },
                some:function () {
                    fail();
                }
            });
        }).toThrow(new jock.errors.ArgumentError("Option can not be null or undefined"));
    });

    it("should throw an error if passing {}", function () {
        expect(function () {
            when({}, {
                none:function () {
                    fail();
                },
                some:function () {
                    fail();
                }
            });
        }).toThrow(new jock.errors.TypeError("Expected: jock.option.Option"));
    });

    describe("when calling none", function () {
        it("should return false when none", function () {

            expect(when(none(), {
                none:function () {
                    return false;
                },
                some:function (value) {
                    fail();
                }
            })).toBeFalsy();
        });
    });

    describe("when calling some", function () {
        it("should return true", function () {
            expect(when(some(true), {
                none:function () {
                    fail();
                },
                some:function (value) {
                    return true;
                }
            })).toBeTruthy();
        });

        it("should return the same value as passed in", function () {
            var value = {};
            expect(when(some(value), {
                none:function () {
                    fail();
                },
                some:function (value) {
                    return value;
                }
            })).toEqual(value);
        });
    });

    describe("when calling default state (any)", function () {
        it("should return true", function () {
            expect(when(some(true), {
                any:function () {
                    return true;
                }
            })).toBeTruthy();
        });

        it("should return the same value as passed in", function () {
            var value = {};
            expect(when(some(value), {
                any:function (value) {
                    return value;
                }
            })).toEqual(value);
        });

        it("should throw an error if passing null", function () {
            expect(function () {
                when(null, {
                    any:function (value) {
                        fail();
                    }
                });
            }).toThrow(new jock.errors.ArgumentError("Option can not be null or undefined"));
        });

        it("should throw an error if passing {}", function () {
            expect(function () {
                when({}, {
                    any:function (value) {
                        fail();
                    }
                });
            }).toThrow(new jock.errors.TypeError("Expected: jock.option.Option"));
        });
    });
});