jock.package("jock.template.tokens", {
    Token:(function () {
        "use strict";

        var Impl = function (value, string, params) {
            this.value = value;
            this.string = string;
            this.params = params;
        };

        return Impl;
    })()
});
