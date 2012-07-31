describe("Jock", function() {
    it("should have a valid version id", function(){
        var j = new jock.Jock();
        expect(j.VERSION).toBe("0.0.1");
    });
});