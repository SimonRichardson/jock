describe("Tuple3", function() {

    var tuple = jock.tuple.tuple3;

    it("should calling productPrefix return 'Tuple3'", function(){
        expect(tuple().productPrefix()).toEqual("Tuple3");
    });

    it("should calling toString throw error", function(){
        expect(tuple(1, 2, 3).toString()).toEqual("Tuple3(1, 2, 3)");
    });

    it("should calling productArity return 3", function(){
        expect(tuple(1, 2, 3).productArity()).toEqual(3);
    });

    it("should calling productElement with invalid index throw error", function(){
        expect(function(){
            tuple().productElement(99);
        }).toThrow(new jock.errors.RangeError());
    });

    it("should calling productElement at 0 return value", function(){
        expect(tuple(1, 2, 3).productElement(0)).toEqual(1);
    });

    it("should calling productElement at 1 return value", function(){
        expect(tuple(1, 2, 3).productElement(1)).toEqual(2);
    });

    it("should calling productElement at 2 return value", function(){
        expect(tuple(1, 2, 3).productElement(2)).toEqual(3);
    });

    it("should calling _1 return 1", function(){
        expect(tuple(1, 2, 3)._1).toEqual(1);
    });

    it("should calling _2 return 2", function(){
        expect(tuple(1, 2, 3)._2).toEqual(2);
    });

    it("should calling _3 return 3", function(){
        expect(tuple(1, 2, 3)._3).toEqual(3);
    });
});