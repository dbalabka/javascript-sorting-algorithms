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
 * @param {Function} [callback]
 * @returns {Array}
 */
Array.prototype.quickSort = function (callback) {
    callback || (callback = function(i, j){
        return i-j;
    });
    this._quickSort(0, this.length - 1, callback);
    return this;
};

/**
 * https://github.com/arunma/DataStructuresAlgorithms/blob/master/src/basics/sorting/quick/QuickSortBasic.java
 * @param {Number} lowIndex
 * @param {Number} highIndex
 * @param {Function} callback
 * @private
 */
Array.prototype._quickSort = function (lowIndex, highIndex, callback) {
    if (highIndex <= lowIndex){
        return;
    }

    var partIndex = this.partition(lowIndex, highIndex, callback);

    this._quickSort(lowIndex, partIndex - 1, callback);
    this._quickSort(partIndex + 1, highIndex, callback);
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
 * @param {Function} callback
 * @returns {Number}
 */
Array.prototype.partition = function(lowIndex, highIndex, callback) {
    var j, result,
        x = this[highIndex],
        i = (lowIndex - 1);

    for (j = lowIndex; j <= highIndex - 1; j++) {
        result = callback.call(callback, this[j], x);
        if (result <= 0) {
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
 * @param {Function} [callback]
 * @returns {Array}
 */
Array.prototype.quickSortIterative = function (callback) {
    callback || (callback = function(i, j){
        return i-j;
    });
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
        var p = this.partition(l, h, callback);

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
 * @todo implement callback
 */
Array.prototype.quickSortIterative2 = function () {
    var piv, beg = [], end = [], i = 0, L, R, elements = this.length;

    beg[0] = 0;
    end[0] = elements;
    while (i >= 0) {
        L = beg[i];
        R = end[i] - 1;
        if (L < R) {
            piv = this[L];
            while (L < R) {
                while (this[R] >= piv && L < R)
                    R--;
                if (L < R)
                    this[L++] = this[R];
                while (this[L] <= piv && L<R)
                    L++;
                if (L < R)
                    this[R--] = this[L];
            }
            this[L] = piv;
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


/**
 * https://github.com/arunma/DataStructuresAlgorithms/blob/master/src/basics/sorting/quick/QuickSort3Way.java
 * @param {Function} [callback]
 * @returns {Array}
 */
Array.prototype.quickSort3Way = function (callback) {
    callback || (callback = function (i, j) {
        return i-j;
    });
    this._quickSort3Way(0, this.length - 1, callback);
    return this;
};

/**
 *
 * @param {Number} lowIndex
 * @param {Number} highIndex
 * @param {Function} callback
 * @private
 */
Array.prototype._quickSort3Way = function (lowIndex, highIndex, callback) {
    if (highIndex <= lowIndex) {
        return;
    }

    var result;
    var lt = lowIndex;
    var gt = highIndex;
    var i = lowIndex + 1;

    var pivotValue = this[lowIndex];

    while (i <= gt) {
        result = callback.call(callback, this[i], pivotValue);
        if (result < 0) {
            this.swap(i++, lt++);
        } else {
            result = callback.call(callback, pivotValue, this[i]);
            if (result < 0) {
                this.swap(i, gt--);
            } else {
                i++;
            }
        }
    }

    this._quickSort3Way(lowIndex, lt - 1, callback);
    this._quickSort3Way(gt + 1, highIndex, callback);
};


/**
 * https://github.com/arunma/DataStructuresAlgorithms/blob/master/src/basics/sorting/quick/QuickSortDualPivot.java
 * @param {Function} [callback]
 * @returns {Array}
 */
Array.prototype.quickSortDualPivot = function (callback) {
    callback || (callback = function (i, j) {
        return i-j;
    });
    this._quickSortDualPivot(0, this.length - 1, callback);
    return this;
};

/**
 *
 * @param {Number} lowIndex
 * @param {Number} highIndex
 * @param {Function} callback
 * @private
 */
Array.prototype._quickSortDualPivot = function (lowIndex, highIndex, callback) {

    var result;
    if (highIndex <= lowIndex) {
        return;
    }

    var pivot1 = this[lowIndex];
    var pivot2 = this[highIndex];


    result = callback.call(callback, pivot2, pivot1);
    if (result < 0) {
        this.swap(lowIndex, highIndex);
        pivot1 = this[lowIndex];
        pivot2 = this[highIndex];
    } else if (result === 0){
        while (result === 0 && lowIndex < highIndex){
            lowIndex++;
            pivot1 = this[lowIndex];
            result = callback.call(callback, pivot2, pivot1);
        }
    }


    var i = lowIndex + 1;
    var lt = lowIndex + 1;
    var gt = highIndex - 1;

    while (i <= gt) {

        if (this[i] < pivot1) {
            this.swap(i++, lt++);
        } else if (pivot2 < this[i]) {
            this.swap(i, gt--);
        } else {
            i++;
        }

    }

    this.swap(lowIndex, --lt);
    this.swap(highIndex, ++gt);

    this._quickSortDualPivot(lowIndex, lt - 1, callback);
    this._quickSortDualPivot(lt + 1, gt - 1, callback);
    this._quickSortDualPivot(gt + 1, highIndex, callback);
};