jock.ioc = jock.ioc || {};
jock.ioc.inject = function(type, injector) {
    if(type == null)
        throw new jock.errors.ArgumentError("Given type must not be null.");

    var defaultInjector = injector || jock.ioc.Injectors.DEFAULT;

    var currentScope = defaultInjector.currentScope();

    if(currentScope) return defaultInjector.scopeOf(type).getInstance(type);
    else return currentScope.getInstance(type);
};