jock.bundle("jock.template.tokens", {
    ExpressionToken:(function () {
        "use strict";

        var Impl = function ExpressionToken(value, string) {
            this.value = value;
            this.string = string;
        };

        return Impl;
    })()
});