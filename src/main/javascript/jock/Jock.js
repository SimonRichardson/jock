var jock = {
    VERSION:"0.0.2",
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
    package:function (ns, objects) {
        "use strict";

        var scope = this;
        var namespace = scope;

        if (ns.indexOf(".") > -1) {
            ns.split(".").forEach(function (value) {
                namespace = (scope[value] = scope[value] || {});
            });
        }

        for (var i in objects) {
            if (objects.hasOwnProperty(i)) {
                namespace[i] = objects[i];
            }
        }
    },
    enum:(function () {
        function validate(types, values) {
            var total = types.length;
            if (total != values.length)
                throw new jock.errors.ArgumentError("Invalid length");
            else {
                for (var i = 0; i < total; i++) {
                    var type = types[i];
                    var value = values[i];

                    if ((typeof value === "number" && type == Number) ||
                        (typeof value === "string" && type == String) ||
                        (typeof value === "object" && value instanceof type)) {
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
        };
        Impl = jock.mixin(Impl, jock.product.Product);

        var Methods = {
            productArity:function(){
                return this.types.length;
            },
            productElement:function(index){
                if(index >= 0 && index < this.productArity())
                    return this.values[index];

                throw new jock.errors.RangeError();
            },
            productPrefix:function () {
                return this.ns;
            }
        };

        Impl = jock.extend(Impl, Methods);

        return function (type) {
            function closure(index, ns, types) {
                return function () {
                    return new Impl(index, ns, types, Array.prototype.slice.call(arguments));
                }
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