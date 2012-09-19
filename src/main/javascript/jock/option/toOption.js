jock.bundle("jock.option", {
    toOption:function (value) {
        "use strict";

        if(typeof value === "undefined" || value === null) {
            return jock.option.none();
        }
        return jock.option.some(value);
    }
});