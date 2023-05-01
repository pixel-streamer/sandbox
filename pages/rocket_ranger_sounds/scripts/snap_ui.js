/* 
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ CLASSES FOR SNAP UI ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
*/
class SpecialPoint extends Number {
    //TODO: SNAP-TOGETHER UI
    //this should extend createjs Points
    constructor() {
        super();
        this.SpecialNode = null;
        this._tl = null;
        this._tr = null;
        this._bl = null;
        this._br = null;
        this._top = null;
        this._right = null;
        this._bottom = null;
        this._left = null;
    }
    doSomething = function (param) {
        return param; //as Number to do something with later
    };
}
Object.defineProperty(SpecialPoint.prototype, "vector", {
    get: function () {
        //vector = ?; I'm not sure how this is a bit of extra info yet
        return vector;
    },
    set: function (param) {
        vector = param;
    },
    configurable: true,
});
Object.defineProperty(SpecialPoint.prototype, "_tl", {
    get: function () {
        //_tl = true (top, left)
        return _tl;
    },
    set: function (param) {
        _tl = param;
        this._top = true;
        this._left = true;
    },
    configurable: true,
});
Object.defineProperty(SpecialPoint.prototype, "_tr", {
    get: function () {
        //_tr = true (top, right)
        return _tr;
    },
    set: function (param) {
        _tr = param;
        this._top = true;
        this._right = true;
    },
    configurable: true,
});
Object.defineProperty(SpecialPoint.prototype, "_bl", {
    get: function () {
        //_bl = true (bottom, left)
        return _bl;
    },
    set: function (param) {
        _bl = param;
        this._bottom = true;
        this._left = true;
    },
    configurable: true,
});
Object.defineProperty(SpecialPoint.prototype, "_br", {
    get: function () {
        //_br = true (bottom, right)
        return _br;
    },
    set: function (param) {
        _br = param;
        this._right = true;
        this._bottom = true;
    },
    configurable: true,
});
//
/* 
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ END OF CLASSES FOR SNAP UI ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
*/