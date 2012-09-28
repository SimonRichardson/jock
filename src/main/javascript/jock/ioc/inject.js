jock.bundle("jock.ioc", {
    inject:function (type, injector) {
        if (!type) throw new jock.errors.ArgumentError("Given type must not be null.");

        var defaultInjector = injector || jock.ioc.Injectors.DEFAULT;
        var result = jock.utils.when(defaultInjector.currentScope(), {
            none:function () {
                return jock.utils.when(defaultInjector.scopeOf(type), {
                    none:function () {
                        throw new jock.ioc.errors.BindingError();
                    },
                    some:function (value) {
                        return value.getInstance(type);
                    }
                });
            },
            some:function (value) {
                return value.getInstance(type);
            }
        });

        return jock.ioc.InjectionPoint(result);
    }
});