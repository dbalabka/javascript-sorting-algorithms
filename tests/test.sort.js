describe('Sorting', function(){

    describe('Bubble sort', function(){
        it('should sort array [5,3,4,1,2]', function(done){
            var arr = [5,3,4,1,2];
            arr.bubbleSort();
            assert.deepEqual(arr, [1,2,3,4,5], 'sorting failed' + JSON.stringify(arr));
            done();
        });
    });

    describe('Shell sort', function(){
        it('should sort array [5,3,4,1,2]', function(done){
            var arr = [5,3,4,1,2];
            arr.shellSort();
            assert.deepEqual(arr, [1,2,3,4,5], 'sorting failed' + JSON.stringify(arr));
            done();
        });
    });

    describe('Quick sort basic(recursion)', function(){
        it('should sort array [5,3,4,1,2]', function(done){
            var arr = [5,3,4,1,2];
            arr = arr.quickSort();
            assert.deepEqual(arr, [1,2,3,4,5], 'sorting failed ' + JSON.stringify(arr));
            done();
        });
    });

    describe('Quick sort basic(iterative version 1)', function(){
        it('should sort array [5,3,4,1,2]', function(done){
            var arr = [5,3,4,1,2];
            arr.quickSortIterative();
            assert.deepEqual(arr, [1,2,3,4,5], 'sorting failed ' + JSON.stringify(arr));
            done();
        });
    });

    describe('Quick sort basic(iterative version 2)', function(){
        it('should sort array [5,3,4,1,2]', function(done){
            var arr = [5,3,4,1,2];
            arr.quickSortIterative2();
            assert.deepEqual(arr, [1,2,3,4,5], 'sorting failed ' + JSON.stringify(arr));
            done();
        });
    });

    describe('Quick sort 3 way(recursion)', function(){
        it('should sort array [5,3,4,1,2]', function(done){
            var arr = [5,3,4,1,2];
            arr.quickSort3Way();
            assert.deepEqual(arr, [1,2,3,4,5], 'sorting failed ' + JSON.stringify(arr));
            done();
        });
    });

    describe('Quick sort dual pivot(recursion)', function(){
        it('should sort array [5,3,4,1,2]', function(done){
            var arr = [5,3,4,1,2];
            arr.quickSortDualPivot();
            assert.deepEqual(arr, [1,2,3,4,5], 'sorting failed ' + JSON.stringify(arr));
            done();
        });
    });
});