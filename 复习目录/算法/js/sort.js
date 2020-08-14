/***
 * 这里面主要总结了我对算法的一些描述
 * 
 * 将十大排序算法导出
 */
let sort = (function () {
    return {
        /**
         * 冒泡排序法
         * 
         * @param {Array} arr 要排序的数组
         * 
         * @return {Array} 排序好的数组，并将原数组改变
         */
        BubbleSort(arr) {
            console.log('冒泡排序法');
            let length = arr.length;
            for (let i = 0; i < length - 1; i++) {
                for (let j = 0; j < length - i - 1; j++) {
                    if (arr[j] > arr[j + 1]) {
                        let tmp = arr[j + 1];
                        arr[j + 1] = arr[j];
                        arr[j] = tmp;
                    }
                }
            }
            return arr;
        },
        

    }
})();



