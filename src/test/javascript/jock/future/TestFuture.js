describe("Future", function() {

    var Future = jock.future.Future;

    it("should generate a valid future", function(){
        var future = new Future();
        expect(future).not.toBeNull();
    });

    it("should calling get on a future should return Option", function(){
        var future = new Future();
        expect(future.get()).toBeType(jock.option.Option);
    });
});