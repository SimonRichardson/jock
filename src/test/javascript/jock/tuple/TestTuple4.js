describe("Tuple4", function() {

    var Tuple = jock.tuple.Tuple,
        Product = jock.product.Product,
        tuple = jock.tuple.tuple4,
        toTuple = jock.tuple.toTuple,
        eq = jock.utils.eq,
        isType = jock.utils.isType;

    it("should be a valid Tuple", function(){
        expect(isType(tuple(), Tuple) === true).toBeTruthy();
    });

    it("should be a valid Product", function(){
        expect(isType(tuple(), Product) === true).toBeTruthy();
    });

    it("should calling productPrefix return 'Tuple4'", function(){
        expect(tuple().productPrefix).toEqual("Tuple4");
    });

    it("should calling toString throw error", function(){
        expect(tuple(1, 2, 3, 4).toString()).toEqual("Tuple4(1, 2, 3, 4)");
    });

    it("should calling productArity return 4", function(){
        expect(tuple(1, 2, 3, 4).productArity).toEqual(4);
    });

    it("should calling productElement with invalid index throw error", function(){
        expect(function(){
            tuple().productElement(99);
        }).toThrow(new jock.errors.RangeError());
    });

    it("should calling productElement at 0 return value", function(){
        expect(tuple(1, 2, 3, 4).productElement(0)).toEqual(1);
    });

    it("should calling productElement at 1 return value", function(){
        expect(tuple(1, 2, 3, 4).productElement(1)).toEqual(2);
    });

    it("should calling productElement at 2 return value", function(){
        expect(tuple(1, 2, 3, 4).productElement(2)).toEqual(3);
    });

    it("should calling productElement at 3 return value", function(){
        expect(tuple(1, 2, 3, 4).productElement(3)).toEqual(4);
    });

    it("should calling _1 return 1", function(){
        expect(tuple(1, 2, 3, 4)._1).toEqual(1);
    });

    it("should calling _2 return 2", function(){
        expect(tuple(1, 2, 3, 4)._2).toEqual(2);
    });

    it("should calling _3 return 3", function(){
        expect(tuple(1, 2, 3, 4)._3).toEqual(3);
    });

    it("should calling _4 return 4", function(){
        expect(tuple(1, 2, 3, 4)._4).toEqual(4);
    });

    it("should equal two tuple instances", function(){
        expect(eq(tuple(1, 2, 3, 4), tuple(1, 2, 3, 4))).toBeTruthy();
    });

    it("should not equal two tuple instances", function(){
        expect(eq(tuple(1, 2, 3, 4), tuple(2, 2, 3, 4))).toBeFalsy();
    });

    it("should equal two tuple instances via toTuple", function(){
        expect(eq(tuple(1, 2, 3, 4), toTuple(1, 2, 3, 4))).toBeTruthy();
    });
});