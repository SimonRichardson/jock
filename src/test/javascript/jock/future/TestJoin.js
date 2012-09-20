describe("Join", function () {

    var Future = jock.future.Future,
        Join = jock.future.Join;

    it("should generate a valid join", function () {
        var join = new Join();
        expect(join).not.toBeNull();
    });

    it("should calling get on a new future should return Option", function () {
        var join = new Join();
        expect(join.get()).toBeType(jock.option.Option);
    });

    it("should add a task and return a new join", function () {
        var join = new Join();
        expect(join.add(new Future())).not.toEqual(join);
    });

    it("should add one future and wait for the futures to be done", function () {
        var value = 1.1,
            executed = false;

        var future = new Future();

        var join = new Join();
        join = join.add(future).then(function (tuple) {
            executed = tuple._1().get() === value;
        });
        future.resolve(value);

        expect(executed).toBeTruthy();
    });

    it("should add two futures and wait for the futures to be done", function () {
        var value0 = 1.1,
            value1 = 2.2,
            executed = false;

        var future0 = new Future();
        var future1 = new Future();

        var join = new Join();
        join.add(future0).add(future1).then(function (tuple) {
            executed = tuple._1().get() === value0 && tuple._2().get() === value1;
        });

        future0.resolve(value0);
        future1.resolve(value1);

        expect(executed).toBeTruthy();
    });

    it("should add two futures and resolve in a different order and wait for the futures to be done", function () {
        var value0 = 1.1,
            value1 = 2.2,
            executed = false;

        var future0 = new Future();
        var future1 = new Future();

        var join = new Join();
        join.add(future0).add(future1).then(function (tuple) {
            executed = tuple._1().get() === value0 && tuple._2().get() === value1;
        });

        future1.resolve(value1);
        future0.resolve(value0);

        expect(executed).toBeTruthy();
    });

    it("should add two futures and resolve with timeout in a different order and wait for the futures to be done", function () {
        var value0 = 1.1,
            value1 = 2.2,
            total = value0 + value1,
            sum = 0,
            executed = false;

        var future0 = new Future();
        var future1 = new Future();

        var join = new Join();
        join.add(future0).add(future1).then(function (tuple) {
            sum = tuple._1().get() + tuple._2().get();
            executed = tuple._1().get() === value0 && tuple._2().get() === value1;
        });

        setTimeout(function () {
            future1.resolve(value1);
        }, 300);

        setTimeout(function () {
            future0.resolve(value0);
        }, 500);

        waitsFor(function () {
            return sum === total;
        }, "Long running task value", 1000);

        runs(function () {
            expect(executed).toBeTruthy();
        });
    });

    it("should add two futures then should be called once", function () {
        var value0 = 1.1,
            value1 = 2.2,
            executed = 0;

        var future0 = new Future();
        var future1 = new Future();

        var join = new Join();
        join.add(future0).add(future1).then(function (tuple) {
            executed++;
        });

        future1.resolve(value1);
        future0.resolve(value0);

        expect(executed).toEqual(1);
    });

    it("should add two futures and result match total", function () {
        var value0 = 1.1,
            value1 = 2.2,
            sum = 0,
            total = value0 + value1;

        var future0 = new Future();
        var future1 = new Future();

        var join = new Join();
        join.add(future0).add(future1).then(function (tuple) {
            sum = tuple._1().get() + tuple._2().get();
        });

        future1.resolve(value1);
        future0.resolve(value0);

        expect(sum).toEqual(total);
    });

    it("should add two futures and result 1 match value 1", function () {
        var value0 = 1.1,
            value1 = 2.2,
            sum = 0;

        var future0 = new Future();
        var future1 = new Future();

        var join = new Join();
        join.add(future0).add(future1).then(function (tuple) {
            sum = tuple._2().get();
        });

        future1.resolve(value1);
        future0.resolve(value0);

        expect(sum).toEqual(value1);
    });

    it("should add two futures and resolve future 1 mid-flow", function () {
        var value0 = 1.1,
            value1 = 2.2,
            sum = 0,
            total = value0 + value1;

        var future0 = new Future();
        var future1 = new Future();

        var join = new Join();
        join = join.add(future0);

        future1.resolve(value1);

        join.add(future1).then(function (tuple) {
            sum = tuple._1().get() + tuple._2().get();
        });

        future0.resolve(value0);

        expect(sum).toEqual(total);
    });

    it("should add two futures and resolve future 0 mid-flow", function () {
        var value0 = 1.1,
            value1 = 2.2,
            sum = 0,
            total = value0 + value1;

        var future0 = new Future();
        var future1 = new Future();

        var join = new Join();
        join = join.add(future0);

        future0.resolve(value0);

        join.add(future1).then(function (tuple) {
            sum = tuple._1().get() + tuple._2().get();
        });

        future1.resolve(value1);

        expect(sum).toEqual(total);
    });

    it("should add two futures and resolve future 0 and 1 mid-flow", function () {
        var value0 = 1.1,
            value1 = 2.2,
            sum = 0,
            total = value0 + value1;

        var future0 = new Future();
        var future1 = new Future();

        var join = new Join();
        join = join.add(future0);

        future0.resolve(value0);

        join = join.add(future1);

        future1.resolve(value1);

        join.then(function (tuple) {
            sum = tuple._1().get() + tuple._2().get();
        });

        expect(sum).toEqual(total);
    });

    it("should add two futures and resolve future 1 pre-flow", function () {
        var value0 = 1.1,
            value1 = 2.2,
            sum = 0,
            total = value0 + value1;

        var future0 = new Future();
        var future1 = new Future();

        var join = new Join();
        join = join.add(future0);

        future0.resolve(value0);
        future1.resolve(value1);

        join = join.add(future1);

        join.then(function (tuple) {
            sum = tuple._1().get() + tuple._2().get();
        });

        expect(sum).toEqual(total);
    });

    it("should add two futures and one should reject in the wrong order and should not complete", function () {
        var executed = false;

        var future0 = new Future();
        var future1 = new Future();

        var join = new Join();
        join.add(future0).add(future1).then(function (tuple) {
            fail();
            executed = true;
        });

        future1.resolve(1.1);
        future0.reject(new Error());

        expect(executed).toBeFalsy();
    });

    it("should add two futures and one should reject in the right order and should not complete", function () {
        var executed = false;

        var future0 = new Future();
        var future1 = new Future();

        var join = new Join();
        join.add(future0).add(future1).then(function (tuple) {
            fail();
            executed = true;
        });

        future0.resolve(1.1);
        future1.reject(new Error());

        expect(executed).toBeFalsy();
    });

    it("should add two futures and one should reject in mid-flow in the right order and should not complete", function () {
        var executed = false;

        var future0 = new Future();
        var future1 = new Future();

        var join = new Join();
        join = join.add(future0);

        future0.resolve(1.1);

        join.add(future1).then(function (tuple) {
            fail();
            executed = true;
        });

        future1.reject(new Error());

        expect(executed).toBeFalsy();
    });

    it("should add two futures and one should reject in mid-flow in the wrong order and should not complete", function () {
        var executed = false;

        var future0 = new Future();
        var future1 = new Future();

        var join = new Join();
        join = join.add(future0);

        future1.reject(new Error());

        join.add(future1).then(function (tuple) {
            fail();
            executed = true;
        });

        future0.resolve(1.1);

        expect(executed).toBeFalsy();
    });

    it("should add two futures and fail one, calling the but callback", function () {
        var executed = false;

        var future0 = new Future();
        var future1 = new Future();

        var join = new Join();
        join.add(future0).add(future1).then(function(tuple){
            fail();
        }).but(function (tuple) {
            executed = true;
        });

        future0.resolve(1.1);
        future1.reject(new Error());

        expect(executed).toBeTruthy();
    });

    it("should add two futures and fail one making sure that the error is the same one as passed", function () {
        var value0 = 1.1,
            value1 = new Error("fail"),
            executed = false;

        var future0 = new Future();
        var future1 = new Future();

        var join = new Join();
        join.add(future0).add(future1).then(function(tuple){
            fail();
        }).but(function (tuple) {
                executed = tuple._1().get() === value0 && tuple._2().get() === value1;
            });

        future0.resolve(value0);
        future1.reject(value1);

        expect(executed).toBeTruthy();
    });

    it("should calling get on empty join should return none", function () {
        var join = new Join();
        expect(join.get().isEmpty()).toBeTruthy();
    });

    it("should calling get on empty join should return none", function () {
        var future0 = new Future();
        var future1 = new Future();

        var join = new Join();
        join = join.add(future0).add(future1);

        expect(join.get().isDefined()).toBeTruthy();
    });

    it("should calling get on empty join should return none", function () {
        var value0 = 1.1,
            value1 = 2.2;

        var future0 = new Future();
        var future1 = new Future();

        var join = new Join();
        join = join.add(future0).add(future1);

        future0.resolve(value0);
        future1.resolve(value1);

        expect(join.get().get()._1().get()).toEqual(value0);
    });
});