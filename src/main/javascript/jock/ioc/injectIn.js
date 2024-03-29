jock.bundle("jock.ioc", {
    injectIn:function (type, module, injector) {
        if (!type)
            throw new jock.errors.ArgumentError("Given type must not be null.");
        if (!module)
            throw new jock.errors.ArgumentError("Given module must not be null.");

        var defaultInjector = injector || jock.ioc.Injectors.DEFAULT;

        return jock.utils.when(defaultInjector.moduleOf(module), {
            none:function () {
                throw new jock.ioc.errors.BindingError();
            },
            some:function (value) {
                return value.getInstance(type);
            }
        });
    }
});