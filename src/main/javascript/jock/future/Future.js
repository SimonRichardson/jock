jock.bundle("jock.future", {
    Future:(function () {
        "use strict";

        var States = jock.enumeration({
            Pending:[],
            Resolved:[jock.option.Option],
            Rejected:[Error],
            Aborted:[]
        });

        var Impl = function Future() {
            this._state = States.Pending();

            this._fails = [];
            this._completes = [];
        };

        var Methods = {
            attempt:function () {
                return jock.utils.match(this._state, {
                    Resolved:function (value) {
                        return jock.either.right(value.get());
                    },
                    Rejected:function (error) {
                        return jock.either.left(error);
                    },
                    Default:function () {
                        return jock.either.left();
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
                        var s = jock.option.some(value);
                        scope._state = States.Resolved(s);

                        var index = scope._completes.length;
                        while (--index > -1) {
                            var func = scope._completes[index];
                            func(s);
                        }
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

                        var index = scope._fails.length;
                        while (--index > -1) {
                            scope._fails[index](error);
                        }
                    },
                    Default:function () {
                    }
                });
            },
            abort:function () {
                this._state = States.Aborted();

                this._fails.length = 0;
                this._completes.length = 0;
            },
            then:function (func) {
                var scope = this;
                jock.utils.match(this._state, {
                    Pending:function () {
                        if (scope._completes.indexOf(func) < 0) {
                            scope._completes.push(func);
                        }
                    },
                    Resolved:function (value) {
                        func(value);
                    },
                    Default:function () {
                    }
                });
                return this;
            },
            but:function (func) {
                var scope = this;
                jock.utils.match(this._state, {
                    Pending:function () {
                        if (scope._fails.indexOf(func) < 0) {
                            scope._fails.push(func);
                        }
                    },
                    Rejected:function (value) {
                        func(value);
                    },
                    Default:function () {
                    }
                });
                return this;
            }
        };

        return jock.extend(Impl, Methods);
    })()
});