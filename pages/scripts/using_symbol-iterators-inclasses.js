
//from: https://stackoverflow.com/questions/28739745/how-to-make-an-iterator-out-of-an-es6-class
class Matrix {
    constructor() {
        this.matrix = [[1, 2, 9],
                       [5, 3, 8],
                       [4, 6, 7]];
    }

    *[Symbol.iterator]() {
        for (let row of this.matrix) {
            for (let cell of row) {
                yield cell;
            }
        }
    }
}

 
//usage:
let matrix = new Matrix();

for (let cell of matrix) {
    console.log(cell)
} 