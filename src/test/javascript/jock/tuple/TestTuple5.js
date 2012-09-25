describe("Tuple5", function() {

    var Tuple = jock.tuple.Tuple,
        Product = jock.product.Product,
        tuple = jock.tuple.tuple5,
        toTuple = jock.tuple.toTuple,
        eq = jock.utils.eq,
        isType = jock.utils.isType;

    it("should be a valid Tuple", function(){
        expect(isType(tuple(), Tuple) === true).toBeTruthy();
    });

    it("should be a valid Product", function(){
        expect(isType(tuple(), Product) === true).toBeTruthy();
    });

    it("should calling productPrefix return 'Tuple5'", function(){
        expect(tuple().productPrefix).toEqual("Tuple5");
    });

    it("should calling toString throw error", function(){
        expect(tuple(1, 2, 3, 4, 5).toString()).toEqual("Tuple5(1, 2, 3, 4, 5)");
    });

    it("should calling productArity return 5", function(){
        expect(tuple(1, 2, 3, 4, 5).productArity).toEqual(5);
    });

    it("should calling productElement with invalid index throw error", function(){
        expect(function(){
            tuple().productElement(99);
        }).toThrow(new jock.errors.RangeError());
    });

    it("should calling productElement at 0 return value", function(){
        expect(tuple(1, 2, 3, 4, 5).productElement(0)).toEqual(1);
    });

    it("should calling productElement at 1 return value", function(){
        expect(tuple(1, 2, 3, 4, 5).productElement(1)).toEqual(2);
    });

    it("should calling productElement at 2 return value", function(){
        expect(tuple(1, 2, 3, 4, 5).productElement(2)).toEqual(3);
    });

    it("should calling productElement at 3 return value", function(){
        expect(tuple(1, 2, 3, 4, 5).productElement(3)).toEqual(4);
    });

    it("should calling productElement at 4 return value", function(){
        expect(tuple(1, 2, 3, 4, 5).productElement(4)).toEqual(5);
    });

    it("should calling _1 return 1", function(){
        expect(tuple(1, 2, 3, 4, 5)._1).toEqual(1);
    });

    it("should calling _2 return 2", function(){
        expect(tuple(1, 2, 3, 4, 5)._2).toEqual(2);
    });

    it("should calling _3 return 3", function(){
        expect(tuple(1, 2, 3, 4, 5)._3).toEqual(3);
    });

    it("should calling _4 return 4", function(){
        expect(tuple(1, 2, 3, 4, 5)._4).toEqual(4);
    });

    it("should calling _5 return 5", function(){
        expect(tuple(1, 2, 3, 4, 5)._5).toEqual(5);
    });

    it("should equal two tuple instances", function(){
        expect(eq(tuple(1, 2, 3, 4, 5), tuple(1, 2, 3, 4, 5))).toBeTruthy();
    });

    it("should not equal two tuple instances", function(){
        expect(eq(tuple(1, 2, 3, 4, 5), tuple(2, 2, 3, 4, 5))).toBeFalsy();
    });

    it("should equal two tuple instances via toTuple", function(){
        expect(eq(tuple(1, 2, 3, 4, 5), toTuple(1, 2, 3, 4, 5))).toBeTruthy();
    });
});