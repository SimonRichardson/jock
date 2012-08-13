describe("Aspect", function() {

    var Aspect = jock.aop.Aspect;

    it("should not allow source as null", function(){
        expect(function(){
            new Aspect(null);
        }).toThrow(new jock.errors.ArgumentError("Source can not be null/undefined"));
    })
});