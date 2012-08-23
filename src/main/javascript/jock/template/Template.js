jock.template = jock.template || {};
jock.template.Template = (function () {
    "use strict";

    var RegularExpression = function (expression) {
        this.expression = new RegExp(expression);
    };
    RegularExpression.prototype = {
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

    var StringBuffer = function () {
        this._value = "";
    };
    StringBuffer.prototype = {
        add:function (value) {
            this._value += value.toString();
        },
        toString:function () {
            return this._value.toString();
        }
    };

    var Token = function (p, s, l) {
        this.p = p;
        this.s = s;
        this.l = l;
    };

    var ExprToken = function (p, s) {
        this.p = p;
        this.s = s;
    };

    var ExpressionType = {
        VAR:1,
        EXPR:2,
        IF:3,
        STR:4,
        BLOCK:5,
        FOREACH:6,
        MACRO:7
    };

    var OpVar = function (variable) {
        this.variable = variable;
        this.type = ExpressionType.VAR;
    };
    var OpExpr = function (expression) {
        this.expression = expression;
        this.type = ExpressionType.EXPR;
    };
    var OpIf = function (expresion, exprIf, exprElse) {
        this.expression = expresion;
        this.exprIf = exprIf;
        this.exprElse = exprElse;
        this.type = ExpressionType.IF;
    };
    var OpStr = function (string) {
        this.string = string;
        this.type = ExpressionType.STR;
    };
    var OpBlock = function (block) {
        this.block = block;
        this.type = ExpressionType.BLOCK;
    };
    var OpForeach = function (expression, loop) {
        this.expression = expression;
        this.loop = loop;
        this.type = ExpressionType.FOREACH;
    };
    var OpMacro = function (name, params) {
        this.name = name;
        this.params = params;
        this.type = ExpressionType.MACRO;
    };

    var splitter = new RegularExpression("(::[A-Za-z0-9_ ()&|!+=/><*.\"-]+::|\\$\\$([A-Za-z0-9_-]+)\\()");
    var expr_splitter = new RegularExpression("(\\(|\\)|[ \r\n\t]*\"[^\"]*\"[ \r\n\t]*|[!+=/><*.&|-]+)");
    var expr_trim = new RegularExpression("^[ ]*([^ ]+)[ ]*$");
    var expr_int = new RegularExpression("^[0-9]+$");
    var expr_float = new RegularExpression("^([+-]?)(?=\\d|,\\d)\\d*(,\\d*)?([Ee]([+-]?\\d+))?$");

    var Impl = function () {
        this.init.apply(this, arguments);
    };
    Impl.prototype = {};
    Impl.prototype.name = "Template";

    var Methods = {
        init:function (str) {
            var tokens = this.parseTokens(str);
            this.expressions = this.parseBlock(tokens);

            if (tokens.length !== 0)
                throw new Error("Unexpected '" + tokens[0].string + "'");
        },
        execute:function (context, macros) {
            this.context = context;
            this.macros = macros ? macros : {};

            this.stack = [];
            this.globals = {};
            this.buffer = new StringBuffer();

            this.run(this.expressions);

            return this.buffer.toString();
        },
        resolve:function (value) {
            if (!!this.context[value])
                return this.context[value];

            for (var i in this.stack) {
                var context = this.stack[i];
                if (!!context[value])
                    return context[value];
            }

            if (value == "__current__")
                return this.context;

            return this.globals[value];
        },
        parseTokens:function (data) {
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
                        throw new Error("Unclosed macro parenthesis");
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
        },
        parseBlock:function (tokens) {
            var blocks = [];
            while (true) {
                var token = tokens[0];

                if (!token || (!token.s && (token.p == "end" || token.p == "else" || token.p.substr(0, 7) == "elseif ")))
                    break;

                blocks.push(this.parse(tokens));
            }

            if (blocks.length == 1) return blocks[0];
            else return new OpBlock(blocks);
        },
        parseExpr:function (data) {
            var expressions = [];
            var expr = data;
            while (expr_splitter.match(data)) {
                var position = expr_splitter.matchedPos();
                if (position.pos !== 0)
                    expressions.push(new ExprToken(data.substr(0, position.pos), true));

                position = expr_splitter.matched(0);
                expressions.push(new ExprToken(position, position.indexOf('"') >= 0));
                data = expr_splitter.matchedRight();
            }

            if (data.length !== 0)
                expressions.push(new ExprToken(data, true));

            var expression;
            try {
                expression = this.makeExpr(expressions);

                if (expressions.length !== 0)
                    throw new Error(expressions[0].p);
            } catch (e) {
                throw new Error("Unexpected '" + e.message + "' in " + expr);
            }

            return function () {
                try {
                    return expression();
                } catch (e) {
                    throw new Error("Error : " + e.message + " in " + expr);
                }
            };
        },
        parse:function (tokens) {
            var expr,
                head,
                token = tokens.shift();

            var p = token.p;

            if (token.s)
                return new OpStr(p);

            if (token.l !== null) {
                var macroItems = [];
                for (var i in token.l) {
                    macroItems.push(this.parseBlock(this.parseTokens(i)));
                }
                return new OpMacro(p, macroItems);
            }

            if (p.substr(0, 3) == "if ") {
                p = p.substr(3, p.length - 3);
                expr = this.parseExpr(p);

                var exprElse,
                    exprIf = this.parseBlock(tokens);

                head = tokens[0];
                if (!head)
                    throw new Error("Unclosed 'if'");

                if (head.p == "end") {
                    tokens.shift();
                    exprElse = null;
                } else if (head.p == "else") {
                    tokens.shift();
                    exprElse = this.parseBlock(tokens);
                    head = tokens.shift();

                    if (!head || head.p !== "end")
                        throw new Error("Unclosed 'else'");
                } else {
                    head.p = head.p.substr(4, head.p.length - 4);
                    exprElse = this.parse(tokens);
                }

                return new OpIf(expr, exprIf, exprElse);
            }

            if (p.substr(0, 8) == "foreach ") {
                p = p.substr(8, p.length - 8);

                expr = this.parseExpr(p);

                var exprFor = this.parseBlock(tokens);
                head = tokens.shift();
                if (!head || head.p !== "end")
                    throw new Error("Unclosed 'foreach'");
                return new OpForeach(expr, exprFor);
            }

            if (expr_splitter.match(p))
                return new OpExpr(this.parseExpr(p));

            return new OpVar(p);
        },
        makePath:function (fun, list) {
            var token = list[0];
            if (!token || token.p !== ".") return fun;

            list.shift();

            var field = list.shift();
            if (!field || !field.s)
                throw new Error(field.p);

            var accessor = field.p;
            expr_trim.match(accessor);
            accessor = expr_trim.matched(1);
            return this.makePath(function () {
                return fun()[accessor];
            }, list);
        },
        makeConst:function (value) {
            expr_trim.match(value);
            value = expr_trim.matched(1);
            if (value.charCodeAt(0) == 34) {
                var str = value.substr(1, value.length - 2);
                return function () {
                    return str;
                };
            }
            if (expr_int.match(value)) {
                var integer = parseInt(value, 16);
                return function () {
                    return integer;
                };
            }
            if (expr_float.match(value)) {
                var float = parseFloat(value);
                return function () {
                    return float;
                };
            }
            var scope = this;
            return function () {
                return scope.resolve(value);
            };
        },
        makeExpr:function (list) {
            return this.makePath(this.makeExpr2(list), list);
        },
        makeExpr2:function (list) {
            var expr,
                p = list.shift();

            if (!p)
                throw new Error("<eof>");
            if (p.s)
                return this.makeConst(p.p);

            switch (p.p) {
                case "(":
                    var e1 = this.makeExpr(list);
                    var p1 = list.shift();

                    if (!p1 || p.s)
                        throw new Error(p.p);

                    if (p.p == ")")
                        return e1;

                    var e2 = this.makeExpr(list);
                    var p2 = list.shift();

                    if (!p2 || p2.p !== ")")
                        throw new Error(p2.p);

                    return (function () {
                        var result;
                        switch (p1.p) {
                            case "+":
                                result = function () {
                                    return e1() + e2();
                                };
                                break;
                            case "-":
                                result = function () {
                                    return e1() - e2();
                                };
                                break;
                            case "*":
                                result = function () {
                                    return e1() * e2();
                                };
                                break;
                            case "/":
                                result = function () {
                                    return e1() / e2();
                                };
                                break;
                            case ">":
                                result = function () {
                                    return e1() > e2();
                                };
                                break;
                            case "<":
                                result = function () {
                                    return e1() < e2();
                                };
                                break;
                            case ">=":
                                result = function () {
                                    return e1() >= e2();
                                };
                                break;
                            case "<=":
                                result = function () {
                                    return e1() <= e2();
                                };
                                break;
                            case "==":
                                result = function () {
                                    return e1() == e2();
                                };
                                break;
                            case "!=":
                                result = function () {
                                    return e1() != e2();
                                };
                                break;
                            case "&&":
                                result = function () {
                                    return e1() && e2();
                                };
                                break;
                            case "||":
                                result = function () {
                                    return e1() || e2();
                                };
                                break;
                            default:
                                throw new Error("Unknown operation " + p.p);
                        }
                        return result;
                    })();

                case "!":
                    expr = this.makeExpr(list);
                    return function () {
                        var result = expr();
                        return !result;
                    };

                case "-":
                    expr = this.makeExpr(list);
                    return function () {
                        return -expr();
                    };

                default:
                    throw new Error(p.p);
            }
        },
        run:function (expression) {
            switch (expression.type) {
                case ExpressionType.VAR:
                    this.buffer.add(this.resolve(expression.variable));
                    break;
                case ExpressionType.EXPR:
                    this.buffer.add(expression.expression());
                    break;
                case ExpressionType.IF:
                    var value = expression.expression();
                    if (!value) {
                        if (expression.exprElse !== null)
                            this.run(expression.exprElse);
                    } else {
                        this.run(expression.exprIf);
                    }
                    break;
                case ExpressionType.STR:
                    this.buffer.add(expression.string);
                    break;
                case ExpressionType.BLOCK:
                    for (var b in expression.block) {
                        var block = expression.block[b];
                        this.run(block);
                    }
                    break;
                case ExpressionType.FOREACH:
                    var exprValue = expression.expression();

                    this.stack.push(this.context);

                    for (var ctx in exprValue) {
                        this.context = exprValue[ctx];
                        this.run(expression.loop);
                    }

                    this.context = this.stack.pop();
                    break;
                case ExpressionType.MACRO:
                    var macroValue = this.macros[expression.name];
                    var list = [];
                    var old = this.buffer;

                    list.push(this.resolve);

                    for (var p in expression.params) {
                        var param = expression.params[p];
                        if (param.type === ExpressionType.VAR)
                            list.push(this.resolve(param.variable));
                        else {
                            this.buffer = new StringBuffer();
                            this.run(param);
                            list.push(this.buffer.toString());
                        }
                    }
                    this.buffer = old;

                    try {
                        this.buffer.add(this.macros[macroValue].apply(this.macros, list));
                    } catch (e) {
                        var possible = !!list ? list.join(",") : "???";
                        throw new Error("Macro call " + expression.name + " (" + possible + ") failed (" + e.message + ")");
                    }
                    break;
                default:
                    throw new Error("Unknown expression type");
            }
        }
    };

    return jock.utils.extend(Impl, Methods);
}).call(this);