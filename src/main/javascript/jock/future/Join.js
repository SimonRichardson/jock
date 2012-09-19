jock.bundle("jock.future", {
    Join:(function () {
        "use strict";

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
                            values = [];

                        var check = function () {
                            if (values.length == total) {
                                func.apply(scope, [jock.tuple.toTuple.apply(scope, values.reverse())]);
                            }
                        };

                        var someClosure = function (index) {
                            return function (tailFuture) {
                                tailFuture.then(function (value) {
                                    values[index] = value;
                                    check();
                                });
                            };
                        };

                        someClosure(total++)(future);

                        var tail = scope._tail;
                        while (tail.isDefined()) {

                            var join = tail.get();
                            jock.utils.when(join._head, {
                                some:someClosure(total++),
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