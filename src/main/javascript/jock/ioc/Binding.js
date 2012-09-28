jock.bundle("jock.ioc", {
    Binding:(function () {
        "use strict";

        var BindTypes = jock.enumeration({
            To:[jock.option.Option],
            ToInstance:[jock.option.Option],
            ToProvider:[jock.option.Option]
        });

        var create = function (Value) {
            if (typeof Value === "function") {
                return new Value();
            } else if (typeof Value === "object") {
                return Object.freeze(Object.create(Value));
            }
            throw new jock.errors.TypeError();
        };

        var solve = function (type, module, bindType) {
            return jock.utils.match(type, {
                To:function (option) {
                    return jock.utils.when(option, {
                        some:function (value) {
                            return module.getInstance(value);
                        },
                        none:function () {
                            return create(bindType);
                        }
                    });
                },
                ToInstance:function (option) {
                    return jock.utils.when(option, {
                        some:jock.utils.identity
                    });
                },
                ToProvider:function (option) {
                    var bindingProvider = jock.utils.when(option, {
                        some:jock.utils.identity
                    });
                    var provider = module.getInstance(bindingProvider);
                    return jock.utils.verifiedType(provider, jock.ioc.Provider).get;
                }
            });
        };

        var Binding = Object.create(jock.ioc.Scope);
        Binding.to = function (instance) {
            if (!instance) throw new jock.errors.ArgumentError("Instance can not be null/undefined");

            this._type = BindTypes.To(jock.option.some(instance));
            return this;
        };
        Binding.toInstance = function (instance) {
            if (!instance) throw new jock.errors.ArgumentError("Instance can not be null/undefined");

            this._type = BindTypes.ToInstance(jock.option.some(instance));
            return this;
        };
        Binding.toProvider = function (provider) {
            if (!provider) throw new jock.errors.ArgumentError("Provider can not be null/undefined");

            this._type = BindTypes.ToProvider(jock.option.some(provider));
            return this;
        };
        Binding.getInstance = function () {
            if (this._singletonScope) {
                if (this._singletonEvaluated) {
                    return jock.utils.verifiedType(this._value, jock.option.Option);
                }
                this._value = jock.option.some(solve(this._type, this._module, this.bind));
                this._singletonEvaluated = true;

                return this._value;
            } else {
                return jock.option.some(solve(this._type, this._module, this.bind));
            }
        };
        Binding.asSingleton = function () {
            this._singletonScope = true;
            return this;
        };

        return function (module, bindType) {
            if (!module) throw new jock.errors.ArgumentError("Module can not be null/undefined");
            if (!bindType) throw new jock.errors.ArgumentError("BindType can not be null/undefined");

            var instance = Object.create(Binding, {
                bind:{
                    get:function () {
                        return bindType;
                    },
                    configurable:false
                }
            });

            instance._module = jock.utils.verifiedType(module, jock.ioc.Module);

            instance._type = BindTypes.To(jock.option.none());

            instance._singletonScope = false;
            instance._singletonEvaluated = false;

            return Object.freeze(instance);
        }
    })()
});
