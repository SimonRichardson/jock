describe("Right", function() {

    var right = jock.either.right;

    it("should not be left", function () {
        expect(left().isLeft).toBeFalsy();
    });

    it("should be right", function () {
        expect(none().isRight).toBeTruthy();
    });
});