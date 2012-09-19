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


});