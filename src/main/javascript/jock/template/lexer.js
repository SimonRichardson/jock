jock.template = jock.template || {};
jock.template.lexer = (function () {
    "use strict";

    var Token = jock.template.tokens.Token,
        TemplateRegExp = jock.template.TemplateRegExp,
        TemplateError = jock.template.errors.TemplateError;

    var splitter = new TemplateRegExp("(::[A-Za-z0-9_ ()&|!+=/><*.\"-]+::|\\$\\$([A-Za-z0-9_-]+)\\()");

    var Impl = function () {
    };
    Impl.prototype = {};
    Impl.prototype.name = "Tokeniser";

    var Methods = {
        execute:function (data) {
            var tokens = [];
            while (splitter.match(data)) {
                var position = splitter.matchedPos();
                if (position.pos > 0)
                    tokens.push(new Token(data.substr(0, position.pos), true, null));

                if (data.charCodeAt(position.pos) == 58) {
                    tokens.push(new Token(data.substr(position.pos + 2, position.len - 4), false, null));
                    data = splitter.matchedRight();
                    continue;
                }

                var offset = position.pos + position.len;
                var index = 1;
                while (index > 0) {
                    var char = data.charCodeAt(offset);
                    if (char === 40) index++;
                    else if (char === 41) index--;
                    else if (!char)
                        throw new TemplateError("Unclosed macro parenthesis");
                    offset++;
                }

                var paramRaw = data.substr(position.pos + position.len, offset - (position.pos + position.len) - 1);
                var params = paramRaw.split(",");

                tokens.push(new Token(splitter.matched(2), false, params));

                data = data.substr(offset, data.length - offset);
            }

            if (data.length > 0)
                tokens.push(new Token(data, true, null));

            return tokens;
        }
    };

    Impl = jock.utils.extend(Impl, Methods);

    return function (data) {
        return new Impl().execute(data);
    }

}).call(this);