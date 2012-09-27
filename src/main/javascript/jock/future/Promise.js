jock.bundle("jock.future", {
    Promise:(function () {
        "use strict";

        var Promise = Object.create({});

        Promise.then = function (callback) {
            var deferred = this.get;
            jock.utils.match(deferred.state, {
                Pending:function () {
                    if (deferred._completes.indexOf(callback) < 0) {
                        deferred._completes.push(callback);
                    }
                },
                Resolved:function (value) {
                    callback(value);
                },
                Default:function () {
                }
            });
            return this;
        };
        Promise.but = function (callback) {
            var deferred = this.get;
            jock.utils.match(deferred.state, {
                Pending:function () {
                    if (deferred._fails.indexOf(callback) < 0) {
                        deferred._fails.push(callback);
                    }
                },
                Rejected:function (value) {
                    callback(value);
                },
                Default:function () {
                }
            });
            return this;
        };
        Promise.done = function (callback) {
            var deferred = this.get;
            jock.utils.match(deferred.state, {
                Pending:function () {
                    if (deferred._done.indexOf(callback) < 0) {
                        deferred._done.push(callback);
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
        };

        return function (deferred) {
            var instance = Object.create(Promise, {
                get:{
                    get:function () {
                        return deferred;
                    },
                    configurable:false
                }
            });
            return Object.freeze(instance);
        };
    })()
});