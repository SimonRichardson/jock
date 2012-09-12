jock.bundle("jock.ioc", {
    Injector:(function () {
        "use strict";

        var none = jock.option.none,
            some = jock.option.some;

        var findByType = function (map, type) {
            if (type) {
                var index = map.length;
                while (--index > -1) {
                    var node = map[index];
                    if (node.type == type) {
                        return some(node.module);
                    }
                }
            }
            return none();
        };

        var Node = function (type, module) {
            this.type = type;
            this.module = module;
        };

        var Impl = function () {
            this._map = [];
            this._scopes = [];
            this._modules = [];
            this._currentScope = none();
        };
        Impl.prototype = {};
        Impl.prototype.constructor = Impl;

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
                this._currentScope = none();
            },
            pushScope:function (module) {
                if (jock.utils.verifiedType(module, jock.ioc.Module)) {
                    this._currentScope = some(module);
                    this._scopes.push(module);
                }
                return module;
            },
            popScope:function () {
                var module = none();
                if (this._scopes.length > 0) {
                    this._scopes.pop();
                    if (this._scopes.length > 0) {
                        var head = this._scopes[this._scopes.length - 1];
                        module = some(jock.utils.verifiedType(head, jock.ioc.Module));
                    }
                }
                this._currentScope = jock.utils.verifiedType(module, jock.option.Option);
            },
            currentScope:function () {
                return jock.utils.verifiedType(this._currentScope, jock.option.Option);
            },
            scopeOf:function (value) {
                var result = none();
                var index = this._modules.length;
                while (--index > -1) {
                    var module = this._modules[index];
                    if (module.binds(value)) {
                        if (result.isDefined()) {
                            throw new jock.ioc.errors.BindingError("More than one module binds with the value");
                        }

                        result = some(module);
                    }
                }

                if (result.isEmpty()) {
                    throw new jock.ioc.errors.BindingError("No binding could be found");
                }

                return result;
            },
            moduleOf:function (value) {
                var possibleResult = findByType(this._map, value);

                if (possibleResult.isDefined())
                    return possibleResult.get();

                var index = this._modules.length;
                while (--index > -1) {
                    var module = this._modules[index];
                    if (module instanceof value) {
                        this._map.push(new Node(value, module));
                        return some(module);
                    }
                }

                return none();
            }
        };

        return jock.extend(Impl, Methods);
    })()
});

// Note (Simon) we do this like this, because we're using the newly created injector.
jock.bundle("jock.ioc", {
    Injectors:{
        DEFAULT:new jock.ioc.Injector()
    }
});