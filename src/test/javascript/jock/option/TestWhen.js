describe("When", function () {

    var None = jock.option.None,
        Some = jock.option.Some,
        When = jock.option.When;

    it("should throw an error if passing null", function () {
        expect(function () {
            When(null, {
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
            When({}, {
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

            expect(When(None(), {
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
            expect(When(Some(true), {
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
            expect(When(Some(value), {
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
            expect(When(Some(true), {
                any:function () {
                    return true;
                }
            })).toBeTruthy();
        });

        it("should return the same value as passed in", function () {
            var value = {};
            expect(When(Some(value), {
                any:function (value) {
                    return value;
                }
            })).toEqual(value);
        });

        it("should throw an error if passing null", function () {
            expect(function () {
                When(null, {
                    any:function (value) {
                        fail();
                    }
                });
            }).toThrow(new jock.errors.ArgumentError("Option can not be null or undefined"));
        });

        it("should throw an error if passing {}", function () {
            expect(function () {
                When({}, {
                    any:function (value) {
                        fail();
                    }
                });
            }).toThrow(new jock.errors.TypeError("Expected: jock.option.Option"));
        });
    });
});