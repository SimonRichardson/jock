jock.bundle("jock.ioc", {
    InjectionPoint:(function () {
        "use strict";

        var InjectionPoint = Object.create({});

        return function (value) {
            var instance = Object.create(InjectionPoint, {
                get:{
                    get:function () {
                        return this.intercept.get;
                    },
                    configurable:false
                },
                intercept:{
                    get:function () {
                        if (typeof this._aspect === "undefined") {
                            this._aspect = jock.aop.Aspect(value);
                        }
                        return this._aspect;
                    },
                    configurable:false
                }
            });

            return Object.freeze(instance);
        }
    })()
});