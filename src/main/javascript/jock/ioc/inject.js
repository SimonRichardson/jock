jock.ioc = jock.ioc || {};
jock.ioc.inject = function (type, injector) {
    if (!type) throw new jock.errors.ArgumentError("Given type must not be null.");

    var InjectionPoint = jock.ioc.InjectionPoint,
        When = jock.option.When;

    var defaultInjector = injector || jock.ioc.Injectors.DEFAULT;
    var result = When(defaultInjector.currentScope(), {
        None:function () {
            return When(defaultInjector.scopeOf(type), {
                None:function () {
                    throw new jock.ioc.errors.BindingError();
                },
                Some:function (value) {
                    return value.getInstance(type);
                }
            });
        },
        Some:function (value) {
            return value.getInstance(type);
        }
    });

    return new InjectionPoint(result);
};