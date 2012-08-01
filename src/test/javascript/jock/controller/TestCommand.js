describe("Command", function() {
    var command;

    beforeEach(function(){
        command = new jock.controller.Command();
    });

    it("should have no commands registered", function(){
        expect(command.size()).toBe(0);
    });
});