jock.bundle("jock.ioc", {
    AbstractModule:(function () {
        "use strict";

        var none = jock.option.none,
            some = jock.option.some,
            when = jock.option.when,
            Injector = jock.ioc.Injector;

        var findByBinding = function (bindings, value) {
            if (value) {
                var index = bindings.length;
                while (--index > -1) {
                    var item = bindings[index];
                    if (item.bind() === value) {
                        return some(item);
                    }
                }
            }
            return none();
        };

        var Impl = function (injector) {
            jock.ioc.Module.call(this);

            this._injector = injector || jock.ioc.Injectors.DEFAULT;
            this._bindings = [];
            this._initialized = false;
        };
        Impl.prototype = new jock.ioc.Module();
        Impl.prototype.constructor = Impl;

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

                var Ctor = value,
                    binding = findByBinding(this._bindings, value);
                try {
                    this._injector.pushScope(this);
                    return when(binding, {
                        some:function (bindingValue) {
                            var instance = bindingValue.getInstance();
                            return when(instance, {
                                some:function (instanceValue) {
                                    return instanceValue;
                                },
                                none:function () {
                                    return new Ctor();
                                }
                            });
                        },
                        none:function () {
                            return new Ctor();
                        }
                    });
                } finally {
                    this._injector.popScope();
                }
            },
            binds:function (value) {
                return findByBinding(this._bindings, value).isDefined();
            }
        };

        return jock.extend(Impl, Methods);
    })()
});