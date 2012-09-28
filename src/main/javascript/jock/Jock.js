var jock = {
    VERSION:"0.0.2",
    scope:this,
    bundle:function (ns, objects) {
        "use strict";

        var scope = jock.scope;

        if (ns.indexOf(".") > -1) {
            ns.split(".").forEach(function (value) {
                if (!!scope[value])
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
                        (valueType === "object" && jock.utils.isType(value, type))) {
                        continue;
                    }

                    throw new jock.errors.ArgumentError("Invalid Enum argument: Value(" + value +
                        ") is not an instance of type (" + type + ")");
                }
            }
        }

        var Impl = function Enumeration(index, ns, types, values) {
            this.ns = ns;
            this.types = types;
            this.values = values;

            this.__Enum__ = this;
            this.__EnumIndex__ = index;

            validate(types, values);

            this.equals = function (that) {
                if (that instanceof Impl) {
                    var valid = true,
                        total = this.values.length;
                    if (this.ns === that.ns && total === that.values.length) {
                        for(var i = 0; i<total; i++) {
                            if(!jock.utils.eq(this.values[i], that.values[i])) {
                                valid = false;
                                break;
                            }
                        }
                        return valid;
                    }
                }
                return false;
            };
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