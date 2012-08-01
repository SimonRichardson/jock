describe("jock", function() {
    var j;

    beforeEach(function(){
        j = new jock.Jock();
    });

    it("should have a valid version id", function(){
        expect(j.VERSION).toBe("0.0.1");
    });

    it("should have a valid commands accessor", function(){
        expect(j.commands).not.toBeNull();
    });
});