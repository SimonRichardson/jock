jock.ioc = jock.ioc || {};
jock.ioc.AbstractModule = (function(){
    "use strict";

    var None = jock.option.None,
        Some = jock.option.Some,
        When = jock.option.When,
        Injector = jock.ioc.Injector;

    var FindByBind = function(bindings, value) {
        var index = bindings.length;
        while(--index > -1) {
            var item = bindings[index];
            if(item == jock.utils.verifiedType(value, jock.ioc.Binding)) {
                return value === item ? Some(value) : None();
            }
        }
        return None();
    };

    var Impl = function(){
        jock.ioc.Module.call(this);

        this._bindings = [];
        this._initialized = false;
    };
    Impl.prototype = new jock.ioc.Module();
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "AbstractModule";

    var Methods = {
        initialize: function(){
            this.configure();
            this._initialized = true;
        },
        configure: function(){
            throw new jock.errors.AbstractMethodError();
        },
        getInstance: function(value){
            if(!value) throw new jock.errors.ArgumentError("Value can not be null/undefined");
            if(!this._initialized) throw new jock.ioc.errors.BindingError("Modules have to be created using Injector.");

            var binding = FindByBind(this._bindings, value);
            return When(binding, {
                Some: function(bindingValue){
                    var instance = bindingValue.getInstance();
                    return When(instance, {
                        Some: function(instanceValue){
                            return instanceValue;
                        },
                        None: function(){
                            return new value();
                        }
                    });
                },
                None: function(){
                     return new value();
                }
            });
        }
    };

    return jock.utils.extends(Impl, Methods);
}).call(this);