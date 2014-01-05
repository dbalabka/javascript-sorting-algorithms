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

var benchmarkSuite = new Benchmark.Suite('Sorting benchmark');

var testArray = helpers.arrayRandom(10000);

// add tests
benchmarkSuite
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
    .add('Quick sort basic(recursion)', function() {
        var arr = testArray.slice(0);
        arr.quickSort();
    })
    .add('Quick sort basic(iterative version 1)', function() {
        var arr = testArray.slice(0);
        arr.quickSortIterative();
    })
    // Temporary disabled because not use callback
//    .add('Quick sort basic(iterative version 2)', function() {
//        var arr = testArray.slice(0);
//        arr.quickSortIterative2();
//    })
    .add('Quick sort 3 way(recursion)', function() {
        var arr = testArray.slice(0);
        arr.quickSort3Way();
    })
    .add('Quick sort dual pivot(recursion)', function() {
        var arr = testArray.slice(0);
        arr.quickSortDualPivot();
    })
    // add listeners
    .on('cycle', function(event) {
        $('#benchmark').append('<div>' + String(event.target) + '</div>');
    })
    .on('complete', function() {
        $('#benchmark').append('<div><strong>Fastest is ' + this.filter('fastest').pluck('name') + '</strong></div>');
    });