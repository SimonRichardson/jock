jock.template = jock.template || {};
jock.template.template = function(partial, context, macros){
    return new jock.template.Template(partial).execute(context, macros);
};
jock.template.Template = (function () {
    "use strict";

    var lexer = jock.template.lexer,
        parser = jock.template.parser,
        OpType = jock.template.expressions.OpType,
        TemplateRegExp = jock.template.TemplateRegExp,
        TemplateError = jock.template.errors.TemplateError;


    var StringBuffer = function () {
        this._value = "";
    };
    StringBuffer.prototype = {
        add:function (value) {
            this._value += value;
        },
        toString:function () {
            return this._value.toString();
        }
    };

    var expr_trim = new TemplateRegExp("^[ ]*([^ ]+)[ ]*$");
    var expr_int = new TemplateRegExp("^[0-9]+$");
    var expr_float = new TemplateRegExp("^([+-]?)(?=\\d|,\\d)\\d*(,\\d*)?([Ee]([+-]?\\d+))?$");

    var Impl = function () {
        this.init.apply(this, arguments);
    };
    Impl.prototype = {};
    Impl.prototype.name = "Template";

    var Methods = {
        init:function (str) {
            this.globals = {};

            var tokens = lexer(str);

            var scope = this;
            this.expressions = parser(tokens, function (list) {
                return scope.makeExpr(list);
            });

            if (tokens.length !== 0)
                throw new TemplateError("Unexpected '" + tokens[0].string + "'");
        },
        execute:function (context, macros) {
            this.context = context;
            this.macros = macros ? macros : {};

            this.stack = [];
            this.buffer = new StringBuffer();

            this.run(this.expressions);

            return this.buffer.toString();
        },
        run:function (expression) {
            switch (expression.getType()) {
                case OpType.VAR:
                    this.buffer.add(this.resolve(expression.variable));
                    break;

                case OpType.EXPR:
                    this.buffer.add(expression.expression());
                    break;

                case OpType.IF:
                    var value = expression.expression();
                    if (!value) {
                        if (expression.exprElse !== null)
                            this.run(expression.exprElse);
                    } else {
                        this.run(expression.exprIf);
                    }
                    break;

                case OpType.STR:
                    this.buffer.add(expression.string);
                    break;

                case OpType.BLOCK:
                    for (var b in expression.block) {
                        var block = expression.block[b];
                        this.run(block);
                    }
                    break;

                case OpType.FOREACH:
                    var exprValue = expression.expression();

                    this.stack.push(this.context);

                    for (var ctx in exprValue) {
                        this.context = exprValue[ctx];
                        this.run(expression.loop);
                    }

                    this.context = this.stack.pop();
                    break;

                case OpType.MACRO:
                    var macroValue = this.macros[expression.name];
                    var args = [];
                    var old = this.buffer;

                    var scope = this;
                    args.push(function(value){
                        return scope.resolve(value);
                    });

                    for (var p in expression.params) {
                        var param = expression.params[p];

                        if (param.getType() === OpType.VAR)
                            args.push(this.resolve(param.variable));
                        else {
                            this.buffer = new StringBuffer();
                            this.run(param);

                            args.push(this.buffer.toString());
                        }
                    }
                    this.buffer = old;

                    try {
                        this.buffer.add(macroValue.apply(this, args));
                    } catch (e) {
                        var possible = !!args ? args.join(",") : "???";
                        throw new TemplateError("Macro call " + expression.name + " (" + possible + ") failed (" + e + ")");
                    }
                    break;

                default:
                    throw new TemplateError("Unknown expression type");
            }
        },
        resolve:function (value) {
            if (this.context[value] !== null && this.context[value] !== undefined)
                return this.context[value];

            for (var i in this.stack) {
                var context = this.stack[i];
                if (context[value] !== null && context[value] !== undefined)
                    return context[value];
            }

            if (value == "__current__")
                return this.context;

            return this.globals[value];
        },
        makePath:function (fun, list) {
            var token = list[0];
            if (!token || token.value !== ".") return fun;

            list.shift();

            var field = list.shift();
            if (!field || !field.string)
                throw new TemplateError(field.value);

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
                var integer = parseInt(value, 10);
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
                throw new TemplateError("<eof>");
            if (p.string)
                return this.makeConst(p.value);

            switch (p.value) {
                case "(":
                    var e1 = this.makeExpr(list);
                    var p1 = list.shift();

                    if (!p1 || p.string)
                        throw new Error(p.value);

                    if (p.value == ")")
                        return e1;

                    var e2 = this.makeExpr(list);
                    var p2 = list.shift();

                    if (!p2 || p2.value !== ")")
                        throw new TemplateError(p2.value);

                    return (function () {
                        var result;
                        switch (p1.value) {
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
                                throw new TemplateError("Unknown operation " + p.value);
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
                    throw new TemplateError(p.value);
            }
        }
    };

    return jock.utils.extend(Impl, Methods);
}).call(this);