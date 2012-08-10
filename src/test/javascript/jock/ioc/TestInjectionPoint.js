describe("InjectionPoint", function () {
    "use strict";

    var InjectionPoint = jock.ioc.InjectionPoint;

    describe("when giving a value", function(){

        it("should return the same value", function(){
            var value = {};
            var point = new InjectionPoint(value);
            expect(point.get() === value).toBeTruthy();
        });
    });
});