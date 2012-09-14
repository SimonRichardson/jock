var jock = {
    VERSION:"0.0.2",
    scope:this,
    extend:function (type, methods) {
        "use strict";

        for (var i in methods)
            type.prototype[i] = methods[i];

        return type;
    },
    mixin:function (impl, trait) {
        "use strict";

        if (!impl.prototype.is)
            impl.prototype.is = [];

        if (impl.prototype.is.indexOf(trait) < 0)
            impl.prototype.is.push(trait);

        function closure(method) {
            return function () {
                return method.apply(this, arguments);
            };
        }

        // Note (Simon) We need to copy ALL known properties including parent properties.
        for (var name in trait.prototype) {
            var method = trait.prototype[name];
            if (name === "constructor" || name === "name")
                continue;

            impl.prototype[name] = closure(method);
        }
        return impl;
    },
    bundle:function (ns, objects) {
        "use strict";

        var scope = jock.scope;

        if (ns.indexOf(".") > -1) {
            ns.split(".").forEach(function (value) {
                if(!!scope[value])
                    scope = scope[value];
                else
                    scope = scope[value] = {};
            });
        }

        for (var i in objects) {
            if (objects.hasOwnProperty(i)) {
                scope[i] = objects[i];
            }
        }

        return scope;
    },
    enumeration:(function () {
        function validate(types, values) {
            var total = types.length;
            if (total != values.length)
                throw new jock.errors.ArgumentError("Invalid length");
            else {
                for (var i = 0; i < total; i++) {
                    var type = types[i];
                    var value = values[i];

                    var valueType = typeof value;
                    if ((valueType === "boolean" && type == Boolean) ||
                        (valueType === "function" && type == Function) ||
                        (valueType === "number" && type == Number) ||
                        (valueType === "string" && type == String) ||
                        (valueType === "object" && value instanceof type)) {
                        continue;
                    }

                    throw new jock.errors.ArgumentError("Invalid Enum argument: Value(" + value +
                        ") is not an instance of type (" + type + ")");
                }
            }
        }

        var Impl = function (index, ns, types, values) {
            this.ns = ns;
            this.types = types;
            this.values = values;

            this.__Enum__ = this;
            this.__EnumIndex__ = index;

            validate(types, values);

            this.toString = function () {
                return this.ns + "(" + this.values + ")";
            };
        };

        return function (type) {
            function closure(index, ns, types) {
                return function () {
                    return new Impl(index, ns, types, Array.prototype.slice.call(arguments));
                };
            }

            var scope = {};
            var index = 0;
            for (var i in type) {
                if (type.hasOwnProperty(i)) {
                    scope[i] = closure(index++, i, type[i]);
                }
            }
            return scope;
        };
    })()
};