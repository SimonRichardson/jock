jock.bundle("jock.future", {
    Promise:(function () {
        "use strict";

        var Impl = function Promise(deferred) {
            this._deferred = deferred;
        };

        var Methods = {
            then:function (callback) {
                var deferred = this._deferred;
                jock.utils.match(deferred.getState(), {
                    Pending:function () {
                        if (deferred.completes.indexOf(callback) < 0) {
                            deferred.completes.push(callback);
                        }
                    },
                    Resolved:function (callback) {
                        func(callback);
                    },
                    Default:function () {
                    }
                });
                return this;
            },
            but:function (callback) {
                var deferred = this._deferred;
                jock.utils.match(deferred.getState(), {
                    Pending:function () {
                        if (deferred.fails.indexOf(callback) < 0) {
                            deferred.fails.push(callback);
                        }
                    },
                    Rejected:function (value) {
                        callback(value);
                    },
                    Default:function () {
                    }
                });
                return this;
            },
            done:function (callback) {
                var deferred = this._deferred;
                jock.utils.match(deferred.getState(), {
                    Pending:function () {
                        if (deferred.done.indexOf(callback) < 0) {
                            deferred.done.push(callback);
                        }
                    },
                    Resolved:function (value) {
                        callback(value);
                    },
                    Rejected:function (value) {
                        callback(value);
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