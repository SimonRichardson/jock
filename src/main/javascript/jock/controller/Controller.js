jock.controller = jock.controller || {};
jock.controller.Controller = (function () {
    "use strict";

    var ControllerNode = function () {
        this.init.apply(this, arguments);
    };
    ControllerNode.prototype = {
        init:function (command, mask) {
            this.command = command;
            this.mask = mask;
        },
        dispose:function () {
            this.command = null;
        }
    };

    // NOTE (Simon) : This is a private static method, to prevent overriding.
    var find = function (commands, command) {
        var result = null;

        var index = commands.length;
        while (--index > -1) {
            var node = commands[index];
            if (node.command === command) {
                result = node;
                break;
            }
        }

        return result;
    };

    var ControllerImpl = function () {
        this.init.apply(this, arguments);
    };
    ControllerImpl.prototype = {
        name:"Controller",
        init:function () {
            this._commands = [];
        },
        add:function (command, mask) {
            if (!(command.prototype instanceof jock.controller.Command)) {
                throw new Error("Command should be an instance of jock.controller.Command");
            }

            // TODO (Simon) : Implement Option type so we don't have to deal with null.
            var node = find(this._commands, command);

            if (node) node.mask |= mask;
            else this._commands.push(new ControllerNode(command, mask));
        },
        remove:function (command, mask) {
            var index = this._commands.length;

            while (--index > -1) {
                var node = this._commands[index];
                if(node.command === command){
                    if ((node.mask & mask) > 0) {
                        node.mask &= ~mask;
                    }

                    if (node.mask == 0) {
                        // Note (Simon) : Instead of dispose, place back into the pool.
                        var nodes = this._commands.splice(index, 1);
                        nodes.pop().dispose();
                    }
                    break;
                }
            }
        },
        size:function () {
            return this._commands.length;
        }
    };
    return ControllerImpl;
})();