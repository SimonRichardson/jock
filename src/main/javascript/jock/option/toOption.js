jock.bundle("jock.option", {
    toOption:function (value) {
        "use strict";

        if(jock.utils.isType(value, jock.option.Option)) {
            return value;
        } else if(typeof value === "undefined" || value === null) {
            return jock.option.none();
        } else {
            return jock.option.some(value);
        }
    }
});