describe("jock", function () {
    it("should have a valid version id", function () {
        expect(jock.VERSION).toBe("0.0.2");
    });

    describe("extend", function () {

        it("should return a valid object", function () {

            var f = jock.extend(function () {
            }, {
                init:function () {
                }
            });

            expect(f).not.toBeNull();
        });

        it("should return a typeof function", function () {

            var f = jock.extend(function () {
            }, {
                init:function () {
                }
            });

            expect(typeof f === "function").toBeTruthy();
        });

        it("should have a valid init method", function () {

            var f = jock.extend(function () {
            }, {
                init:function () {
                }
            });

            expect(new f().init).not.toBeNull();
        });

        it("should have a valid typeof init method", function () {

            var f = jock.extend(function () {
            }, {
                init:function () {
                }
            });

            expect(typeof new f().init === "function").toBeTruthy();
        });

        it("should have a valid toString method", function () {

            var f = jock.extend(function () {
            }, {
                init:function () {
                },
                toString:function () {
                    return "";
                }
            });

            expect(new f().toString).not.toBeNull();
        });

        it("should have a valid typeof toString method", function () {

            var f = jock.extend(function () {
            }, {
                init:function () {
                },
                toString:function () {
                    return "";
                }
            });

            expect(typeof new f().toString === "function").toBeTruthy();
        });
    });

    describe("mixin", function () {

        var origin;

        beforeEach(function () {
            origin = jock.extend(function () {
            }, {
                foo:function () {
                    return "foo";
                }
            });
        });

        it("should create a valid object", function () {
            var f1 = jock.mixin(function () {
            }, origin);

            expect(f1).not.toBeNull();
        });

        it("should create a typeof function", function () {
            var f1 = jock.mixin(function () {
            }, origin);

            expect(typeof f1 === "function").toBeTruthy();
        });

        it("should create a valid object and mixin method should not be null", function () {
            var f1 = jock.mixin(function () {
            }, origin);

            expect(new f1().foo).not.toBeNull();
        });

        it("should create a valid object and mixin method should return 'foo'", function () {
            var f1 = jock.mixin(function () {
            }, origin);

            expect(new f1().foo() === "foo").toBeTruthy();
        });

        it("should create a valid object and overridden method should return 'bar'", function () {
            var f1 = jock.mixin(function () {
            }, origin);
            f1 = jock.extend(f1, {
                foo:function () {
                    return "bar";
                }
            })

            expect(new f1().foo() === "bar").toBeTruthy();
        });

        it("should create a valid object and mixin and have an is property", function () {
            var f1 = jock.mixin(function () {
            }, origin);

            expect(new f1().is).not.toBeNull();
        });

        it("should create a valid object and mixin and have an is property which is an instanceof Array", function () {
            var f1 = jock.mixin(function () {
            }, origin);

            expect(new f1().is instanceof Array).toBeTruthy();
        });

        it("should create a valid object and mixin and has a reference to origin in is", function () {
            var f1 = jock.mixin(function () {
            }, origin);

            expect(new f1().is.indexOf(origin) >= 0).toBeTruthy();
        });

        it("should using jock.utils.isType contain origin", function () {
            var f1 = jock.mixin(function () {
            }, origin);

            expect(jock.utils.isType(new f1(), origin)).toBeTruthy();
        });

        it("should using jock.utils.verifiedType contain origin", function () {
            var f1 = jock.mixin(function () {
            }, origin);

            var instance = new f1();
            expect(jock.utils.verifiedType(instance, origin) === instance).toBeTruthy();
        });
    });

    describe("bundle", function () {

        afterEach(function () {
            jock.scope.xxx = null;
            delete jock.scope.xxx;
        });

        it("should have a valid scope", function () {
            expect(jock.scope).not.toBeNull();
        });

        it("should create a bundle that is not null", function () {
            var p = jock.bundle("xxx.xx.x", {
                yy:true
            });

            expect(p).not.toBeNull();
        });

        it("should create a object bundle and have a valid yy property", function () {
            var p = jock.bundle("xxx.xx.x", {
                yy:true
            });

            expect(p.yy).not.toBeFalsy();
        });

        it("should create a object bundle that is valid", function () {
            var p = jock.bundle("xxx.xx.x", {
                yy:true
            });

            expect(jock.scope.xxx).not.toBeNull();
        });

        it("should create a full object bundle that is valid", function () {
            var p = jock.bundle("xxx.xx.x", {
                yy:true
            });

            expect(jock.scope.xxx.xx.x).not.toBeNull();
        });

        it("should create a full object bundle and have a valid yy property", function () {
            var p = jock.bundle("xxx.xx.x", {
                yy:true
            });

            expect(jock.scope.xxx.xx.x.yy).not.toBeFalsy();
        });
    });

    describe("enumeration", function () {

        it("should create a valid enum type", function(){
            var Alpha = jock.enumeration({
                A:[],
                B:[]
            });

            expect(Alpha).not.toBeNull();
        });

        it("should create a valid enum", function(){
            var Alpha = jock.enumeration({
                A:[],
                B:[]
            });

            expect(Alpha.A).not.toBeNull();
        });

        it("should create a valid enum instance", function(){
            var Alpha = jock.enumeration({
                A:[],
                B:[]
            });

            expect(Alpha.A()).not.toBeNull();
        });

        it("should create a valid enum instance with a Number", function(){
            var Alpha = jock.enumeration({
                A:[Number],
                B:[]
            });

            expect(Alpha.A(1.1)).not.toBeNull();
        });

        it("should throw ArgumentError if passing String instead of Number", function(){
            var Alpha = jock.enumeration({
                A:[Number],
                B:[]
            });

            expect(function(){
                Alpha.A("data")
            }).toBeThrown(new jock.errors.ArgumentError());
        });

        it("should match the enum", function(){
            var Alpha = jock.enumeration({
                A:[Number],
                B:[]
            });

            expect(jock.utils.match(Alpha.A(1.1), {
                A: function(){
                    return true;
                }
            })).toBeTruthy();
        });

        it("should match the enum using the Default", function(){
            var Alpha = jock.enumeration({
                A:[Number],
                B:[]
            });

            expect(jock.utils.match(Alpha.A(1.1), {
                Default: function(){
                    return true;
                }
            })).toBeTruthy();
        });

        it("should match the enum and return value", function(){
            var Alpha = jock.enumeration({
                A:[Number],
                B:[]
            });

            var value = 1.3;
            expect(jock.utils.match(Alpha.A(value), {
                A: function(v){
                    return value === v;
                }
            })).toBeTruthy();
        });

        it("should match the enum and return value using Default", function(){
            var Alpha = jock.enumeration({
                A:[Number],
                B:[]
            });

            var value = 1.3;
            expect(jock.utils.match(Alpha.A(value), {
                Default: function(v){
                    return value === v;
                }
            })).toBeTruthy();
        });
    });
});