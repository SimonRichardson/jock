describe("Template", function () {

    xit("should convert this", function () {

        var partial = "My name is <strong>::name::</strong> and I'm <em>::age::</em> years old.";
        var template = new jock.template.Template(partial);

        console.log(template.execute({name:"John", age:33}));
    });

    it("should run this", function () {
        var partial = "The habitants of <em>::name::</em> are :\n" +
            "<ul>\n" +
            "::foreach users::\n" +
            "   <li>\n" +
            "       ::name::\n" +
            "       ::if (age > 18)::Grown-up::elseif (age <= 2)::Baby::else::Young::end::\n" +
            "   </li>\n" +
            "::end::\n" +
            "</ul>";

        var Town = function (name) {
            this.name = name;
            this.users = [];
        };
        Town.prototype = {
            addUser:function (user) {
                this.users.push(user);
            }
        };

        var User = function (name, age) {
            this.name = name;
            this.age = age;
        }

        var town = new Town("London");
        town.addUser(new User("Tim", 20));
        town.addUser(new User("John", 30));
        town.addUser(new User("Sam", 40));

        var template = new jock.template.Template(partial);

        console.log(template.execute(town));
    });
});