describe("Future", function() {

    var Future = jock.future.Future;

    it("should generate a valid future", function(){
        var future = new Future();
        expect(future).not.toBeNull();
    });

    it("should calling get on a new future should return Option", function(){
        var future = new Future();
        expect(future.get()).toBeType(jock.option.Option);
    });

    it("should calling get on a new future should return none", function(){
        var future = new Future();
        expect(future.get().isEmpty()).toBeTruthy();
    });

    it("should calling attempt on a new future should return Either", function(){
        var future = new Future();
        expect(future.attempt()).toBeType(jock.either.Either);
    });

    it("should calling attempt on a new future should return right", function(){
        var future = new Future();
        expect(future.attempt().isRight()).toBeTruthy();
    });

    it("should calling isSuccessful on a new future should return false", function(){
        var future = new Future();
        expect(future.isSuccessful()).toBeFalsy();
    });
});