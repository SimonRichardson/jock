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


    describe("package", function () {

        afterEach(function () {
            jock.scope.xxx = null;
            delete jock.scope.xxx;
        });

        it("should have a valid scope", function () {
            expect(jock.scope).not.toBeNull();
        });

        it("should create a package that is not null", function () {
            var p = jock.package("xxx.xx.x", {
                yy:true
            });

            expect(p).not.toBeNull();
        });

        it("should create a object package and have a valid yy property", function () {
            var p = jock.package("xxx.xx.x", {
                yy:true
            });

            expect(p.yy).not.toBeFalsy();
        });

        it("should create a object package that is valid", function () {
            var p = jock.package("xxx.xx.x", {
                yy:true
            });

            expect(jock.scope.xxx).not.toBeNull();
        });

        it("should create a full object package that is valid", function () {
            var p = jock.package("xxx.xx.x", {
                yy:true
            });

            expect(jock.scope.xxx.xx.x).not.toBeNull();
        });

        it("should create a full object package and have a valid yy property", function () {
            var p = jock.package("xxx.xx.x", {
                yy:true
            });

            expect(jock.scope.xxx.xx.x.yy).not.toBeFalsy();
        });
    });
});