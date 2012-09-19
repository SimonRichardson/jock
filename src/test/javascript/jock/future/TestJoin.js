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

    it("should add two futures and resolve future 1 mid-flow", function () {
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
});