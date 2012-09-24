describe("Tuple5", function() {

    var toTuple = jock.tuple.toTuple;

    it("should calling productPrefix return 'Tuple5'", function(){
        expect(toTuple(1, 2, 3, 4, 5, 6, 7).productPrefix()).toEqual("Tuple7");
    });

    it("should calling toString throw error", function(){
        expect(toTuple(1, 2, 3, 4, 5, 6, 7).toString()).toEqual("Tuple7(1, 2, 3, 4, 5, 6, 7)");
    });

    it("should calling productArity return 7", function(){
        expect(toTuple(1, 2, 3, 4, 5, 6, 7).productArity()).toEqual(7);
    });

    it("should calling productElement with invalid index throw error", function(){
        expect(function(){
            toTuple(1, 2, 3, 4, 5, 6, 7).productElement(99);
        }).toThrow(new jock.errors.RangeError());
    });

    it("should calling productElement at 0 return value", function(){
        expect(toTuple(1, 2, 3, 4, 5, 6, 7).productElement(0)).toEqual(1);
    });

    it("should calling productElement at 1 return value", function(){
        expect(toTuple(1, 2, 3, 4, 5, 6, 7).productElement(1)).toEqual(2);
    });

    it("should calling productElement at 2 return value", function(){
        expect(toTuple(1, 2, 3, 4, 5, 6, 7).productElement(2)).toEqual(3);
    });

    it("should calling productElement at 3 return value", function(){
        expect(toTuple(1, 2, 3, 4, 5, 6, 7).productElement(3)).toEqual(4);
    });

    it("should calling productElement at 4 return value", function(){
        expect(toTuple(1, 2, 3, 4, 5, 6, 7).productElement(4)).toEqual(5);
    });

    it("should calling productElement at 5 return value", function(){
        expect(toTuple(1, 2, 3, 4, 5, 6, 7).productElement(5)).toEqual(6);
    });

    it("should calling productElement at 6 return value", function(){
        expect(toTuple(1, 2, 3, 4, 5, 6, 7).productElement(6)).toEqual(7);
    });

    it("should calling _1 return 1", function(){
        expect(toTuple(1, 2, 3, 4, 5, 6, 7)._1).toEqual(1);
    });

    it("should calling _2 return 2", function(){
        expect(toTuple(1, 2, 3, 4, 5, 6, 7)._2).toEqual(2);
    });

    it("should calling _3 return 3", function(){
        expect(toTuple(1, 2, 3, 4, 5, 6, 7)._3).toEqual(3);
    });

    it("should calling _4 return 4", function(){
        expect(toTuple(1, 2, 3, 4, 5, 6, 7)._4).toEqual(4);
    });

    it("should calling _5 return 5", function(){
        expect(toTuple(1, 2, 3, 4, 5, 6, 7)._5).toEqual(5);
    });

    it("should calling _6 return 6", function(){
        expect(toTuple(1, 2, 3, 4, 5, 6, 7)._6).toEqual(6);
    });

    it("should calling _7 return 7", function(){
        expect(toTuple(1, 2, 3, 4, 5, 6, 7)._7).toEqual(7);
    });
});