describe("Tuple", function() {

    it("should calling productPrefix return 'Tuple'", function(){
        var t = new jock.tuple.Tuple();
        expect(t.productPrefix()).toEqual("Tuple");
    });

    it("should calling toString throw error", function(){
        var t = new jock.tuple.Tuple();
        expect(function(){
            t.toString();
        }).toThrow(new jock.errors.AbstractMethodError());
    });

    it("should calling productArity throw error", function(){
        var t = new jock.tuple.Tuple();
        expect(function(){
            t.productArity();
        }).toThrow(new jock.errors.AbstractMethodError());
    });

    it("should calling productElement throw error", function(){
        var t = new jock.tuple.Tuple();
        expect(function(){
            t.productElement();
        }).toThrow(new jock.errors.AbstractMethodError());
    });
});