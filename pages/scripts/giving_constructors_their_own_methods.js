/*
try giving a class instances their own methods.

TODO:
    be cognizant about iterable methods. Sometimes, those shouldn't be exposed.
    for...in shouldn't print out some methods
*/

class PlainClothesClass {
    constructor(controlParam) {
        this._result;
        this._assignedParam = controlParam;
        this.insideMe();
    }
    insideMe() {
        var result = "list out some method..." + this._assignedParam;
        this.result = result;
        console.log("here's the PlainClothesClass " + this.result);
    }
}

var something = new PlainClothesClass(23);
var something2 = new PlainClothesClass(12);
var something3 = new PlainClothesClass(28);

console.log(something, something2, something3);
