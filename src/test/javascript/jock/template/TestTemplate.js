describe("Template", function () {

    it("should convert this", function () {

        var str = "My name is <strong>::name::</strong> and I'm <em>::age::</em> years old.";
        var template = new jock.template.Template(str);
        console.log(template({name:"John", age:33}));
    });
});