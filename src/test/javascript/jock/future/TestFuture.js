describe("Future", function () {

    var Future = jock.future.Future;

    it("should generate a valid future", function () {
        var future = new Future();
        expect(future).not.toBeNull();
    });

    it("should calling get on a new future should return Option", function () {
        var future = new Future();
        expect(future.get()).toBeType(jock.option.Option);
    });

    it("should calling get on a new future should return none", function () {
        var future = new Future();
        expect(future.get().isEmpty()).toBeTruthy();
    });

    it("should calling attempt on a new future should return Either", function () {
        var future = new Future();
        expect(future.attempt()).toBeType(jock.either.Either);
    });

    it("should calling attempt on a new future should return left", function () {
        var future = new Future();
        expect(future.attempt().isLeft()).toBeTruthy();
    });

    it("should calling resolve on a future calling get should return Option", function () {
        var future = new Future();
        future.resolve(1);
        expect(future.get()).toBeType(jock.option.Option);
    });

    it("should calling resolve on a future should call get and result should be defined", function () {
        var future = new Future();
        future.resolve(1);
        expect(future.get().isDefined()).toBeTruthy();
    });

    it("should adding then, should return the same future", function () {
        var future = new Future();
        expect(future.then(function (value) {
            fail();
        })).toEqual(future);
    });

    it("should adding but, should return the same future", function () {
        var future = new Future();
        expect(future.but(function (value) {
            fail();
        })).toEqual(future);
    });

    it("should adding then, then calling resolve dispatch completed", function () {
        var dispatched = false;
        var future = new Future();
        future.then(function (value) {
            dispatched = true;
        });
        future.resolve(1.23);

        expect(dispatched).toBeTruthy();
    });

    it("should adding then, then calling abort should not dispatch completed", function () {
        var dispatched = false;
        var future = new Future();
        future.then(function (value) {
            fail();
        });
        future.abort();

        expect(dispatched).toBeFalsy();
    });

    it("should adding then, then calling reject should not dispatch completed", function () {
        var dispatched = false;
        var future = new Future();
        future.then(function (value) {
            fail();
        });
        future.reject(new Error());

        expect(dispatched).toBeFalsy();
    });


    describe("chaining", function () {

        var task,
            Task = function () {
        };
        Task.prototype = {
            run:function () {
                var f = new Future();
                setTimeout(function () {
                    f.resolve(1);
                }, 100);
                return f;
            },
            run2:function (future) {
                var f = new Future();
                future.then(function (value) {
                    setTimeout(function () {
                        f.resolve(2);
                    }, 100);
                }).but(function(error){
                    f.reject(error);
                });
                return f;
            }
        };

        beforeEach(function () {
            task = new Task();
        });

        it("should chaining of futures complete with taskValue of 2", function () {
            var taskValue = 0;

            var future0 = task.run();
            var future1 = task.run2(future0);
            future1.then(function (value) {
                taskValue = value.get();
            });

            waitsFor(function () {
                return taskValue === 2;
            }, "Long running task value", 1000);

            runs(function () {
                expect(taskValue).toEqual(2);
            });
        });

        it("should chaining of futures fail and dispatch to new future", function () {
            var failed = false;

            var future0 = task.run();
            var future1 = task.run2(future0);
            future1.but(function (value) {
                failed = true;
            });

            future0.reject(new Error("future fail"));

            expect(failed).toBeTruthy();
        });
    });

});