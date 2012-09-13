jock.bundle("jock.future", {
    Future:(function () {
        "use strict";

        var Impl = function () {
            this._completed = false;
            this._successful = false;
            this._value = null;
        };

        var Methods = {
            attempt:function () {
                if (this._completed && this._successful)
                    return jock.either.left();
                return jock.either.right();
            },
            get:function () {
                if(this._completed && this._successful)
                    return jock.option.some(this._value);
                return jock.option.none();
            }
        };

        return jock.extend(Impl, Methods);
    })()
});