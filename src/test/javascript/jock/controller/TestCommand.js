describe("Command", function() {
    var create = jock.controller.Command.create;

    it("should create a new instance of command", function(){
        expect(create({})).not.toBeNull();
    });

    it("should throw an error if no methods are passed", function(){
        expect(function(){
            create();
        }).toThrow("Overridden methods can not be null");
    });

    it("should pass a class with the prototype of the type Command", function(){
        expect(create({}).prototype instanceof jock.controller.Command).toBeTruthy();
    });

    it("should creating a new instance of class is the type Command", function(){
        expect(new (create({}))() instanceof jock.controller.Command).toBeTruthy();
    });

    it("should have undefined init method when created without passed init", function(){
        var c = new (create({}))();
        expect(c.init).toBeUndefined();
    });

    it("should have undefined execute method when created without passed execute", function(){
        var c = new (create({}))();
        expect(c.execute).toBeUndefined();
    });

    it("should have valid init method when created with passed init", function(){
        var c = new (create({init: function(){

        }}))();
        expect(c.init).not.toBeUndefined();
    });

    it("should have valid execute method when created with passed execute", function(){
        var c = new (create({execute: function(){

        }}))();
        expect(c.execute).not.toBeUndefined();
    });
});