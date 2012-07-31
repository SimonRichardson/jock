"use strict";

var jock = jock || {};
jock.Jock = (function(){
    var JockImpl = function(){
        this.init.apply(this, arguments);
    };
    JockImpl.prototype = {
        VERSION: "0.0.1",
        init: function(){

        }
    }
    return JockImpl;
})();