describe("Left", function() {

    var left = jock.either.left;

    it("should not be right", function () {
        expect(left().isRight).toBeFalsy();
    });

    it("should be left", function () {
        expect(left().isLeft).toBeTruthy();
    });
});