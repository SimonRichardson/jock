jock.option = jock.option || {};
jock.option.None = (function () {
    "use strict";

    var Impl = function () {
        jock.option.Option.apply(this, arguments);
    };
    Impl.prototype = new jock.option.Option();
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "None";

    var Methods = {
        getOrElse:function (f) {
            return f();
        },
        orElse:function (f) {
            return f();
        },
        equals:function (that) {
            if (that instanceof jock.option.Option)
                return !that.isDefined;
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
            return "None";
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

    jock.utils.extends(Impl, Methods);

    var Instance = new Impl();

    return function(){
        if(arguments.length > 0)
            throw new jock.errors.ArgumentError('Unexpected arguments');

        return Instance;
    };
}).call(this);