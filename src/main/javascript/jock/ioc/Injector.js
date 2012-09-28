jock.bundle("jock.ioc", {
    Injector:(function () {
        "use strict";

        var findByType = function (map, type) {
            if (type) {
                var index = map.length;
                while (--index > -1) {
                    var node = map[index];
                    if (node.type == type) {
                        return jock.option.some(node.module);
                    }
                }
            }
            return jock.option.none();
        };

        var NodeObject = {
            type:null,
            module:null
        };

        var Node = function(type, module) {
            var instance = Object.create(NodeObject);
            instance.type = type;
            instance.module = module;
            return Object.freeze(instance);
        };

        var Injector = Object.create({});

        Injector.initialize = function (module) {
            if (jock.utils.verifiedType(module, jock.ioc.Module)) {
                module.initialize();
                this._modules.push(module);
            }
            return module;
        };
        Injector.clearAll = function () {
            this._map.length = 0;
            this._scopes.length = 0;
            this._modules.length = 0;
            this._currentScope = jock.option.none();
        };
        Injector.pushScope = function (module) {
            if (jock.utils.verifiedType(module, jock.ioc.Module)) {
                this._currentScope = jock.option.some(module);
                this._scopes.push(module);
            }
            return module;
        };
        Injector.popScope = function () {
            var module = jock.option.none();
            if (this._scopes.length > 0) {
                this._scopes.pop();
                if (this._scopes.length > 0) {
                    var head = this._scopes[this._scopes.length - 1];
                    module = jock.option.some(jock.utils.verifiedType(head, jock.ioc.Module));
                }
            }
            this._currentScope = jock.utils.verifiedType(module, jock.option.Option);
        };
        Injector.currentScope = function () {
            return jock.utils.verifiedType(this._currentScope, jock.option.Option);
        };
        Injector.scopeOf = function (value) {
            var result = jock.option.none();
            var index = this._modules.length;
            while (--index > -1) {
                var module = this._modules[index];
                if (module.binds(value)) {
                    if (result.isDefined) {
                        throw new jock.ioc.errors.BindingError("More than one module binds with the value");
                    }

                    result = jock.option.some(module);
                }
            }

            if (result.isEmpty) {
                throw new jock.ioc.errors.BindingError("No binding could be found");
            }

            return result;
        };
        Injector.moduleOf = function (value) {
            var possibleResult = findByType(this._map, value);

            if (possibleResult.isDefined)
                return possibleResult.get;

            var index = this._modules.length;
            while (--index > -1) {
                var module = this._modules[index];
                if (module instanceof value) {
                    this._map.push(Node(value, module));
                    return jock.option.some(module);
                }
            }

            return jock.option.none();
        };

        return function () {
            var instance = Object.create(Injector);

            instance._map = [];
            instance._scopes = [];
            instance._modules = [];
            instance._currentScope = jock.option.none();

            return Object.freeze(instance);
        }
    })()
});

// Note (Simon) we do this like this, because we're using the newly created injector.
jock.bundle("jock.ioc", {
    Injectors:{
        DEFAULT:jock.ioc.Injector()
    }
});