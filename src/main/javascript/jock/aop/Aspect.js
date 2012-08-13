jock.aop = jock.aop || {};
jock.aop.Aspect = (function () {

    var AspectType = {
        BEFORE:1,
        AFTER:2,
        AROUND:3,
        PREVENT:4
    };

    var Solve = function (type, name, source, override, scope) {
        if (source[name]) {
            var origin = source[name];
            if (origin && typeof origin === "function" && override && typeof override === "function") {
                source[name] = function () {

                    var args = Array.prototype.slice.call(arguments);

                    var result = null;
                    switch (type) {
                        case AspectType.BEFORE:
                            override.apply(scope, args);
                            result = origin.apply(scope, args);
                            break;

                        case AspectType.AFTER:
                            origin.apply(scope, args);
                            result = override.apply(scope, args);
                            break;

                        case AspectType.AROUND:
                            result = override.apply(scope, [function () {
                                origin.apply(scope, args);
                            }].concat(args));
                            break;

                        case AspectType.PREVENT:
                            result = override.apply(scope, args);
                            break;

                        default:
                            throw new jock.aop.errors.AspectError("Unable to bind method");
                    }

                    return result;
                };
                return this;
            }

            throw new jock.aop.errors.AspectError("Unable to bind method");
        }

        throw new jock.aop.errors.AspectError("Cannot bind unknown method");
    };

    var Impl = function (source) {
        this._source = source;
    };
    Impl.prototype = {};
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "Aspect";

    // TODO (Simon) : Fix the code duplication bellow.

    var Methods = {
        get:function () {
            return this._source;
        },
        after:function (methods) {
            if (!methods)
                throw new jock.errors.ArgumentError("Methods can not be null/undefined");

            for (var i in methods) {
                if (methods.hasOwnProperty(i))
                    Solve(AspectType.AFTER, i, this._source, methods[i], this);
            }
            return this;
        },
        before:function (methods) {
            if (!methods)
                throw new jock.errors.ArgumentError("Methods can not be null/undefined");

            for (var i in methods) {
                if (methods.hasOwnProperty(i))
                    Solve(AspectType.BEFORE, i, this._source, methods[i], this);
            }
            return this;
        },
        around:function (methods) {
            if (!methods)
                throw new jock.errors.ArgumentError("Methods can not be null/undefined");

            for (var i in methods) {
                if (methods.hasOwnProperty(i))
                    Solve(AspectType.AROUND, i, this._source, methods[i], this);
            }
            return this;
        },
        prevent:function (methods) {
            if (!methods)
                throw new jock.errors.ArgumentError("Methods can not be null/undefined");

            for (var i in methods) {
                if (methods.hasOwnProperty(i))
                    Solve(AspectType.PREVENT, i, this._source, methods[i], this);
            }
            return this;
        }
    };

    return jock.utils.extends(Impl, Methods);
}).call(this);