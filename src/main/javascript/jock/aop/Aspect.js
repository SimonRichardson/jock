jock.bundle("jock.aop", {
    Aspect:(function () {

        var Aspects = jock.enumeration({
            Before:[String, Object, Function, Object],
            After:[String, Object, Function, Object],
            Around:[String, Object, Function, Object],
            Prevent:[String, Object, Function, Object]
        });

        function validate(source, name, override) {
            if (source[name]) {
                var origin = source[name];
                if (origin && typeof origin === "function" && override && typeof override === "function") {
                    return;
                }
            }

            throw new jock.aop.errors.AspectError("Cannot bind unknown method");
        }

        function solve(type) {
            var value = jock.utils.match(type, {
                Before:function (name, source, override, scope) {
                    validate(source, name, override);

                    var origin = source[name];
                    source[name] = function () {
                        var args = Array.prototype.slice.call(arguments);
                        override.apply(scope, args);
                        return origin.apply(scope, args);
                    };
                    return true;
                },
                After:function (name, source, override, scope) {
                    validate(source, name, override);

                    var origin = source[name];
                    source[name] = function () {
                        var args = Array.prototype.slice.call(arguments);
                        origin.apply(scope, args);
                        return override.apply(scope, args);
                    };
                    return true;
                },
                Around:function (name, source, override, scope) {
                    validate(source, name, override);

                    var origin = source[name];
                    source[name] = function () {
                        var args = Array.prototype.slice.call(arguments);
                        return override.apply(scope, [function () {
                            origin.apply(scope, args);
                        }].concat(args));
                    };
                    return true;
                },
                Prevent:function (name, source, override, scope) {
                    validate(source, name, override);

                    var origin = source[name];
                    source[name] = function () {
                        var args = Array.prototype.slice.call(arguments);
                        return override.apply(scope, args);
                    };
                    return true;
                }
            });

            if (typeof value === "undefined")
                throw new jock.aop.errors.AspectError("Unable to bind method");
        }

        // TODO (Simon) : Fix the code duplication bellow.

        var Aspect = Object.create({});
        Aspect.after = function (methods) {
            if (!methods)
                throw new jock.errors.ArgumentError("Methods can not be null/undefined");

            for (var i in methods) {
                if (methods.hasOwnProperty(i))
                    solve(Aspects.After(i, this.get, methods[i], this));
            }
            return this;
        };
        Aspect.before = function (methods) {
            if (!methods) {
                throw new jock.errors.ArgumentError("Methods can not be null/undefined");
            }

            for (var i in methods) {
                if (methods.hasOwnProperty(i)) {
                    solve(Aspects.Before(i, this.get, methods[i], this));
                }
            }
            return this;
        };
        Aspect.around = function (methods) {
            if (!methods) {
                throw new jock.errors.ArgumentError("Methods can not be null/undefined");
            }

            for (var i in methods) {
                if (methods.hasOwnProperty(i)) {
                    solve(Aspects.Around(i, this.get, methods[i], this));
                }
            }
            return this;
        };
        Aspect.prevent = function (methods) {
            if (!methods) {
                throw new jock.errors.ArgumentError("Methods can not be null/undefined");
            }

            for (var i in methods) {
                if (methods.hasOwnProperty(i)) {
                    solve(Aspects.Prevent(i, this.get, methods[i], this));
                }
            }
            return this;
        };

        return function (source) {
            if (!source)
                throw new jock.errors.ArgumentError("Source can not be null/undefined");

            var instance = Object.create(Aspect, {
                get:{
                    get:function () {
                        return source;
                    },
                    configurable:false
                }
            });
            return Object.freeze(instance);
        };
    })()
});