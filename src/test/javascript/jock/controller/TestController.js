describe("Controller", function() {
    var controller,
        TestCommand0,
        TestCommand1;

    var extend = jock.controller.Command.extend;

    beforeEach(function(){
        controller = new jock.controller.Controller();

        TestCommand0 = extend(function(){});
        TestCommand1 = extend(function(){});
    });

    it("should have no commands registered", function(){
        expect(controller.size()).toBe(0);
    });

    it("should add with a command, have the size of 1", function(){
        controller.add(TestCommand0, 1);

        expect(controller.size()).toBe(1);
    });

    it("should add with a anonymous function, have the size of 1", function(){
        controller.add(function(){
        }, 1);

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

    it("should adding two different types that have the same mask should have the size of 2", function(){
        controller.add(TestCommand0, 1);
        controller.add(function(){}, 1);

        expect(controller.size()).toBe(2);
    });

    it("should add command then remove it with a different command them should have the size of 1", function(){
        controller.add(TestCommand0, 1);
        controller.remove(TestCommand1, 1);

        expect(controller.size()).toBe(1);
    });

    it("should add function then remove with a different function them should have the size of 1", function(){
        controller.add(function(){}, 1);
        controller.remove(function(){}, 1);

        expect(controller.size()).toBe(1);
    });

    it("should add function then remove with a Command them should have the size of 1", function(){
        controller.add(function(){}, 1);
        controller.remove(TestCommand0, 1);

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
});