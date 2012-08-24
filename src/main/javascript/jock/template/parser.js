jock.template = jock.template || {};
jock.template.parser = (function(){

    var TemplateRegExp = jock.template.TemplateRegExp,
        TemplateError = jock.template.errors.TemplateError,
        ExpressionToken = jock.template.tokens.ExpressionToken;

    var OpBlock = jock.template.expressions.OpBlock,
        OpExpr =  jock.template.expressions.OpExpr,
        OpForeach =  jock.template.expressions.OpForeach,
        OpIf =  jock.template.expressions.OpIf,
        OpMacro =  jock.template.expressions.OpMacro,
        OpStr =  jock.template.expressions.OpStr,
        OpVar =  jock.template.expressions.OpVar;

    var expr_splitter = new TemplateRegExp("(\\(|\\)|[ \r\n\t]*\"[^\"]*\"[ \r\n\t]*|[!+=/><*.&|-]+)");

    var Impl = function(){
    };
    Impl.prototype = {};
    Impl.prototype.name = "Parser";

    var Methods = {
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

                if (expressions.length !== 0)
                    throw new TemplateError(expressions[0].p);
            } catch (e) {
                throw new TemplateError("Unexpected '" + e.message + "' in " + expr);
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
                    throw new TemplateError("Unclosed 'if'");

                if (head.p == "end") {
                    tokens.shift();
                    exprElse = null;
                } else if (head.p == "else") {
                    tokens.shift();
                    exprElse = this.parseBlock(tokens);
                    head = tokens.shift();

                    if (!head || head.p !== "end")
                        throw new TemplateError("Unclosed 'else'");

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
                    throw new TemplateError("Unclosed 'foreach'");

                return new OpForeach(expr, exprFor);
            }

            if (expr_splitter.match(p))
                return new OpExpr(this.parseExpr(p));

            return new OpVar(p);
        }
    };

    Impl = jock.utils.extend(Impl, Methods);

    return function(tokens){
        return new Impl().parseBlock(tokens);
    };
}).call(this);