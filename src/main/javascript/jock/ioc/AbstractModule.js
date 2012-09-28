jock.bundle("jock.ioc", {
    AbstractModule:(function () {
        "use strict";

        var findByBinding = function (bindings, value) {
            if (value) {
                var index = bindings.length;
                while (--index > -1) {
                    var item = bindings[index];
                    if (item.bind() === value) {
                        return jock.option.some(item);
                    }
                }
            }
            return jock.option.none();
        };

        var AbstractModule = Object.create(jock.ioc.Module);

        AbstractModule.initialize = function () {
            this.configure();
            this._initialized = true;
        };
        AbstractModule.configure = function () {
            throw new jock.errors.AbstractMethodError();
        };
        AbstractModule.bind = function (value) {
            if (!value) throw new jock.errors.ArgumentError("Value can not be null/undefined");

            var binding = new jock.ioc.Binding(this, value);
            this._bindings.push(binding);
            return binding;
        };
        AbstractModule.getInstance = function (value) {
            if (!value) throw new jock.errors.ArgumentError("Value can not be null/undefined");
            if (!this._initialized) throw new jock.ioc.errors.BindingError("Modules have to be created using Injector.");

            var Ctor = value,
                binding = findByBinding(this._bindings, value);
            try {
                this._injector.pushScope(this);
                return jock.utils.when(binding, {
                    some:function (bindingValue) {
                        var instance = bindingValue.getInstance();
                        return jock.utils.when(instance, {
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
        };
        AbstractModule.binds = function (value) {
            return findByBinding(this._bindings, value).isDefined();
        };

        return function(injector){
            var instance = Object.create(AbstractModule);

            instance._initialized = false;
            instance._bindings = [];
            instance._injector = injector || jock.ioc.Injectors.DEFAULT;

            return Object.freeze(instance);
        };
    })()
});