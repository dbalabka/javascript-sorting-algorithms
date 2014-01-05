/**
 * Bubble sort(optimized)
 * @returns {Array} implements fluid interface
 */
Array.prototype.bubbleSort = function ()
{
    var n = this.length;
    do {
        var swapped = false;
        for (var i = 1; i < n; i++ ) {
            if (this[i - 1] > this[i]) {
                var tmp = this[i-1];
                this[i-1] = this[i];
                this[i] = tmp;
                swapped = true;
            }
        }
    } while (swapped);
    return this;
};

/**
 * Shell sorting.
 * @returns {Array} implements fluid interface
 */
Array.prototype.shellSort = function ()
{
    var lastKey = this.length -1,
        inc = Math.round(this.length / 2),
        temp, j, i;
    while (inc > 0) {
        for (i = inc; i <= lastKey; i++) {
            temp = this[i];
            j = i;
            while (j >= inc && this[j - inc] > temp) {
                this[j] = this[j - inc];
                j = j - inc;
            }
            this[j] = temp;
        }
        inc = Math.round(inc / 2.2);
    }
    return this;
};

/**
 * Quick sorting. Returns sorted array.
 * Note that current array not will be sorted.
 * @returns {Array}
 */
Array.prototype.quickSort = function ()
{
    if (this.length <= 1)
        return this;

    var pivot = this[Math.round(this.length / 2)];

    return this.filter(function (x) { return x <  pivot }).quickSort().concat(
            this.filter(function (x) { return x == pivot })).concat(
            this.filter(function (x) { return x >  pivot }).quickSort());
};

/**
 * Swap two array elements.
 * @param {Number} i
 * @param {Number} ii
 */
Array.prototype.swap = function (i, ii) {
    var t = this[i];
    this[i] = this[ii];
    this[ii] = t;
};

/**
 * This function is same in both iterative and recursive
 * @param {Number} lowIndex
 * @param {Number} highIndex
 * @returns {Number}
 */
Array.prototype.partition = function(lowIndex, highIndex) {
    var j,
        x = this[highIndex],
        i = (lowIndex - 1);

    for (j = lowIndex; j <= highIndex - 1; j++) {
        if (this[j] <= x) {
            i++;
            this.swap(i, j);
        }
    }
    this.swap(i + 1, highIndex);
    return (i + 1);
};

/**
 * Quick sorting without recursion.
 * http://www.geeksforgeeks.org/iterative-quick-sort/
 * @returns {Array}
 */
Array.prototype.quickSortIterative = function () {
    // Create an auxiliary stack
    var l = 0;
    var h = this.length - 1;
    var stack = [];//[ h - l + 1 ];

    // initialize top of stack
    var top = -1;

    // push initial values of l and h to stack
    stack[ ++top ] = l;
    stack[ ++top ] = h;

    // Keep popping from stack while is not empty
    while ( top >= 0 ) {
        // Pop h and l
        h = stack[ top-- ];
        l = stack[ top-- ];

        // Set pivot element at its correct position in sorted array
        var p = this.partition(l, h);

        // If there are elements on left side of pivot, then push left
        // side to stack
        if ( p-1 > l ) {
            stack[ ++top ] = l;
            stack[ ++top ] = p - 1;
        }

        // If there are elements on right side of pivot, then push right
        // side to stack
        if ( p+1 < h ) {
            stack[ ++top ] = p + 1;
            stack[ ++top ] = h;
        }
    }
    return this;
};

/**
 * http://alienryderflex.com/quicksort/
 */
Array.prototype.quickSortIterative2 = function () {
    var arr = this, piv, beg = [], end = [], i = 0, L, R, elements = this.length;

    beg[0] = 0;
    end[0] = elements;
    while (i >= 0) {
        L = beg[i];
        R = end[i] - 1;
        if (L < R) {
            piv = arr[L];
            while (L < R) {
                while (arr[R] >= piv && L < R)
                    R--;
                if (L < R)
                    arr[L++] = arr[R];
                while (arr[L] <= piv && L<R)
                    L++;
                if (L < R)
                    arr[R--] = arr[L];
            }
            arr[L] = piv;
            beg[i+1] = L + 1;
            end[i+1] = end[i];
            end[i++] = L;
            if (end[i] - beg[i] > end[i - 1] - beg[i - 1]) {
                beg.swap(i, i-1);
                end.swap(i, i-1);
            }
        } else {
            i--;
        }
    }
    return this;
};