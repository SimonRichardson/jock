jock.bundle("jock.future", {
    Deferred:(function () {
        "use strict";

        var States = jock.enumeration({
            Pending:[],
            Resolved:[jock.option.Option],
            Rejected:[Error],
            Aborted:[]
        });

        var Deferred = Object.create(jock.product.Product, {
            attempt:{
                get:function () {
                    return jock.utils.match(this.state, {
                        Resolved:function (value) {
                            return jock.either.right(value.get);
                        },
                        Rejected:function (error) {
                            return jock.either.left(error);
                        },
                        Default:function () {
                            return jock.either.left();
                        }
                    });
                },
                configurable:false
            },
            get:{
                get:function () {
                    return jock.utils.match(this.state, {
                        Resolved:function (value) {
                            return value;
                        },
                        Default:function () {
                            return jock.option.none();
                        }
                    });
                },
                configurable:false
            },
            state:{
                get:function () {
                    return this._state.value;
                },
                configurable:false
            },
            promise:{
                get:function () {
                    return jock.future.Promise(this);
                },
                configurable:false
            },
            productPrefix:{
                get:function () {
                    return "Deferred";
                },
                configurable:false
            },
            productArity:{
                get:function () {
                    return 1;
                },
                configurable:false
            }
        });

        Deferred.progress = function (value) {
            jock.utils.match(this.state, {
                Pending:function () {
                    var s = jock.option.toOption(value);

                    this._updates.forEach(function (callback) {
                        callback(s);
                    });
                }.bind(this),
                Default:function () {
                }
            });
        };
        Deferred.resolve = function (value) {
            jock.utils.match(this.state, {
                Pending:function () {
                    var s = jock.option.toOption(value);

                    this._state.value = States.Resolved(s);
                    this._completes.forEach(function (callback) {
                        callback(s);
                    });
                    this._done.forEach(function (callback) {
                        callback(s);
                    });
                }.bind(this),
                Default:function () {
                }
            });
        };
        Deferred.reject = function (error) {
            jock.utils.match(this.state, {
                Pending:function () {
                    error = jock.utils.verifiedType(error, Error);

                    this._state.value = States.Rejected(error);
                    this._fails.forEach(function (callback) {
                        callback(error);
                    });
                    this._done.forEach(function (callback) {
                        callback(error);
                    });
                }.bind(this),
                Default:function () {
                }
            });
        };
        Deferred.abort = function () {
            this._state.value = States.Aborted();

            this._done.length = 0;
            this._fails.length = 0;
            this._updates.length = 0;
            this._completes.length = 0;
        };
        Deferred.productElement = function (index) {
            if (index === 0) {
                return this.get;
            }
            throw new jock.errors.RangeError();
        };

        return function () {
            var instance = Object.create(Deferred);

            instance._state = {
                value: States.Pending()
            };

            // TODO (Simon) These should be signals.
            instance._done = [];
            instance._fails = [];
            instance._updates = [];
            instance._completes = [];

            return Object.freeze(instance);
        };
    })()
});