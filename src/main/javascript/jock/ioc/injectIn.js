jock.ioc = jock.ioc || {};
jock.ioc.injectIn = function(type, module, injector) {
    if(!type)
        throw new jock.errors.ArgumentError("Given type must not be null.");
    if(!module)
        throw new jock.errors.ArgumentError("Given module must not be null.");

    var defaultInjector = injector || jock.ioc.Injectors.DEFAULT;

    var When = jock.option.When;
    return When(defaultInjector.moduleOf(module), {
        None: function(){
            throw new jock.ioc.errors.BindingError();
        },
        Some: function(value){
            return value.getInstance(type);
        }
    });
};