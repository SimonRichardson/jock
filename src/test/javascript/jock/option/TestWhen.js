describe("When", function () {

    var None = jock.option.None,
        Some = jock.option.Some,
        When = jock.option.When;

    it("should throw an error if passing null", function () {
        expect(function () {
            When(null, {
                None:function () {
                    fail();
                },
                Some:function () {
                    fail();
                }
            });
        }).toThrow(new jock.errors.ArgumentError("Option can not be null or undefined"));
    });

    it("should throw an error if passing {}", function () {
        expect(function () {
            When({}, {
                None:function () {
                    fail();
                },
                Some:function () {
                    fail();
                }
            });
        }).toThrow(new jock.errors.TypeError("Expected: jock.option.Option"));
    });

    describe("when calling none", function () {
        it("should return false when none", function () {

            expect(When(None(), {
                None:function () {
                    return false;
                },
                Some:function (value) {
                    fail();
                }
            })).toBeFalsy();
        });
    });

    describe("when calling some", function () {
        it("should return true", function () {
            expect(When(Some(true), {
                None:function () {
                    fail();
                },
                Some:function (value) {
                    return true;
                }
            })).toBeTruthy();
        });

        it("should return the same value as passed in", function () {
            var value = {};
            expect(When(Some(value), {
                None:function () {
                    fail();
                },
                Some:function (value) {
                    return value;
                }
            })).toEqual(value);
        });
    });

    describe("when calling default state (any)", function () {
        it("should return true", function () {
            expect(When(Some(true), {
                Any:function () {
                    return true;
                }
            })).toBeTruthy();
        });

        it("should return the same value as passed in", function () {
            var value = {};
            expect(When(Some(value), {
                Any:function (value) {
                    return value;
                }
            })).toEqual(value);
        });

        it("should throw an error if passing null", function () {
            expect(function () {
                When(null, {
                    Any:function (value) {
                        fail();
                    }
                });
            }).toThrow(new jock.errors.ArgumentError("Option can not be null or undefined"));
        });

        it("should throw an error if passing {}", function () {
            expect(function () {
                When({}, {
                    Any:function (value) {
                        fail();
                    }
                });
            }).toThrow(new jock.errors.TypeError("Expected: jock.option.Option"));
        });
    });
});