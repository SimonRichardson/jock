jock.bundle("jock.future", {
    Future:(function () {
        "use strict";

        var State = jock.enumeration({
            Pending:[],
            Successful:[],
            Unsuccessful:[]
        })

        var Impl = function () {
            this._state = State.Pending();
        };

        var Methods = {
            attempt:function () {
                return jock.utils.match(this._state, {
                    Successful:function () {
                        return jock.either.left();
                    },
                    Default:function () {
                        return jock.either.right();
                    }
                });
            },
            get:function () {
                return jock.utils.match(this._state, {
                    Successful:function () {
                        return jock.option.some();
                    },
                    Default:function () {
                        return jock.option.none();
                    }
                })
            },
            isSuccessful:function () {
                return jock.utils.match(this._state, {
                    Successful:function () {
                        return true;
                    },
                    Default:function () {
                        return false;
                    }
                })
            }
        };

        return jock.extend(Impl, Methods);
    })()
});