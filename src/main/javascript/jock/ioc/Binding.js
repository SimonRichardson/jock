jock.package("jock.ioc", {
    Binding:(function () {
        "use strict";

        var BindTypes = jock.enum({
            To:[jock.option.Option],
            ToInstance:[jock.option.Option],
            ToProvider:[jock.option.Option]
        });

        var none = jock.option.none,
            some = jock.option.some,
            when = jock.option.when;

        var solve = function (type, module, bindType) {
            return jock.utils.match(type, {
                To:function (option) {
                    return when(option, {
                        some:function (value) {
                            return module.getInstance(value);
                        },
                        none:function () {
                            return new bindType();
                        }
                    });
                },
                ToInstance:function (option) {
                    return when(option, {
                        some:jock.utils.identity
                    });
                },
                ToProvider:function (option) {
                    var bindingProvider = when(option, {
                        some:jock.utils.identity
                    });
                    var provider = module.getInstance(bindingProvider);
                    return jock.utils.verifiedType(provider, jock.ioc.Provider).get();
                }
            });
        };

        var Impl = function (module, bindType) {
            if (!module) throw new jock.errors.ArgumentError("Module can not be null/undefined");
            if (!bindType) throw new jock.errors.ArgumentError("BindType can not be null/undefined");

            jock.ioc.Scope.call(this);

            this._module = jock.utils.verifiedType(module, jock.ioc.AbstractModule);
            this._bindType = bindType;

            this._type = BindTypes.To(none());

            this._singletonScope = false;
            this._singletonEvaluated = false;
        };
        Impl.prototype = new jock.ioc.Scope();
        Impl.prototype.constructor = Impl;

        var Methods = {
            bind:function () {
                return this._bindType;
            },
            to:function (instance) {
                if (!instance) throw new jock.errors.ArgumentError("Instance can not be null/undefined");

                this._type = BindTypes.To(some(instance));
                return this;
            },
            toInstance:function (instance) {
                if (!instance) throw new jock.errors.ArgumentError("Instance can not be null/undefined");

                this._type = BindTypes.ToInstance(some(instance));
                return this;
            },
            toProvider:function (provider) {
                if (!provider) throw new jock.errors.ArgumentError("Provider can not be null/undefined");

                this._type = BindTypes.ToProvider(some(provider));
                return this;
            },
            getInstance:function () {
                if (this._singletonScope) {
                    if (this._singletonEvaluated) {
                        return jock.utils.verifiedType(this._value, jock.option.Option);
                    }
                    this._value = some(solve(this._type, this._module, this._bindType));
                    this._singletonEvaluated = true;
                    return this._value;
                } else {
                    return some(solve(this._type, this._module, this._bindType));
                }
            },
            asSingleton:function () {
                this._singletonScope = true;
                return this;
            }
        };

        return jock.extend(Impl, Methods);
    })()
});
