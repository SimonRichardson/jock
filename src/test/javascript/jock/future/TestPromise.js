describe("Promise", function () {

    var Deferred = jock.future.Deferred;

    it("should generate a valid promise", function () {
        var deferred = new Deferred();
        var promise = deferred.promise();

        expect(promise).not.toBeNull();
    });

    it("should adding then, should return the same promise", function () {
        var deferred = new Deferred();
        var promise = deferred.promise();

        expect(promise.then(function (value) {
            fail();
        })).toEqual(promise);
    });

    it("should adding but, should return the same promise", function () {
        var deferred = new Deferred();
        var promise = deferred.promise();

        expect(promise.but(function (value) {
            fail();
        })).toEqual(promise);
    });

    it("should adding then, then calling resolve dispatch completed", function () {
        var dispatched = false;
        var deferred = new Deferred();

        var promise = deferred.promise();
        promise.then(function (value) {
            dispatched = true;
        });
        deferred.resolve(1.23);

        expect(dispatched).toBeTruthy();
    });

    it("should adding then, then calling abort should not dispatch completed", function () {
        var dispatched = false;
        var deferred = new Deferred();

        var promise = deferred.promise();
        promise.then(function (value) {
            fail();
        });
        deferred.abort();

        expect(dispatched).toBeFalsy();
    });

    it("should adding then, then calling reject should not dispatch completed", function () {
        var dispatched = false;
        var deferred = new Deferred();

        var promise = deferred.promise();
        promise.then(function (value) {
            fail();
        });
        deferred.reject(new Error());

        expect(dispatched).toBeFalsy();
    });


    describe("chaining", function () {

        var task,
            Task = function () {
        };
        Task.prototype = {
            run:function () {
                var f = new Deferred();
                setTimeout(function () {
                    f.resolve(1);
                }, 100);
                return f.promise();
            },
            run2:function (promise) {
                var f = new Deferred();
                promise.then(function (value) {
                    setTimeout(function () {
                        f.resolve(2);
                    }, 100);
                }).but(function(error){
                    f.reject(error);
                });
                return f.promise();
            }
        };

        beforeEach(function () {
            task = new Task();
        });

        it("should chaining of promises complete with taskValue of 2", function () {
            var taskValue = 0;

            var promise0 = task.run();
            var promise1 = task.run2(promise0);
            promise1.then(function (value) {
                taskValue = value.get();
            });

            waitsFor(function () {
                return taskValue === 2;
            }, "Long running task value", 1000);

            runs(function () {
                expect(taskValue).toEqual(2);
            });
        });
    });

});