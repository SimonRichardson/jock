jock.bundle("jock.future", {
    Join:(function () {
        "use strict";

        var checkResult = function (func, values, total) {
            // Make sure we've got all the valid options.
            var valid = true;
            for(var i = 0, len = values.length; i<len; i++) {
                valid = valid && !!values[i];
            }
            // Now do the final check and then do the callback.
            if (valid && values.length == total) {
                var args = jock.tuple.toTuple.apply(this, values.reverse());
                func.apply(this, [args]);
            }
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

            },
            get:function () {
                var result = jock.option.none();
                return jock.utils.verifiedType(result, jock.option.Option);
            },
            add:function (value) {
                return new Impl(value, this);
            },
            then:function (func) {
                var scope = this;
                jock.utils.when(this._head, {
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

                        var someClosure = function (index) {
                            return function (tailFuture) {
                                // See if the attempt is successful so we don't have to implement the callback.
                                if(tailFuture.attempt().isLeft()) {
                                    values[index] = tailFuture.get();
                                    checkResult.call(this, func, values, total);
                                } else {
                                    // It's not finished yet, let's wait.
                                    tailFuture.then(function (value) {
                                        values[index] = value;
                                        checkResult.call(this, func, values, total);
                                    });
                                }
                            };
                        };

                        someClosure(index++)(future);

                        tail = scope._tail;
                        while (tail.isDefined()) {

                            var join = tail.get();
                            jock.utils.when(join._head, {
                                some:someClosure(index++),
                                none:jock.utils.identity
                            });

                            tail = join._tail;
                        }
                    },
                    none:jock.utils.identity
                });

                return this;
            },
            but:function (value) {
                jock.utils.when(this._head, {
                    some:function (future) {
                        future.but(value);
                    },
                    none:function () {
                    }
                });

                return this;
            }
        };

        return jock.extend(Impl, Methods);
    })()
});