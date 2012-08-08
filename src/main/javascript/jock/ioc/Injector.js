jock.ioc = jock.ioc || {};
jock.ioc.Injector = (function () {
    "use strict";

    var None = jock.option.None,
        Some = jock.option.Some;

    var FindByType = function(map, type) {
        if(type){
            var index = map.length;
            while(--index > -1) {
                var node = map[index];
                if(node.type == type) {
                    return Some(node.module);
                }
            }
        }
        return None();
    };

    var Node = function(type, module) {
        this.type = type;
        this.module = module;
    };

    var Impl = function () {
        this._map = [];
        this._scopes = [];
        this._modules = [];
        this._currentScope = None();
    };
    Impl.prototype = {};
    Impl.prototype.constructor = Impl;
    Impl.prototype.name = "Injector";

    var Methods = {
        initialize:function (module) {
            if (jock.utils.verifiedType(module, jock.ioc.Module)) {
                module.initialize();
                this._modules.push(module);
            }
            return module;
        },
        clearAll:function () {
            this._map.length = 0;
            this._scopes.length = 0;
            this._modules.length = 0;
            this._currentScope = None();
        },
        pushScope:function (module) {
            if (jock.utils.verifiedType(module, jock.ioc.Module)) {
                this._currentScope = Some(module);
                this._scopes.push(module);
            }
            return module;
        },
        popScope:function () {
            var module = None();
            if (this._scopes.length > 0) {
                this._scopes.pop();
                if (this._scopes.length > 0) {
                    var head = this._scopes[this._scopes.length - 1];
                    module = Some(jock.utils.verifiedType(head, jock.ioc.Module));
                }
            }
            this._currentScope = module;
        },
        currentScope:function () {
            return this._currentScope;
        },
        scopeOf:function (value) {
            var result = None();
            var index = this._modules.length;
            while(--index > -1) {
                var module = this._modules[index];
                if(module.binds(value)) {
                    if(result.isDefined()) {
                        throw new jock.ioc.errors.BindingError("More than one module binds with the value");
                    }

                    result = Some(module);
                }
            }

            if(module.isEmpty()){
                throw new jock.ioc.errors.BindingError("No binding could be found");
            }

            return result;
        },
        moduleOf:function (value) {
           var possibleResult = FindByType(this._map, value);

            if(possibleResult.isDefined())
                return possibleResult.get();

            var index = this._modules.length;
            while(--index > -1) {
                var module = this._modules[index];
                if(module instanceof value) {
                    this._map.push(new Node(value, module));
                    return Some(module);
                }
            }

            return None();
        }
    };

    return jock.utils.extends(Impl, Methods);
}).call(this);

jock.ioc.Injectors = {
    DEFAULT: new jock.ioc.Injector()
};