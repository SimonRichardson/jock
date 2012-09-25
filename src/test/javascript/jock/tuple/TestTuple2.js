describe("Tuple2", function() {

    var Tuple = jock.tuple.Tuple,
        Product = jock.product.Product,
        tuple = jock.tuple.tuple2,
        toTuple = jock.tuple.toTuple,
        eq = jock.utils.eq,
        isType = jock.utils.isType;

    it("should be a valid Tuple", function(){
        expect(isType(tuple(), Tuple) === true).toBeTruthy();
    });

    it("should be a valid Product", function(){
        expect(isType(tuple(), Product) === true).toBeTruthy();
    });

    it("should calling productPrefix return 'Tuple2'", function(){
        expect(tuple().productPrefix).toEqual("Tuple2");
    });

    it("should calling toString throw error", function(){
        expect(tuple(1, 2).toString()).toEqual("Tuple2(1, 2)");
    });

    it("should calling productArity return 3", function(){
        expect(tuple(1, 2).productArity).toEqual(2);
    });

    it("should calling productElement with invalid index throw error", function(){
        expect(function(){
            tuple().productElement(99);
        }).toThrow(new jock.errors.RangeError());
    });

    it("should calling productElement at 0 return value", function(){
        expect(tuple(1, 2).productElement(0)).toEqual(1);
    });

    it("should calling productElement at 1 return value", function(){
        expect(tuple(1, 2).productElement(1)).toEqual(2);
    });

    it("should calling _1 return 1", function(){
        expect(tuple(1, 2)._1).toEqual(1);
    });

    it("should calling _2 return 2", function(){
        expect(tuple(1, 2)._2).toEqual(2);
    });

    it("should equal two tuple instances", function(){
        expect(eq(tuple(1, 2), tuple(1, 2))).toBeTruthy();
    });

    it("should not equal two tuple instances", function(){
        expect(eq(tuple(1, 2), tuple(2, 2))).toBeFalsy();
    });

    it("should equal two tuple instances via toTuple", function(){
        expect(eq(tuple(1, 2), toTuple(1, 2))).toBeTruthy();
    });
});