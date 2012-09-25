jock.bundle("jock.option", {
    some:(function () {
        "use strict";

        var Some = Object.create(jock.option.Option, {
            productPrefix:{
                get:function () {
                    return "some";
                },
                configurable:false
            },
            productArity:{
                get:function () {
                    return 1;
                },
                configurable:false
            },
            isEmpty:{
                get:function () {
                    return false;
                },
                configurable:false
            },
            isDefined:{
                get:function () {
                    return true;
                },
                configurable:false
            }
        });

        Some.getOrElse = function (f) {
            return this.get;
        };
        Some.orElse = function (f) {
            return this;
        };
        Some.equals = function (that) {
            if (jock.utils.isType(that, jock.option.Option)) {
                if (that.isDefined)
                    return jock.utils.eq(this.get, that.get);
            }
            return false;
        };
        Some.filter = function (f) {
            return f(this.get) === true ? this : jock.option.none();
        };
        Some.foreach = function (f) {
            f(this.get);
        };
        Some.flatMap = function (f) {
            return jock.utils.verifiedType(f(this.get), jock.option.Option);
        };
        Some.map = function (f) {
            return jock.option.some(f(this.get));
        };
        Some.productElement = function (index) {
            if (index === 0)
                return this.get;

            throw new jock.errors.RangeError();
        };

        return function (value) {
            var instance = Object.create(Some, {
                get:{
                    get:function () {
                        return value;
                    },
                    configurable:false
                }
            });
            return Object.freeze(instance);
        };
    })()
});