describe("Right", function() {

    var right = jock.either.right;

    it("should not be left", function () {
        expect(right().isLeft).toBeFalsy();
    });

    it("should be right", function () {
        expect(right().isRight).toBeTruthy();
    });
});