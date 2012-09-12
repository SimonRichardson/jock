jock.bundle("jock.template", {
    parser:(function () {

        var lexer = jock.template.lexer,
            TemplateRegExp = jock.template.TemplateRegExp,
            TemplateError = jock.template.errors.TemplateError,
            ExpressionToken = jock.template.tokens.ExpressionToken;

        var Expr = jock.enumeration({
            OpBlock:[Array],
            OpExpr:[Function],
            OpForeach:[Function, Object],
            OpIf:[Function, Object, Object],
            OpMacro:[String, Array],
            OpStr:[String],
            OpVar:[String]
        });

        var expr_splitter = new TemplateRegExp("(\\(|\\)|[ \r\n\t]*\"[^\"]*\"[ \r\n\t]*|[!+=/><*.&|-]+)");

        var Impl = function () {
            this.init.apply(this, arguments);
        };
        Impl.prototype = {};

        var Methods = {
            init:function (makeExpr) {
                this.makeExpr = makeExpr;
            },
            parseBlock:function (tokens) {
                var blocks = [];
                while (true) {
                    var token = tokens[0];

                    if (!token)
                        break;

                    var value = token.value;
                    if (!token.string && (value == "end" || value == "else" || value.substr(0, 7) == "elseif "))
                        break;

                    blocks.push(this.parse(tokens));
                }

                if (blocks.length == 1) return blocks[0];
                else return Expr.OpBlock(blocks);
            },
            parseExpr:function (data) {
                var expressions = [];
                var expr = data;
                while (expr_splitter.match(data)) {
                    var position = expr_splitter.matchedPos();
                    if (position.pos !== 0)
                        expressions.push(new ExpressionToken(data.substr(0, position.pos), true));

                    position = expr_splitter.matched(0);
                    expressions.push(new ExpressionToken(position, position.indexOf('"') >= 0));
                    data = expr_splitter.matchedRight();
                }

                if (data.length !== 0)
                    expressions.push(new ExpressionToken(data, true));

                var expression;
                try {
                    expression = this.makeExpr(expressions);

                    if (!expression || expressions.length !== 0)
                        throw new TemplateError(expressions[0].value);

                } catch (e) {
                    if (e instanceof TemplateError)
                        throw new TemplateError("Unexpected '" + e.message + "' in " + expr);
                    else
                        throw e;
                }

                return function () {
                    try {
                        return expression();
                    } catch (e) {
                        throw new TemplateError("Error : " + e.message + " in " + expr);
                    }
                };
            },
            parse:function (tokens) {
                var expr,
                    head,
                    token = tokens.shift();

                var p = token.value;

                if (token.string)
                    return Expr.OpStr(p);

                if (token.params !== null) {
                    var macroItems = [];
                    for (var i in token.params) {
                        macroItems.push(this.parseBlock(lexer(token.params[i])));
                    }
                    return Expr.OpMacro(p, macroItems);
                }

                if (p.substr(0, 3) == "if ") {
                    p = p.substr(3, p.length - 3);
                    expr = this.parseExpr(p);

                    var exprElse,
                        exprIf = this.parseBlock(tokens);

                    head = tokens[0];
                    if (!head)
                        throw new TemplateError("Unclosed 'if'");

                    if (head.value == "end") {
                        tokens.shift();
                        exprElse = null;
                    } else if (head.value == "else") {
                        tokens.shift();
                        exprElse = this.parseBlock(tokens);
                        head = tokens.shift();

                        if (!head || head.value !== "end")
                            throw new TemplateError("Unclosed 'else'");

                    } else {
                        head.value = head.value.substr(4, head.value.length - 4);
                        exprElse = this.parse(tokens);
                    }

                    return Expr.OpIf(expr, exprIf, exprElse);
                }

                if (p.substr(0, 8) == "foreach ") {
                    p = p.substr(8, p.length - 8);

                    expr = this.parseExpr(p);

                    var exprFor = this.parseBlock(tokens);
                    head = tokens.shift();
                    if (!head || head.value !== "end")
                        throw new TemplateError("Unclosed 'foreach'");

                    return Expr.OpForeach(expr, exprFor);
                }

                if (expr_splitter.match(p))
                    return Expr.OpExpr(this.parseExpr(p));

                return Expr.OpVar(p);
            }
        };

        Impl = jock.extend(Impl, Methods);

        return function (tokens, makeExpr) {
            return new Impl(makeExpr).parseBlock(tokens);
        };
    })()
});