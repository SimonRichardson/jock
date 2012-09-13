jock.bundle("jock.future", {
    Future:(function () {
        "use strict";

        var States = jock.enumeration({
            Pending:[],
            Resolved:[jock.option.Option],
            Rejected:[Error],
            Aborted:[]
        });

        var Impl = function () {
            this._state = States.Pending();
        };

        var Methods = {
            attempt:function () {
                return jock.utils.match(this._state, {
                    Resolved:function (value) {
                        return jock.either.left(value.get());
                    },
                    Default:function () {
                        return jock.either.right();
                    }
                });
            },
            get:function () {
                return jock.utils.match(this._state, {
                    Resolved:function (value) {
                        return value;
                    },
                    Default:function () {
                        return jock.option.none();
                    }
                });
            },
            resolve:function (value) {
                var scope = this;
                jock.utils.match(this._state, {
                    Pending:function () {
                        scope._state = States.Resolved(jock.option.some(value));

                        // Dispatch completes
                    },
                    Default:function () {

                    }
                });
            },
            reject:function (error) {
                var scope = this;
                jock.utils.match(this._state, {
                    Pending:function () {
                        error = jock.utils.verifiedType(error, Error);
                        scope._state = States.Rejected(error);

                        // Dispatch fail
                    },
                    Default:function () {
                    }
                })
            },
            abort:function () {
                this._state = States.Aborted();
            }
        };

        return jock.extend(Impl, Methods);
    })()
});