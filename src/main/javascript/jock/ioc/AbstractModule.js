jock.ioc = jock.ioc || {};
jock.ioc.AbstractModule = (function () {
    "use strict";

    var None = jock.option.None,
        Some = jock.option.Some,
        When = jock.option.When,
        Injector = jock.ioc.Injector;

    var FindByBinding = function (bindings, value) {
        if(value) {
            var index = bindings.length;
            while (--index > -1) {
                var item = bindings[index];
                if(item.bind() === value) {
                    return Some(item);
                }
            }
        }
        return None();
    };

    var Impl = function (injector) {
        jock.ioc.Module.call(this);

        this._injector = injector || jock.ioc.Injectors.DEFAULT;
        this._bindings = [];
        this._initialized = false;
    };
    Impl.prototype = new jock.ioc.Module();
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "AbstractModule";

    var Methods = {
        initialize:function () {
            this.configure();
            this._initialized = true;
        },
        configure:function () {
            throw new jock.errors.AbstractMethodError();
        },
        bind:function (value) {
            if (!value) throw new jock.errors.ArgumentError("Value can not be null/undefined");

            var binding = new jock.ioc.Binding(this, value);
            this._bindings.push(binding);
            return binding;
        },
        getInstance:function (value) {
            if (!value) throw new jock.errors.ArgumentError("Value can not be null/undefined");
            if (!this._initialized) throw new jock.ioc.errors.BindingError("Modules have to be created using Injector.");

            var binding = FindByBinding(this._bindings, value);
            try {
                this._injector.pushScope(this);
                return When(binding, {
                    Some:function (bindingValue) {
                        var instance = bindingValue.getInstance();
                        return When(instance, {
                            Some:function (instanceValue) {
                                return instanceValue;
                            },
                            None:function () {
                                return new (value)();
                            }
                        });
                    },
                    None:function () {
                        return new (value)();
                    }
                });
            } finally {
                this._injector.popScope();
            }
        },
        binds:function (value) {
            return FindByBinding(this._bindings, value).isDefined();
        }
    };

    return jock.utils.extend(Impl, Methods);
}).call(this);