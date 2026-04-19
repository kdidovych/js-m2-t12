'use strict';

const MyArray = Array; // @todo discuss
MyArray.prototype.flat = myFlat;
const myArray = new MyArray(0, 1, 2, 3, [], 4, [1, , 2], 5, [1, 2, [3, , , 4]], 6, 7, [1, 2, [3, 4, [5, 6]]], 8, 9, 10, [1, 2, [3, 4, [5, 6, [7, 8]]]]);
console.log(myArray);
console.log(myArray.flat());
console.log(myArray.flat(-1));
console.log(myArray.flat(0));
console.log(myArray.flat(1));
console.log(myArray.flat(2));
console.log(myArray.flat(3));
console.log(myArray.flat(4));

/**
 * @param {Number} depth 
 * @returns {Array} // @todo discuss typeof [] === 'Object'; Boolean|false; Number|Nan;
 */
function myFlat(depth = 1) {
    const arr = this;
    if (depth <= 0) return arr;
    let result = [];
    arr.forEach(item => {
        result = result.concat((Array.isArray(item) && depth > 0) ? myFlat.call(item, depth - 1) : item);
    });
    return result;
}
