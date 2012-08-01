jock.controller = jock.controller || {};
jock.controller.Command = (function () {
    var CommandImpl = function () {
        this.init.apply(this, arguments);
    };
    CommandImpl.prototype = {
        init:function () {
        },
        execute:function () {
        }
    };
    CommandImpl.create = function (methods) {
        if(typeof methods !== "object") throw new Error("Overridden methods can not be null");

        var command = function () {
        };
        command.prototype = new jock.controller.Command();
        command.prototype.constructor = command;
        command.prototype.init = methods.init;
        command.prototype.execute = methods.execute;
        return command;
    }
    return CommandImpl;
})();