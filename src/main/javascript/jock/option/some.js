jock.package("jock.option", {
    some:(function () {
        "use strict";

        var Impl = function (value) {
            jock.option.Option.call(this);

            this._value = value;
        };
        Impl.prototype = new jock.option.Option();
        Impl.prototype.constructor = Impl;

        var Methods = {
            getOrElse:function (f) {
                return this.get();
            },
            orElse:function (f) {
                return this;
            },
            equals:function (that) {
                if (that instanceof jock.option.Option) {
                    if (that.isDefined())
                        return jock.utils.eq(this.get(), that.get());
                }
                return false;
            },
            filter:function (f) {
                return f(this.get()) === true ? this : jock.option.none();
            },
            foreach:function (f) {
                f(this.get());
            },
            flatMap:function (f) {
                return jock.utils.verifiedType(f(this.get()), jock.option.Option);
            },
            map:function (f) {
                return jock.option.some(f(this.get()));
            },
            get:function () {
                return this._value;
            },
            productPrefix:function () {
                return "some";
            },
            productArity:function () {
                return 1;
            },
            productElement:function (index) {
                if (index === 0)
                    return this.get();

                throw new jock.errors.RangeError();
            },
            isEmpty:function () {
                return false;
            },
            isDefined:function () {
                return true;
            }
        };

        Impl = jock.extend(Impl, Methods);

        return function (value) {
            return new Impl(value);
        };
    })()
});