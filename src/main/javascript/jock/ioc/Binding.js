jock.ioc = jock.ioc || {};
jock.ioc.Binding = (function () {
    "use strict";

    var BindType = {
        TO:1,
        TO_INSTANCE:2,
        TO_PROVIDER:3
    };

    var None = jock.option.None,
        Some = jock.option.Some,
        When = jock.option.When;

    var Solve = function (binding) {
        var type = binding._type;
        if (type == BindType.TO) {
            return When(binding._to, {
                Some:function (value) {
                    return binding._module.getInstance(value);
                },
                None:function () {
                    return new (binding._bindType)();
                }
            });
        } else if (type == BindType.TO_INSTANCE) {
            return When(binding._toInstance, {
                Some:function (value) {
                    return value;
                }
            });
        } else if (type == BindType.TO_PROVIDER) {
            var bindingProvider = When(binding._toProvider, {
                Some:function (value) {
                    return value;
                }
            });
            var provider = binding._module.getInstance(bindingProvider);
            return jock.utils.verifiedType(provider, jock.ioc.Provider).get();
        }

        throw new jock.ioc.errors.BindingError("Unexpected binding type");
    };

    var Impl = function (module, bindType) {
        if (!module) throw new jock.errors.ArgumentError("Module can not be null/undefined");
        if (!bindType) throw new jock.errors.ArgumentError("BindType can not be null/undefined");

        jock.ioc.Scope.call(this);

        this._module = jock.utils.verifiedType(module, jock.ioc.AbstractModule);
        this._bindType = bindType;

        this._type = BindType.TO;

        this._to = None();
        this._toInstance = None();
        this._toProvider = None();

        this._singletonScope = false;
        this._singletonEvaluated = false;
    };
    Impl.prototype = new jock.ioc.Scope();
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "Binding";

    var Methods = {
        bind:function () {
            return this._bindType;
        },
        to:function (instance) {
            if (!instance) throw new jock.errors.ArgumentError("Instance can not be null/undefined");

            this._type = BindType.TO;
            this._to = Some(instance);
            return this;
        },
        toInstance:function (instance) {
            if (!instance) throw new jock.errors.ArgumentError("Instance can not be null/undefined");

            this._type = BindType.TO_INSTANCE;
            this._toInstance = Some(instance);
            return this;
        },
        toProvider:function (provider) {
            if (!provider) throw new jock.errors.ArgumentError("Provider can not be null/undefined");

            this._type = BindType.TO_PROVIDER;
            this._toProvider = Some(provider);
            return this;
        },
        getInstance:function () {
            if (this._singletonScope) {
                if (this._singletonEvaluated) {
                    return jock.utils.verifiedType(this._value, jock.option.Option);
                }
                this._value = Some(Solve(this));
                this._singletonEvaluated = true;
                return this._value;
            } else {
                return Some(Solve(this));
            }
        },
        asSingleton:function () {
            this._singletonScope = true;
            return this;
        }
    };

    return jock.utils.extend(Impl, Methods);
}).call(this);