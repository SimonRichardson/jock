jock.package("jock.ioc", {
    inject:function (type, injector) {
        if (!type) throw new jock.errors.ArgumentError("Given type must not be null.");

        var InjectionPoint = jock.ioc.InjectionPoint,
            when = jock.option.when;

        var defaultInjector = injector || jock.ioc.Injectors.DEFAULT;
        var result = when(defaultInjector.currentScope(), {
            none:function () {
                return when(defaultInjector.scopeOf(type), {
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

        return new InjectionPoint(result);
    }
});