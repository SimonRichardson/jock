describe("Join", function () {

    var Deferred = jock.future.Deferred,
        Join = jock.future.Join;

    it("should generate a valid join", function () {
        var join = Join();
        expect(join).not.toBeNull();
    });

    it("should calling get on a new deferred should return Option", function () {
        var join = Join();
        expect(join.get).toBeType(jock.option.Option);
    });

    it("should add a task and return a new join", function () {
        var join = Join();
        expect(join.add(Deferred())).not.toEqual(join);
    });

    it("should add one deferred and wait for the deferreds to be done", function () {
        var value = 1.1,
            executed = false;

        var deferred = Deferred();

        var join = Join();
        join = join.add(deferred).then(function (tuple) {
            executed = tuple._1.get === value;
        });
        deferred.resolve(value);

        expect(executed).toBeTruthy();
    });

    it("should add two deferreds and wait for the deferreds to be done", function () {
        var value0 = 1.1,
            value1 = 2.2,
            executed = false;

        var deferred0 = Deferred();
        var deferred1 = Deferred();

        var join = Join();
        join.add(deferred0).add(deferred1).then(function (tuple) {
            executed = tuple._1.get === value0 && tuple._2.get === value1;
        });

        deferred0.resolve(value0);
        deferred1.resolve(value1);

        expect(executed).toBeTruthy();
    });

    it("should add two deferreds and resolve in a different order and wait for the deferreds to be done", function () {
        var value0 = 1.1,
            value1 = 2.2,
            executed = false;

        var deferred0 = Deferred();
        var deferred1 = Deferred();

        var join = Join();
        join.add(deferred0).add(deferred1).then(function (tuple) {
            executed = tuple._1.get === value0 && tuple._2.get === value1;
        });

        deferred1.resolve(value1);
        deferred0.resolve(value0);

        expect(executed).toBeTruthy();
    });

    it("should add two deferreds and resolve with timeout in a different order and wait for the deferreds to be done", function () {
        var value0 = 1.1,
            value1 = 2.2,
            total = value0 + value1,
            sum = 0,
            executed = false;

        var deferred0 = Deferred();
        var deferred1 = Deferred();

        var join = Join();
        join.add(deferred0).add(deferred1).then(function (tuple) {
            sum = tuple._1.get + tuple._2.get;
            executed = tuple._1.get === value0 && tuple._2.get === value1;
        });

        setTimeout(function () {
            deferred1.resolve(value1);
        }, 300);

        setTimeout(function () {
            deferred0.resolve(value0);
        }, 500);

        waitsFor(function () {
            return sum === total;
        }, "Long running task value", 1000);

        runs(function () {
            expect(executed).toBeTruthy();
        });
    });

    it("should add two deferreds then should be called once", function () {
        var value0 = 1.1,
            value1 = 2.2,
            executed = 0;

        var deferred0 = Deferred();
        var deferred1 = Deferred();

        var join = Join();
        join.add(deferred0).add(deferred1).then(function (tuple) {
            executed++;
        });

        deferred1.resolve(value1);
        deferred0.resolve(value0);

        expect(executed).toEqual(1);
    });

    it("should add two deferreds and result match total", function () {
        var value0 = 1.1,
            value1 = 2.2,
            sum = 0,
            total = value0 + value1;

        var deferred0 = Deferred();
        var deferred1 = Deferred();

        var join = Join();
        join.add(deferred0).add(deferred1).then(function (tuple) {
            sum = tuple._1.get + tuple._2.get;
        });

        deferred1.resolve(value1);
        deferred0.resolve(value0);

        expect(sum).toEqual(total);
    });

    it("should add two deferreds and result 1 match value 1", function () {
        var value0 = 1.1,
            value1 = 2.2,
            sum = 0;

        var deferred0 = Deferred();
        var deferred1 = Deferred();

        var join = Join();
        join.add(deferred0).add(deferred1).then(function (tuple) {
            sum = tuple._2.get;
        });

        deferred1.resolve(value1);
        deferred0.resolve(value0);

        expect(sum).toEqual(value1);
    });

    it("should add two deferreds and resolve deferred 1 mid-flow", function () {
        var value0 = 1.1,
            value1 = 2.2,
            sum = 0,
            total = value0 + value1;

        var deferred0 = Deferred();
        var deferred1 = Deferred();

        var join = Join();
        join = join.add(deferred0);

        deferred1.resolve(value1);

        join.add(deferred1).then(function (tuple) {
            sum = tuple._1.get + tuple._2.get;
        });

        deferred0.resolve(value0);

        expect(sum).toEqual(total);
    });

    it("should add two deferreds and resolve deferred 0 mid-flow", function () {
        var value0 = 1.1,
            value1 = 2.2,
            sum = 0,
            total = value0 + value1;

        var deferred0 = Deferred();
        var deferred1 = Deferred();

        var join = Join();
        join = join.add(deferred0);

        deferred0.resolve(value0);

        join.add(deferred1).then(function (tuple) {
            sum = tuple._1.get + tuple._2.get;
        });

        deferred1.resolve(value1);

        expect(sum).toEqual(total);
    });

    it("should add two deferreds and resolve deferred 0 and 1 mid-flow", function () {
        var value0 = 1.1,
            value1 = 2.2,
            sum = 0,
            total = value0 + value1;

        var deferred0 = Deferred();
        var deferred1 = Deferred();

        var join = Join();
        join = join.add(deferred0);

        deferred0.resolve(value0);

        join = join.add(deferred1);

        deferred1.resolve(value1);

        join.then(function (tuple) {
            sum = tuple._1.get + tuple._2.get;
        });

        expect(sum).toEqual(total);
    });

    it("should add two deferreds and resolve deferred 1 pre-flow", function () {
        var value0 = 1.1,
            value1 = 2.2,
            sum = 0,
            total = value0 + value1;

        var deferred0 = Deferred();
        var deferred1 = Deferred();

        var join = Join();
        join = join.add(deferred0);

        deferred0.resolve(value0);
        deferred1.resolve(value1);

        join = join.add(deferred1);

        join.then(function (tuple) {
            sum = tuple._1.get + tuple._2.get;
        });

        expect(sum).toEqual(total);
    });

    it("should add two deferreds and one should reject in the wrong order and should not complete", function () {
        var executed = false;

        var deferred0 = Deferred();
        var deferred1 = Deferred();

        var join = Join();
        join.add(deferred0).add(deferred1).then(function (tuple) {
            fail();
            executed = true;
        });

        deferred1.resolve(1.1);
        deferred0.reject(new Error());

        expect(executed).toBeFalsy();
    });

    it("should add two deferreds and one should reject in the right order and should not complete", function () {
        var executed = false;

        var deferred0 = Deferred();
        var deferred1 = Deferred();

        var join = Join();
        join.add(deferred0).add(deferred1).then(function (tuple) {
            fail();
            executed = true;
        });

        deferred0.resolve(1.1);
        deferred1.reject(new Error());

        expect(executed).toBeFalsy();
    });

    it("should add two deferreds and one should reject in mid-flow in the right order and should not complete", function () {
        var executed = false;

        var deferred0 = Deferred();
        var deferred1 = Deferred();

        var join = Join();
        join = join.add(deferred0);

        deferred0.resolve(1.1);

        join.add(deferred1).then(function (tuple) {
            fail();
            executed = true;
        });

        deferred1.reject(new Error());

        expect(executed).toBeFalsy();
    });

    it("should add two deferreds and one should reject in mid-flow in the wrong order and should not complete", function () {
        var executed = false;

        var deferred0 = Deferred();
        var deferred1 = Deferred();

        var join = Join();
        join = join.add(deferred0);

        deferred1.reject(new Error());

        join.add(deferred1).then(function (tuple) {
            fail();
            executed = true;
        });

        deferred0.resolve(1.1);

        expect(executed).toBeFalsy();
    });

    it("should add two deferreds and fail one, calling the done callback", function () {
        var executed = false;

        var deferred0 = Deferred();
        var deferred1 = Deferred();

        var join = Join();
        join.add(deferred0).add(deferred1).then(function(tuple){
            fail();
        }).done(function (tuple) {
            executed = true;
        });

        deferred0.resolve(1.1);
        deferred1.reject(new Error());

        expect(executed).toBeTruthy();
    });

    it("should add two deferreds and fail one making sure that the error is the same one as passed", function () {
        var value0 = 1.1,
            value1 = new Error("fail"),
            executed = false;

        var deferred0 = Deferred();
        var deferred1 = Deferred();

        var join = Join();
        join.add(deferred0).add(deferred1).then(function(tuple){
            fail();
        }).done(function (tuple) {
                executed = tuple._1.get === value0 && tuple._2.get === value1;
            });

        deferred0.resolve(value0);
        deferred1.reject(value1);

        expect(executed).toBeTruthy();
    });

    it("should calling get on empty join should return none", function () {
        var join = Join();
        expect(join.get.isEmpty).toBeTruthy();
    });

    it("should calling get on empty join should return none", function () {
        var deferred0 = Deferred();
        var deferred1 = Deferred();

        var join = Join();
        join = join.add(deferred0).add(deferred1);

        expect(join.get.isDefined).toBeTruthy();
    });

    it("should calling get on empty join should return none", function () {
        var value0 = 1.1,
            value1 = 2.2;

        var deferred0 = Deferred();
        var deferred1 = Deferred();

        var join = Join();
        join = join.add(deferred0).add(deferred1);

        deferred0.resolve(value0);
        deferred1.resolve(value1);

        expect(join.get.get._1.get).toEqual(value0);
    });
});