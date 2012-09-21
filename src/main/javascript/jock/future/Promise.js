jock.bundle("jock.future", {
    Promise:(function () {
        "use strict";

        var Impl = function Promise(deferred) {
            this._deferred = deferred;
        };

        var Methods = {
            then:function (func) {
                var deferred = this._deferred;
                jock.utils.match(deferred.getState(), {
                    Pending:function () {
                        if (deferred.completes.indexOf(func) < 0) {
                            deferred.completes.push(func);
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
                var deferred = this._deferred;
                jock.utils.match(deferred.getState(), {
                    Pending:function () {
                        if (deferred.fails.indexOf(func) < 0) {
                            deferred.fails.push(func);
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