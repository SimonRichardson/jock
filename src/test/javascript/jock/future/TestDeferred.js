describe("Promise", function () {

    var Deferred = jock.future.Deferred;

    it("should generate a valid deferred", function () {
        var deferred = new Deferred();
        expect(deferred).not.toBeNull();
    });

    it("should calling get on a new deferred should return Option", function () {
        var deferred = new Deferred();
        expect(deferred.get()).toBeType(jock.option.Option);
    });

    it("should calling get on a new deferred should return none", function () {
        var deferred = new Deferred();
        expect(deferred.get().isEmpty()).toBeTruthy();
    });

    it("should calling attempt on a new deferred should return Either", function () {
        var deferred = new Deferred();
        expect(deferred.attempt()).toBeType(jock.either.Either);
    });

    it("should calling attempt on a new deferred should return left", function () {
        var deferred = new Deferred();
        expect(deferred.attempt().isLeft()).toBeTruthy();
    });

    it("should calling resolve on a deferred calling get should return Option", function () {
        var deferred = new Deferred();
        deferred.resolve(1);
        expect(deferred.get()).toBeType(jock.option.Option);
    });

    it("should calling resolve on a deferred should call get and result should be defined", function () {
        var deferred = new Deferred();
        deferred.resolve(1);
        expect(deferred.get().isDefined()).toBeTruthy();
    });
});