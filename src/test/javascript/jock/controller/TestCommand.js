describe("Command", function() {
    var extend = jock.controller.Command.extend;

    it("should create a new instance of command", function(){
        expect(extend(function(){})).not.toBeNull();
    });

    it("should throw an error if no function is passed", function(){
        expect(function(){
            extend();
        }).toThrow("Function can not be null");
    });

    it("should throw an error if invalid argument is passed", function(){
        expect(function(){
            extend({});
        }).toThrow("Argument must be a function");
    });

    it("should pass a class with the prototype of the type Command", function(){
        expect(extend(function(){}).prototype instanceof jock.controller.Command).toBeTruthy();
    });

    it("should creating a new instance of class is the type Command", function(){
        expect(new (extend(function(){}))() instanceof jock.controller.Command).toBeTruthy();
    });

    it("should not have undefined execute method when created without passed init", function(){
        var c = new (extend(function(){}))();
        expect(c.execute).not.toBeUndefined();
    });

    it("should have valid execute method when created with passed init", function(){
        function CommandMock(){
        };
        CommandMock.prototype = {
            execute: function(){
            }
        };
        var c = new (extend(CommandMock))();
        expect(c.execute).not.toBeUndefined();
    });

    it("should call execute method when initialised", function(){
        var called = false;

        function CommandMock(){};
        CommandMock.prototype = {
            execute: function(){
                called = true;
            }
        };

        var c = new (extend(CommandMock))();
        c.execute();

        expect(called).toBeTruthy();
    });
});