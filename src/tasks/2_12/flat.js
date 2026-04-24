'use strict';

// unable to implement 'empty'. Using 'undefined' instead for now
function MyArray() {
    if (arguments.length === 1 && Number.isInteger(arguments[0]) && arguments[0] >= 0 && arguments[0] < (2 ** 32 - 1)) {
        this.length = arguments[0];
    } else {
        this.length = arguments.length;
        for (let i = 0; i < arguments.length; i++) {
            this[i] = arguments[i];
        }
    }
}

MyArray.isMyArray = function (obj) {
    return obj instanceof MyArray;
}

MyArray.prototype = new MyArrayProto();
function MyArrayProto() {
    this.push = function () {
        if (arguments) {
            for (let i = 0; i < arguments.length; i++) {
                this[this.length++] = arguments[i];
            }
        }
        return this.length;
    };
    this.reduceRight = function (callback, initialValue) {
        let lastNonEmptyIndex = -1;
        for (let i = this.length - 1; i >= 0; i--) {
            if (typeof this[i] !== 'undefined') {
                lastNonEmptyIndex = i;
                break;
            }
        }
        if (lastNonEmptyIndex < 0 && initialValue === undefined) {
            throw new TypeError('Reduce of empty array with no initial value');
        }
        let result = initialValue ?? this[lastNonEmptyIndex];
        const initialIndex = lastNonEmptyIndex - (initialValue === undefined);
        if (initialIndex < 0) return result;
        for (let i = initialIndex; i >= 0; i--) {
            if (this[i] !== undefined) {
                result = callback(result, this[i], i, this);
            }
        }
        return result;
    };
    this.concat = function (...args) {
        for (let i = 0; i < args.length; i++) {
            if (Array.isArray(args[i])) {
                this.push(...args[i]);
            } else if (MyArray.isMyArray(args[i])) {
                for (let j = 0; j < args[i].length; j++) {
                    this.push(args[i][j]);
                }
            } else {
                this.push(args[i]);
            }
        }
        return this;
    };
    this.forEach = function (fn) {
        for (let i = 0; i < this.length; i++) {
            fn(this[i], i, this);
        }
    };
    this.flat = function (depth = 1) {
        if (depth <= 0) return this;
        let result = new MyArray();
        this.forEach(item => {
            result = result.concat(((Array.isArray(item) || MyArray.isMyArray(item)) && depth > 0) ? result.flat.call(item, (depth - 1)) : item);
        });
        return result;
    };
}

const myArray = new MyArray(0, 1, 2, 3, [], 4, [1, , 2], 5, [1, 2, [3, , , 4]], 6, 7, [1, 2, [3, 4, [5, 6]]], 8, 9, 10, [1, 2, [3, 4, [5, 6, [7, 8]]]]);
console.log('myArray');
console.log(myArray);
console.log('myArray.flat(-1)');
console.log(myArray.flat(-1));
console.log('myArray.flat(0)');
console.log(myArray.flat(0));
console.log('myArray.flat()');
console.log(myArray.flat());
console.log('myArray.flat(1)');
console.log(myArray.flat(1));
console.log('myArray.flat(2)');
console.log(myArray.flat(2));
console.log('myArray.flat(3)');
console.log(myArray.flat(3));
console.log('myArray.flat(4)');
console.log(myArray.flat(4));
console.log('myArray.flat(100)');
console.log(myArray.flat(100));