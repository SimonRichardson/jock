jock.ioc = jock.ioc || {};
jock.ioc.Injector = (function () {
    "use strict";

    var None = jock.option.None,
        Some = jock.option.Some;

    var Impl = function () {
        this._map = {};
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
        pushScope:function (module) {
            if (jock.utils.verifiedType(module, jock.ioc.Module)) {
                this._currentScope = Some(module);
                this._scopes.push(module);
            }
            return module;
        },
        popScope:function () {
            var module = None();
            if(this._scopes.length > 0) {
                this._scopes.pop();
                if(this._scopes.length > 0) {
                    var head = this._scopes[this._scopes.length - 1];
                    module = Some(jock.utils.verifiedType(head, jock.ioc.Module));
                }
            }
            this._currentScope = module;
        },
        currentScope:function () {
            return this._currentScope;
        }
    };

    return jock.utils.extends(Impl, Methods);
}).call(this);