jock.bundle("jock.utils", {
    eq:function (a, b) {
        "use strict";

        if( typeof a === 'undefined' || a === null ||
            typeof b === 'undefined' || b === null) {

            return a === b;
        } else if(typeof a.equals !== 'undefined' && typeof b.equals !== 'undefined') {

            return a.equals(b);
        }

        return a === b;
    }
});