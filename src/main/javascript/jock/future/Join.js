jock.bundle("jock.future", {
    Join:(function () {
        "use strict";

        var CallbackTypes = jock.enumeration({
            Then:[],
            But:[],
            Done:[]
        });

        var checkResult = function checkResult(callback, values, total) {
            // Make sure we've got all the valid options.
            var valid = true;
            for (var i = 0, len = values.length; i < len; i++) {
                valid = valid && !!values[i];
            }
            // Now do the final check and then do the callback.
            if (valid && values.length == total) {
                var args = jock.tuple.toTuple.apply(this, values.reverse());
                callback.apply(this, [args]);
            }
        };

        var someClosure = function someClosure(type, scope, callback, values, index, total) {
            return function (deferred) {
                // See if the attempt is successful so we don't have to implement the callback.
                var attempt = deferred.attempt();
                if (attempt.isRight()) {
                    values[index] = deferred.get();
                    checkResult.call(scope, callback, values, total);
                } else {
                    // It's not finished yet, let's wait.
                    var promise = deferred.promise();

                    // If the type is a But then assign a but to it
                    jock.utils.match(type, {
                        Then:function () {
                            promise.then(function (value) {
                                values[index] = jock.option.toOption(value);
                                checkResult.call(scope, callback, values, total);
                            });
                        },
                        But:function () {
                            promise.but(function (error) {
                                values[index] = jock.option.toOption(error);
                                checkResult.call(scope, callback, values, total);
                            });
                        },
                        Done:function () {
                            promise.done(function (error) {
                                values[index] = jock.option.toOption(error);
                                checkResult.call(scope, callback, values, total);
                            });
                        },
                        Default:jock.utils.identity
                    });
                }
            };
        };

        var addCallback = function addCallback(type, scope, callback) {
            jock.utils.when(scope._head, {
                some:function (deferred) {
                    var total = 0,
                        index = 0,
                        values = [];

                    // How many promises do we have?
                    var tail = scope._tail;
                    while (tail.isDefined()) {
                        total++;
                        tail = tail.get()._tail;
                    }

                    someClosure(type, scope, callback, values, index++, total)(deferred);

                    tail = scope._tail;
                    while (tail.isDefined()) {

                        var join = tail.get();
                        jock.utils.when(join._head, {
                            some:someClosure(type, scope, callback, values, index++, total),
                            none:jock.utils.identity
                        });

                        tail = join._tail;
                    }
                },
                none:jock.utils.identity
            });
        };

        var Join = Object.create(jock.product.Product, {
            attempt:{
                get:function () {
                    var callback = function (result) {
                        return function () {
                            return result;
                        };
                    };

                    var result = jock.utils.when(this._head, {
                        some:callback(true),
                        none:callback(false)
                    });

                    var tail = this._tail;
                    while (tail.isDefined()) {
                        var join = tail.get();

                        result = jock.utils.when(join._head, {
                            some:callback(true),
                            none:callback(false)
                        });

                        if (!result) {
                            break;
                        }

                        tail = join._tail;
                    }

                    return jock.either.toEither(result, this.get());
                }
            },
            get:{
                get:function () {
                    var values = [];
                    var someCallback = function (promise) {
                        values.push(promise.get());
                    };

                    jock.utils.when(this._head, {
                        some:someCallback,
                        none:jock.utils.identity
                    });

                    var tail = this._tail;
                    while (tail.isDefined()) {
                        var join = tail.get();

                        jock.utils.when(join._head, {
                            some:someCallback,
                            none:jock.utils.identity
                        });

                        tail = join._tail;
                    }

                    if (values.length === 0) {
                        return jock.option.none();
                    } else {
                        var tuple = jock.tuple.toTuple.apply(this, values.reverse());
                        return jock.option.some(tuple);
                    }
                }
            }
        });

        Join.add = function (value) {
            var instance = Object.create(Join);

            if (typeof head !== "undefined") {
                head = jock.utils.verifiedType(head, jock.future.Deferred);
            }

            instance._head = jock.option.toOption(head);
            instance._tail = jock.option.toOption(tail);

            return Object.freeze(instance);
        };
        Join.then = function (callback) {
            addCallback(CallbackTypes.Then(), this, callback);
            return this;
        };
        Join.but = function (callback) {
            addCallback(CallbackTypes.But(), this, callback);
            return this;
        };
        Join.done = function (callback) {
            addCallback(CallbackTypes.Done(), this, callback);
            return this;
        };

        Join.productElement = function (index) {
            if (index === 0) {
                return this.get;
            }
            throw new jock.errors.RangeError();
        };

        return function () {
            var instance = Object.create(Join);

            instance._head = jock.option.none();
            instance._tail = jock.option.none();

            return Object.freeze(instance);
        };
    })()
});