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

    it("should add a task and when future is done", function(){
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


});