jock.bundle("jock.future", {
    Join:(function () {
        "use strict";

        var CallbackTypes = jock.enumeration({
            Then:[],
            But:[]
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
            return function (future) {
                // See if the attempt is successful so we don't have to implement the callback.
                var attempt = future.attempt();
                if (attempt.isLeft()) {
                    values[index] = future.get();
                    checkResult.call(scope, callback, values, total);
                } else {
                    // It's not finished yet, let's wait.
                    future.then(function (value) {
                        values[index] = value;
                        checkResult.call(scope, callback, values, total);
                    });

                    // If the type is a But then assign a but to it
                    jock.utils.match(type, {
                        But:function () {
                            future.but(function (error) {
                                values[index] = jock.option.some(error);
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
                some:function (future) {
                    var total = 0,
                        index = 0,
                        values = [];

                    // How many futures do we have?
                    var tail = scope._tail;
                    while (tail.isDefined()) {
                        total++;
                        tail = tail.get()._tail;
                    }

                    someClosure(type, scope, callback, values, index++, total)(future);

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

        var Impl = function Join(head, tail) {
            if (typeof head !== "undefined") {
                head = jock.utils.verifiedType(head, jock.future.Future);
            }

            this._head = jock.option.toOption(head);
            this._tail = jock.option.toOption(tail);
        };

        var Methods = {
            attempt:function () {
                var callback = function (result) {
                    return function(){
                        return result;
                    }
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

                    if(!result) {
                        break;
                    }

                    tail = join._tail;
                }

                return jock.either.toEither(result, this.get());
            },
            get:function () {
                var values = [];
                var someCallback = function (future) {
                    values.push(future.get());
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

                if (values.length == 0) {
                    return jock.option.none();
                } else {
                    var tuple = jock.tuple.toTuple.apply(this, values.reverse());
                    return jock.option.some(tuple);
                }
            },
            add:function (value) {
                return new Impl(value, this);
            },
            then:function (callback) {
                addCallback(CallbackTypes.Then(), this, callback);
                return this;
            },
            but:function (callback) {
                addCallback(CallbackTypes.But(), this, callback);
                return this;
            }
        };

        return jock.extend(Impl, Methods);
    })()
});