jock.controller = jock.controller || {};
jock.controller.Controller = (function () {
    var ControllerImpl = function () {
        this.init.apply(this, arguments);
    };
    ControllerImpl.prototype = {
        init: function(){

        },
        size: function(){
            return 0;
        }
    };
    return ControllerImpl;
})();