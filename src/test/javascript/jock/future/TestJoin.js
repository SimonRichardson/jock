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

    it("should add a task and return a new join", function(){
        var join = new Join();
        expect(join.add(new Future())).not.toEqual(join);
    });

    it("should add one future and wait for the futures to be done", function(){
        var value = 1.1,
            executed = false;

        var future = new Future();

        var join = new Join();
        join = join.add(future).then(function(result){
            executed = result._1().get() === value;
        });
        future.resolve(value);

        expect(executed).toBeTruthy();
    });

    it("should add two futures and wait for the futures to be done", function(){
        var value0 = 1.1,
            value1 = 2.2,
            executed = false;

        var future0 = new Future();
        var future1 = new Future();

        var join = new Join();
        join.add(future0).add(future1).then(function(result){
            console.log(result);
            executed = result._1().get() === value0 && result._2().get() === value1;
        });

        future0.resolve(value0);
        future1.resolve(value1);

        expect(executed).toBeTruthy();
    });

    it("should add two futures and resolve in a different order and wait for the futures to be done", function(){
        var value0 = 1.1,
            value1 = 2.2,
            executed = false;

        var future0 = new Future();
        var future1 = new Future();

        var join = new Join();
        join.add(future0).add(future1).then(function(result){
            executed = result._1().get() === value0 && result._2().get() === value1;
        });

        future1.resolve(value1);
        future0.resolve(value0);

        expect(executed).toBeTruthy();
    });
});