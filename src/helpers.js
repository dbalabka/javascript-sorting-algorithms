/**
 * Common function
 */
var helpers = {};
helpers.randomNumber = function (min, max) {
    var argc = arguments.length;
    if (argc === 0) {
        min = 0;
        max = 2147483647;
    } else if (argc === 1) {
        throw new Error('helpers.prototype.randomNumber expects exactly 2 parameters, 1 given');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

helpers.arrayRandom = function (min, max, size, startIndex) {
    if (typeof(startIndex) != 'number') {
        startIndex = 0;
    }
    var arr = [], i = startIndex;
    size += startIndex;
    while (i < size) {
        arr[i] = this.randomNumber(min, max);
        i++;
    }
    return arr;
};