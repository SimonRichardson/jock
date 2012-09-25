jock.bundle("jock.option", {
    none:(function () {
        "use strict";

        var None = Object.create(jock.option.Option, {
            get:{
                get:function () {
                    throw new jock.errors.NoSuchElementError();
                },
                configurable:false
            },
            productPrefix:{
                get:function () {
                    return "none";
                },
                configurable:false
            },
            productArity:{
                get:function () {
                    return 0;
                },
                configurable:false
            },
            isEmpty:{
                get:function () {
                    return true;
                },
                configurable:false
            },
            isDefined:{
                get:function () {
                    return false;
                },
                configurable:false
            }
        });

        None.getOrElse = function (f) {
            return f();
        };
        None.orElse = function (f) {
            return f();
        };
        None.equals = function (that) {
            if (jock.utils.isType(that, jock.option.Option))
                return !that.isDefined;
            return false;
        };
        None.filter = function (f) {
            return this;
        };
        None.foreach = function (f) {
        };
        None.flatMap = function (f) {
            return this;
        };
        None.map = function (f) {
            return this;
        };
        None.productElement = function (index) {
            throw new jock.errors.RangeError();
        };

        var instance = Object.freeze(Object.create(None));

        return function () {
            if (arguments.length > 0)
                throw new jock.errors.ArgumentError('Unexpected arguments');

            return instance;
        };
    })()
});