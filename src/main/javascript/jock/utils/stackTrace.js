jock.bundle("jock.utils", {
    stackTrace:function () {
        var mode = function (e) {
            if (e['arguments'] && e.stack)
                return 'chrome';
            else if (e.stack)
                return 'firefox';
            return 'other';
        };

        var createException = function () {
            try {
                this.undef();
            } catch (e) {
                return e;
            }
        };

        var ex = createException();
        var result = "";

        // (Simon) : Code bellow is from https://github.com/eriwen/javascript-stacktrace/blob/master/stacktrace.js
        switch (mode(ex)) {
            case "chrome":
                var stack = (ex.stack + '\n').replace(/^\S[^\(]+?[\n$]/gm, '').
                    replace(/^\s+(at eval )?at\s+/gm, '').
                    replace(/^([^\(]+?)([\n$])/gm, '{anonymous}()@$1$2').
                    replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, '{anonymous}()@$1').split('\n');
                stack.shift();
                stack.pop();
                result = stack.join("\n\r");
                break;

            case "firefox":
                result = ex.stack.replace(/(?:\n@:0)?\s+$/m, '').replace(/^\(/gm, '{anonymous}(').split('\n');
                break;
        }

        return result;
    }
});