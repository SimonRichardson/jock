jock.event = jock.event || {};
jock.event.Observer = (function () {
    "use strict";

    // TODO (Simon) : Implement ObserverNodePool to help with memory.

    var ObserverNode = function () {
        this.init.apply(this, arguments);
    };
    ObserverNode.prototype = {
        init:function (observer, mask) {
            this.observer = observer;
            this.mask = mask;
        },
        dispose:function () {
            this.observer = null;
        }
    };

    // NOTE (Simon) : This is a private static method, to prevent overriding.
    var find = function (observers, observer) {
        var result = null;

        var index = observers.length;
        while (--index > -1) {
            var node = observers[index];
            if (node.observer === observer) {
                result = node;
                break;
            }
        }

        return result;
    };

    var ObserverImpl = function () {
        this.init.apply(this, arguments);
    };
    ObserverImpl.prototype = {
        name:"Observer",
        init:function () {
            this._observers = [];
            this._blackList = 0;
        },
        clear:function () {
            var index = this._observers.length;
            while (--index > -1) {
                var node = this._observers.pop();
                node.dispose();
            }
        },
        attach:function (observer, mask) {
            if (mask < 0) throw new Error("Mask can not be less than zero.");

            // TODO (Simon) : Implement Option type so we don't have to deal with null.
            var node = find(this._observers, observer);

            if (node) node.mask |= mask;
            else this._observers.push(new ObserverNode(observer, mask));
        },
        dettach:function (observer, mask) {
            if (mask < 0) throw new Error("Mask can not be less than zero.");

            var index = this._observers.length;
            while (--index > -1) {
                var node = this._observers[index];
                if(node.observer === observer){
                    if ((node.mask & mask) > 0) {
                        node.mask &= ~mask;
                    }

                    if (node.mask == 0) {
                        // Note (Simon) : Instead of dispose, place back into the pool.
                        var nodes = this._observers.splice(index, 1);
                        nodes.pop().dispose();
                    }
                    break;
                }
            }
        },
        notify:function (mask) {
            if (mask < 0) throw new Error("Mask can not be less than zero.");

            if ((this._blackList & mask) > 0) return;

            var index = this._observers.length;
            while (--index > -1) {
                var node = this._observers[index];
                if (mask == 0 || (node.mask & mask) > 0) {
                    node.observer();
                }
            }
        },
        mute:function (mask) {
            this._blackList |= mask;
        },
        unmute:function (mask) {
            this._blackList &= ~mask;
        },
        size:function () {
            return this._observers.length;
        }
    };
    return ObserverImpl;
}).call(this);