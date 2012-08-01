describe("Observer", function() {
    var observer;

    beforeEach(function(){
        observer = new jock.event.Observer();
    });

    it("should have no observables", function(){
        expect(observer.size()).toBe(0);
    });

    it("should not accept negative mask in attach", function(){
        expect(function(){
            observer.attach(function(){}, -1);
        }).toThrow("Mask can not be less than zero.");
    });

    it("should attach an observable and have size of 1", function(){
        observer.attach(function(){
        }, 1);

        expect(observer.size()).toBe(1);
    });

    it("should attach an observable with multiple masks and have a size of 1", function(){
        observer.attach(function(){
        }, 1 | 2);

        expect(observer.size()).toBe(1);
    });

    it("should attach two observables and have size of 2", function(){
        observer.attach(function(){
        }, 1);
        observer.attach(function(){
        }, 1);

        expect(observer.size()).toBe(2);
    });

    it("should not accept negative mask in dettach", function(){
        expect(function(){
            observer.dettach(function(){}, -1);
        }).toThrow("Mask can not be less than zero.");
    });

    it("should calling dettach on empty observable", function(){
        observer.dettach(function(){
        }, 0);

        expect(observer.size()).toBe(0);
    });

    it("should dettach an observable with correct mask", function(){
        var observable;
        observer.attach(observable = function(){
        }, 1);
        observer.dettach(observable, 1);

        expect(observer.size()).toBe(0);
    });

    it("should not dettach an observable with incorrect mask", function(){
        var observable;
        observer.attach(observable = function(){
        }, 1);
        observer.dettach(observable, 2);

        expect(observer.size()).toBe(1);
    });

    it("should dettach both attached commands using the all mask and size should be 0", function(){
        var observable;
        observer.attach(observable = function(){
        }, 1);
        observer.attach(observable, 2);
        observer.dettach(observable, 1 | 2);

        expect(observer.size()).toBe(0);
    });

    it("should not accept negative mask in notify", function(){
        expect(function(){
            observer.notify(-1);
        }).toThrow("Mask can not be less than zero.");
    });

    it("should notify an observable once it's been added with correct mask", function(){
        var called = false;
        observer.attach(function(){
            called = true;
        }, 1);
        observer.notify(1);

        expect(called).toBeTruthy();
    });

    it("should not notify an observable if sent with incorrect mask", function(){
        var called = false;
        observer.attach(function(){
            called = true;
        }, 1);
        observer.notify(2);

        expect(called).toBeFalsy();
    });

    it("should notify an observable if attached with multiple masks", function(){
        var called = false;
        observer.attach(function(){
            called = true;
        }, 1 | 2);
        observer.notify(2);

        expect(called).toBeTruthy();
    });

    it("calling mute should prevent observer with correct mask", function(){
        var called = false;
        observer.attach(function(){
            called = true;
        }, 1);

        observer.mute(1);
        observer.notify(1);

        expect(called).toBeFalsy();
    });

    it("calling mute & unmute should call observer with correct mask", function(){
        var called = false;
        observer.attach(function(){
            called = true;
        }, 1);

        observer.mute(1);
        observer.unmute(1);
        observer.notify(1);

        expect(called).toBeTruthy();
    });

    it("should calling attach with same observable & mask have size of 1", function(){
        var observable = function(){
        };

        observer.attach(observable, 1);
        observer.attach(observable, 1);

        expect(observer.size()).toBe(1);
    });

    it("should calling attach with same observable & different mask have size of 1", function(){
        var observable = function(){
        };

        observer.attach(observable, 1);
        observer.attach(observable, 2);

        expect(observer.size()).toBe(1);
    });

    it("should calling attach with same observable & mask, calling same mask, should call observable once", function(){
        var calledNum = 0;
        var observable = function(){
            calledNum++;
        };

        observer.attach(observable, 1);
        observer.attach(observable, 1);
        observer.notify(1);

        expect(calledNum).toBe(1);
    });

    it("should calling attach with same observable & different mask, calling first mask, should call observable once", function(){
        var calledNum = 0;
        var observable = function(){
            calledNum++;
        };

        observer.attach(observable, 1);
        observer.attach(observable, 2);
        observer.notify(1);

        expect(calledNum).toBe(1);
    });

    it("should calling attach with same observable & different mask, calling both masks, should call observable once", function(){
        var calledNum = 0;
        var observable = function(){
            calledNum++;
        };

        observer.attach(observable, 1);
        observer.attach(observable, 2);
        observer.notify(1 | 2);

        expect(calledNum).toBe(1);
    });

    it("should calling attach with two observables, calling both masks, should call observable twice", function(){
        var calledNum = 0;

        observer.attach(function(){
            calledNum++;
        }, 1);
        observer.attach(function(){
            calledNum++;
        }, 2);
        observer.notify(1 | 2);

        expect(calledNum).toBe(2);
    });

    it("should calling attach with two observables, call all mask should call observables", function(){
        var calledNum = 0;

        observer.attach(function(){
            calledNum++;
        }, 1);
        observer.attach(function(){
            calledNum++;
        }, 2);
        observer.notify(0);

        expect(calledNum).toBe(2);
    });

    it("should calling clear, remove all the observables", function(){
        observer.attach(function(){}, 1);
        observer.attach(function(){}, 2);
        observer.clear();

        expect(observer.size()).toBe(0);
    });

    it("should calling dettach with a different observable should have size of 1", function(){
        var a = function(){};
        var b = function(){};
        observer.attach(a, 1);
        observer.dettach(b, 1);

        expect(observer.size()).toBe(1);
    });
});