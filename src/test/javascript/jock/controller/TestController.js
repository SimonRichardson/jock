describe("Controller", function() {
    var controller;

    beforeEach(function(){
        controller = new jock.controller.Controller();
    });

    it("should have no commands registered", function(){
        expect(controller.size()).toBe(0);
    });

    it("should add command and size should be 1", function(){
        controller.add();
        expect(controller.size()).toBe(1);
    });
});