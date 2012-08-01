jock.controller = jock.controller || {};
jock.controller.Command = (function () {
    var CommandImpl = function () {
    };
    CommandImpl.prototype = {
        execute: function(){
        }
        // TODO (Simon) : Implements injects and intercepts.
    };
    CommandImpl.extend = function (func) {
        if(!func) throw new Error("Function can not be null");
        if(typeof func !== "function") throw new Error("Argument must be a function");

        // (Simon) : Copy everything from the passed method to the new Command.
        var i,
            p = {};

        for(i in func.prototype) p[i] = func.prototype[i];

        var command = func;
        command.prototype = new CommandImpl();
        command.prototype.constructor = func;

        for(i in p) command.prototype[i] = p[i];

        return command;
    };
    return CommandImpl;
})();