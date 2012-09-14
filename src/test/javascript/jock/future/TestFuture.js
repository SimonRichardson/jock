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

    it("should calling attempt on a new future should return right", function () {
        var future = new Future();
        expect(future.attempt().isRight()).toBeTruthy();
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

    it("should adding completes, then calling resolve dispatch completed", function () {
        var dispatched = false;
        var future = new Future();
        future.completes(function (value) {
            dispatched = true;
        });
        future.resolve(1.23);

        expect(dispatched).toBeTruthy();
    });

    it("should adding completes, then calling abort should not dispatch completed", function () {
        var dispatched = false;
        var future = new Future();
        future.completes(function (value) {
            fail();
        });
        future.abort();

        expect(dispatched).toBeFalsy();
    });

    it("should adding completes, then calling reject should not dispatch completed", function () {
        var dispatched = false;
        var future = new Future();
        future.completes(function (value) {
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
                future.completes(function (value) {
                    setTimeout(function () {
                        f.resolve(2);
                    }, 100);
                });
                future.fails(function(error){
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
            future1.completes(function (value) {
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
            future1.fails(function (value) {
                failed = true;
            });

            future0.reject(new Error("future fail"));

            expect(failed).toBeTruthy();
        });
    });

});