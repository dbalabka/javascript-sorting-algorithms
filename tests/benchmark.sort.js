var helpers = {};

helpers.randomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

helpers.arrayRandom = function (size) {
    var arr = [], i = 0;
    while (i < size) {
        arr[i] = this.randomNumber(0, size);
        i++;
    }
    return arr;
};

var suite = new Benchmark.Suite;

var testArray = helpers.arrayRandom(10000);

// add tests
suite
    .add('Bubble sort', function() {
        var arr = testArray.slice(0);
        arr.bubbleSort();
    })
    .add('Shell sort', function() {
        var arr = testArray.slice(0);
        arr.shellSort();
    })
    .add('Native sort', function() {
        var arr = testArray.slice(0);
        arr.sort(function(i, j){
            return i-j;
        })
    })
    .add('Quick sort with recursion', function() {
        var arr = testArray.slice(0);
        arr.quickSort();
    })
    .add('Quick sort iterative version 1', function() {
        var arr = testArray.slice(0);
        arr.quickSortIterative();
    })
    .add('Quick sort iterative version 2', function() {
        var arr = testArray.slice(0);
        arr.quickSortIterative2();
    })
    // add listeners
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    // run async
    .run({ 'async': true });