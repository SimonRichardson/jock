describe("Template", function () {

    var template = jock.template.template;

    it("should render context variables", function () {
        var partial = "My name is <strong>::name::</strong> and I'm <em>::age::</em> years old.";
        var result = "My name is <strong>John</strong> and I'm <em>33</em> years old.";

        expect(template(partial, {name:"John", age:33})).toEqual(result);
    });

    it("should render the foreach over the context users", function () {
        var partial = "The habitants of <em>::name::</em> are :\n" +
            "<ul>\n" +
            "::foreach users::" +
            "   <li>\n" +
            "       ::name::\n" +
            "       ::if (age > 18)::Grown-up::elseif (age <= 2)::Baby::else::Young::end::\n" +
            "   </li>\n" +
            "::end::" +
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
        };

        var town = new Town("London");
        town.addUser(new User("Tim", 2));
        town.addUser(new User("John", 18));
        town.addUser(new User("Sam", 19));

        var result = "The habitants of <em>London</em> are :\n" +
            "<ul>\n" +
            "   <li>\n" +
            "       Tim\n" +
            "       Baby\n" +
            "   </li>\n" +
            "   <li>\n" +
            "       John\n" +
            "       Young\n" +
            "   </li>\n" +
            "   <li>\n" +
            "       Sam\n" +
            "       Grown-up\n" +
            "   </li>\n" +
            "</ul>";

        expect(template(partial, town)).toEqual(result);
    });

    it("should render sub-templates", function () {
        var t0 = new jock.template.Template("My sub template is ::sub::");
        var t1 = new jock.template.Template("::foreach items:: (::i::)::end::");

        var str = t1.execute({items:[
            {i:0},
            {i:33},
            {i:-5}
        ]});

        var result = "My sub template is  (0) (33) (-5)";
        expect(t0.execute({sub:str})).toEqual(result);
    });

    it("should render macros", function () {

        var macro = {
            fun:function (resolve, title, p) {
                return "[" + title + "=" + (p * resolve("mult")) + "]";
            }
        };

        var partial = "Call macro : ::foreach items:: $$fun(index:\"::param::\", ::param::)::end::";
        var result = "Call macro :  [index:\"1\"=2] [index:\"2\"=4] [index:\"3\"=6] [index:\"4\"=8]";

        expect(template(partial, {mult:2, items:[
            {param:1},
            {param:2},
            {param:3},
            {param:4}
        ]}, macro)).toEqual(result);
    });

    it("should render option", function () {

        var some = jock.option.some,
            none = jock.option.none,
            when = jock.option.when;

        var macro = {
            fun:function (resolve, opt) {
                return when(opt, {
                    some: function(v){
                        return "(" + v + ")";
                    },
                    none: function(){
                        return "";
                    }
                });
            }
        };

        var partial = "Call macro : ::foreach items::$$fun(::param::)::end::";
        var result = "Call macro : (1)(3)";

        expect(template(partial, {items:[
            {param:some(1)},
            {param:none()},
            {param:some(3)}
        ]}, macro)).toEqual(result);
    });
});