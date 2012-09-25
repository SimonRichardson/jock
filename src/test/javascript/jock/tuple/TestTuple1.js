describe("Tuple1", function() {

    var Tuple = jock.tuple.Tuple,
        Product = jock.product.Product,
        tuple = jock.tuple.tuple1,
        toTuple = jock.tuple.toTuple,
        eq = jock.utils.eq,
        isType = jock.utils.isType;

    it("should be a valid Tuple", function(){
        expect(isType(tuple(), Tuple) === true).toBeTruthy();
    });

    it("should be a valid Product", function(){
        expect(isType(tuple(), Product) === true).toBeTruthy();
    });

    it("should calling productPrefix return 'Tuple1'", function(){
        expect(tuple().productPrefix).toEqual("Tuple1");
    });

    it("should calling toString throw error", function(){
        expect(tuple(1).toString()).toEqual("Tuple1(1)");
    });

    it("should calling productArity return 1", function(){
        expect(tuple(1).productArity).toEqual(1);
    });

    it("should calling productElement with invalid index throw error", function(){
        expect(function(){
            tuple().productElement(99);
        }).toThrow(new jock.errors.RangeError());
    });

    it("should calling productElement at 0 return value", function(){
        expect(tuple(1).productElement(0)).toEqual(1);
    });

    it("should calling _1 return 1", function(){
        expect(tuple(1)._1).toEqual(1);
    });

    it("should equal two tuple instances", function(){
        expect(eq(tuple(1), tuple(1))).toBeTruthy();
    });

    it("should not equal two tuple instances", function(){
        expect(eq(tuple(1), tuple(2))).toBeFalsy();
    });

    it("should equal two tuple instances via toTuple", function(){
        expect(eq(tuple(1), toTuple(1))).toBeTruthy();
    });
});