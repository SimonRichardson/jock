jock.package("jock.template.tokens", {
    TemplateRegExp:(function () {
        "use strict";

        var Impl = function (expression) {
            this.expression = new RegExp(expression);
        };
        Impl.prototype = {};
        Impl.prototype.name = "TemplateRegExp";

        var Methods = {
            matchedPos:function () {
                if (!this._matched) throw new Error("No string matched");
                return {pos:this._matched.index, len:this._matched[0].length};
            },
            matchedRight:function () {
                if (!this._matched) throw new Error("No string matched");
                var pos = this._matched.index + this._matched[0].length;
                return this._matchedString.substr(pos, this._matchedString.length - pos);
            },
            matched:function (index) {
                if (this._matched !== null && index >= 0 && index < this._matched.length)
                    return this._matched[index];
                else throw new Error("Invalid index");
            },
            match:function (string) {
                this._matched = this.expression.exec(string);
                this._matchedString = string;
                return this._matched !== null;
            }
        };

        return jock.extend(Impl, Methods);
    })()
});