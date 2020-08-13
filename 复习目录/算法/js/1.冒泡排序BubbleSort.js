console.log('冒泡排序');

var arr1 = [1, 2, 3, 4, 5, 6, 7];
var arr2 = [9, 8, 7, 6, 5, 4, 3, 2, 1];
var index = 0;

function BubbleSort(arr) {
    // console.log('开始排序');
    var length = arr.length;
    for (var i = 0; i < length; i++) {
        for (var j = 0; j < length - i - 1; j++) {
            // console.log('这里走了几次', ++index);
            if (arr[j] > arr[j + 1]) {
                var tmp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = tmp;
            }
        }
    }
    return arr;
}
let result = BubbleSort(arr1);
console.log(result);


/**
 * 改进后的冒泡排序
 */
var index = 0;
function BubbleSort2(arr) {
    // console.log('开始排序');
    var length = arr.length;
    var pos = arr.length;
    for (var i = 0; i < length; i++) {
        // console.log('不会吧');

        for (var j = 0; j < pos - i - 1; j++) {
            console.log('这里走了几次', ++index);

            if (arr[j] > arr[j + 1]) {
                var tmp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = tmp;
                pos = j;
            }
        }
    }
    return arr;
}


console.log(BubbleSort2(arr2));
console.log(arr2);






