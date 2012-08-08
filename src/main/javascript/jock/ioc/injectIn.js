jock.ioc = jock.ioc || {};
jock.ioc.injectIn = function(type, module, injector) {
    if(type == null)
        throw new jock.errors.ArgumentError("Given type must not be null.");
    if(module == null)
        throw new jock.errors.ArgumentError("Given module must not be null.");

    var defaultInjector = injector || jock.ioc.Injectors.DEFAULT;

    return defaultInjector.moduleOf(module).getInstance(type);
};