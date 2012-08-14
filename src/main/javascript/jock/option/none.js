jock.option = jock.option || {};
jock.option.none = (function () {
    "use strict";

    var Impl = function () {
        jock.option.Option.call(this);
    };
    Impl.prototype = new jock.option.Option();
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "none";

    var Methods = {
        getOrElse:function (f) {
            return f();
        },
        orElse:function (f) {
            return f();
        },
        equals:function (that) {
            if (that instanceof jock.option.Option)
                return !that.isDefined();
            return false;
        },
        filter:function (f) {
            return this;
        },
        foreach:function (f) {
        },
        flatMap:function (f) {
            return this;
        },
        map:function (f) {
            return this;
        },
        get:function () {
            throw new jock.errors.NoSuchElementError();
        },
        productPrefix:function () {
            return "none";
        },
        productArity:function () {
            return 0;
        },
        productElement:function (index) {
            throw new jock.errors.RangeError();
        },
        isEmpty:function () {
            return true;
        },
        isDefined:function () {
            return false;
        }
    };

    jock.utils.extend(Impl, Methods);

    return function () {
        if (arguments.length > 0)
            throw new jock.errors.ArgumentError('Unexpected arguments');

        return new Impl();
    };
}).call(this);