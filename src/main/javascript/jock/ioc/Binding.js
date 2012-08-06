jock.ioc = jock.ioc || {};
jock.ioc.Binding = (function(){
    "use strict";

    var BindType = {
        TO: 1,
        TO_INSTANCE: 2
    };

    var None = jock.option.None,
        Some = jock.option.Some,
        When = jock.option.When;

    var Solve = function(binding){
        var type = binding._type;
        if(type == BindType.TO_INSTANCE) {
            return When(binding._toInstance, {
                Some: function(value) {
                    return value;
                }
            });
        }
    };


    var Impl = function(module, bindType){
        if(!module) throw new jock.errors.ArgumentError("Module can not be null/undefined");
        if(!bindType) throw new jock.errors.ArgumentError("BindType can not be null/undefined");

        jock.ioc.Scope.call(this);

        this._module = jock.utils.verifiedType(module, jock.ioc.AbstractModule);
        this._bindType = bindType;

        this._toInstance = None();
    };
    Impl.prototype = new jock.ioc.Scope();
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "Binding";

    var Methods = {
        bind: function(){
            return this._bindType;
        },
        toInstance: function(instance){
            this._type = BindType.TO_INSTANCE;
            this._toInstance = Some(instance);
            return this;
        },
        getInstance: function(){
            return Some(Solve(this));
        }
    };

    jock.utils.extends(Impl, Methods);

    return Impl;
}).call(this);