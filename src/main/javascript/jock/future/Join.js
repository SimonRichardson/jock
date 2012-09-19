jock.bundle("jock.future", {
    Join:(function () {
        "use strict";

        var Impl = function Join(head, tail) {
            if(typeof head !== "undefined") {
                head = jock.utils.verifiedType(head, jock.future.Future);
                this._head = jock.option.some(head);
            } else {
                this._head = jock.option.none();
            }

            this._tail = tail;
        };

        var Methods = {
            attempt:function(){

            },
            get:function () {
                var result = jock.utils.when(this._head, {
                    some:function (value) {
                        return value.get();
                    },
                    none:function () {
                        return jock.option.none();
                    }
                });
                return jock.utils.verifiedType(result, jock.option.Option);
            },
            add:function (value) {
                return new Impl(value, this);
            },
            when:function (value) {
                jock.utils.when(this._head, {
                    some:function (future) {
                        future.when(value);
                    },
                    none:function () {
                    }
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