jock.bundle("jock.future", {
    Deferred:(function () {
        "use strict";

        var States = jock.enumeration({
            Pending:[],
            Resolved:[jock.option.Option],
            Rejected:[Error],
            Aborted:[]
        });

        var Impl = function Deferred() {
            this.state = States.Pending();

            this.done = [];
            this.fails = [];
            this.updates = [];
            this.completes = [];
        };

        var Methods = {
            attempt:function () {
                return jock.utils.match(this.state, {
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
                return jock.utils.match(this.state, {
                    Resolved:function (value) {
                        return value;
                    },
                    Default:function () {
                        return jock.option.none();
                    }
                });
            },
            progress:function (value) {
                var scope = this;
                jock.utils.match(this.state, {
                    Pending:function () {
                        var s = jock.option.toOption(value);

                        scope.updates.forEach(function (callback) {
                            callback(s);
                        });
                    },
                    Default:function () {
                    }
                });
            },
            resolve:function (value) {
                var scope = this;
                jock.utils.match(this.state, {
                    Pending:function () {
                        var s = jock.option.toOption(value);

                        scope.state = States.Resolved(s);
                        scope.completes.forEach(function (callback) {
                            callback(s);
                        });
                        scope.done.forEach(function(callback) {
                            callback(s);
                        });
                    },
                    Default:function () {
                    }
                });
            },
            reject:function (error) {
                var scope = this;
                jock.utils.match(this.state, {
                    Pending:function () {
                        error = jock.utils.verifiedType(error, Error);

                        scope.state = States.Rejected(error);
                        scope.fails.forEach(function (callback) {
                            callback(error);
                        });
                        scope.done.forEach(function(callback) {
                            callback(error);
                        });
                    },
                    Default:function () {
                    }
                });
            },
            abort:function () {
                this.state = States.Aborted();

                this.fails.length = 0;
                this.completes.length = 0;
            },
            promise:function () {
                return new jock.future.Promise(this);
            },
            getState:function () {
                return this.state;
            }
        };

        return jock.extend(Impl, Methods);
    })()
});