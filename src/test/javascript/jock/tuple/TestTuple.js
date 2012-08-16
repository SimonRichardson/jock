describe("Tuple", function() {

    var Tuple = jock.tuple.Tuple;

    it("should calling productPrefix return 'Tuple'", function(){
        var t = new Tuple();
        expect(t.productPrefix()).toEqual("Tuple");
    });

    it("should calling toString throw error", function(){
        var t = new Tuple();
        expect(function(){
            t.toString();
        }).toThrow(new jock.errors.AbstractMethodError());
    });

    it("should calling productArity throw error", function(){
        var t = new Tuple();
        expect(function(){
            t.productArity();
        }).toThrow(new jock.errors.AbstractMethodError());
    });

    it("should calling productElement throw error", function(){
        var t = new Tuple();
        expect(function(){
            t.productElement();
        }).toThrow(new jock.errors.AbstractMethodError());
    });
});