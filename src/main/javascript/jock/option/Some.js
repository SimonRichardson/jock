jock.option = jock.option || {};
jock.option.Some = (function () {
    "use strict";

    var Impl = function (value) {
        jock.option.Option.call(this);

        this._value = value;
    };
    Impl.prototype = new jock.option.Option();
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "Some";

    var Methods = {
        getOrElse:function (f) {
            return this.get();
        },
        orElse:function (f) {
            return this;
        },
        equals:function (that) {
            if (that instanceof jock.option.Option) {
                if (that.isDefined)
                    return jock.utils.eq(this.get(), that.get());
            }
            return false;
        },
        filter:function (f) {
            return f(this.get()) === true ? this : jock.option.None();
        },
        foreach:function (f) {
            f(this.get());
        },
        flatMap:function (f) {
            return f(this.get());
        },
        map:function (f) {
            return jock.option.some(f(this.get()));
        },
        get:function () {
            return this._value;
        },
        productPrefix:function () {
            return "Some";
        },
        productArity:function () {
            return 1;
        },
        productElement:function (index) {
            if (index == 0) {
                return this.get();
            }
            throw new jock.error.RangeError();
        },
        isEmpty:function () {
            return false;
        },
        isDefined:function () {
            return true;
        }
    };

    jock.utils.extends(Impl, Methods);

    return function (value) {
        return new Impl(value);
    };
}).call(this);