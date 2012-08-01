jock.controller = jock.controller || {};
jock.controller.Command = (function () {
    var CommandImpl = function () {
        this.init.apply(this, arguments);
    };
    CommandImpl.prototype = {
        init: function(){

        },
        size: function(){
            return 0;
        }
    };
    return CommandImpl;
})();