beforeEach(function(){
    this.addMatchers({
        toBeType: function(expected){

            var actualTypeOf = typeof this.actual;
            var expectedTypeOf = typeof expected;
            if(actualTypeOf === "function" && expected instanceof this.actual) {
                return true;
            } else if(expectedTypeOf === "object" && expected.isPrototypeOf(this.actual)) {
                return true;
            }

            return false;
        }
    });
});