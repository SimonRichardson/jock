describe("Controller", function() {
    var controller,
        TestCommand0,
        TestCommand1;

    beforeEach(function(){
        controller = new jock.controller.Controller();

        TestCommand0 = jock.controller.Command.create({});
        TestCommand1 = jock.controller.Command.create({});
    });

    it("should have no commands registered", function(){
        expect(controller.size()).toBe(0);
    });

    it("should add and have the size of 1", function(){
        controller.add(TestCommand0, 1);

        expect(controller.size()).toBe(1);
    });

    it("should adding two commands that have the same mask should have the size of 1", function(){
        controller.add(TestCommand0, 1);
        controller.add(TestCommand0, 1);

        expect(controller.size()).toBe(1);
    });

    it("should adding two different commands that have the same mask should have the size of 2", function(){
        controller.add(TestCommand0, 1);
        controller.add(TestCommand1, 1);

        expect(controller.size()).toBe(2);
    });

    it("should add command then remove them should have the size of 1", function(){
        controller.add(TestCommand0, 1);
        controller.remove(TestCommand1, 1);

        expect(controller.size()).toBe(1);
    });

    it("should add command with different mask then remove them should have the size of 1", function(){
        controller.add(TestCommand0, 1);
        controller.add(TestCommand0, 2);
        controller.remove(TestCommand0, 1);

        expect(controller.size()).toBe(1);
    });

    it("should add command with different mask then remove with all mask them should have the size of 0", function(){
        controller.add(TestCommand0, 1);
        controller.add(TestCommand0, 2);
        controller.remove(TestCommand0, 1 | 2);

        expect(controller.size()).toBe(0);
    });

    it("should add command with different mask then remove with a different command should have the size of 1", function(){
        controller.add(TestCommand0, 1);
        controller.add(TestCommand0, 2);
        controller.remove(TestCommand1, 1 | 2);

        expect(controller.size()).toBe(1);
    });

    it("should throw an error when command is not an instance of Command", function(){
        expect(function(){
            controller.add(function(){
            }, 1);
        }).toThrow("Command should be an instance of jock.controller.Command");
    });
});