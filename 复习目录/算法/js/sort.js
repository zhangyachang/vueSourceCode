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
            console.time('冒泡排序法');
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
            console.timeEnd('冒泡排序法');
            return arr;
        },

        // BubbleSort2(arr) {
        //     for (var i = 0; i < arr.length - 1; i++) {
        //         for (var k = i + 1; k < arr.length; k++) {
        //             if (arr[i] > arr[k]) {
        //                 var temp = arr[i];
        //                 arr[i] = arr[k];
        //                 arr[k] = temp;
        //             }
        //         }
        //     }
        //     return arr;
        // }

        // 设置一个标志性变量记录上一次变化的位置
        BubbleSort2(arr) {
            console.log('优化版冒泡排序算法');
            console.time("优化版冒泡排序算法");
            let i = arr.length - 1;
            while (i > 0) {
                let pos = 0;
                for (let j = 0; j < i; j++) {
                    if (arr[j] > arr[j + 1]) {
                        let tmp = arr[j + 1];
                        arr[j + 1] = arr[j];
                        arr[j] = tmp;
                        pos = j;
                    }
                }
                i = pos;
            }
            console.timeEnd("优化版冒泡排序算法");
            return arr;
        },

        BubbleSort3(arr) {
            console.log('冒泡排序法3');
            let low = 0;
            let high = arr.length - 1;
            while (low < high) {
                for (let i = low; i < high; i++) {
                    if (arr[i] > arr[i + 1]) {
                        let tmp = arr[i];
                        arr[i] = arr[i + 1];
                        arr[i + 1] = tmp;
                    }
                }
                --high;
                for (let j = high; j > low; j--) {
                    if (arr[j] < arr[j - 1]) {
                        let tmp = arr[j];
                        arr[j] = arr[j - 1];
                        arr[j - 1] = tmp;
                    }
                }
                low++;
            }
            return arr;
        },


        /**
         * 选择排序
         */
        SelectSort(arr) {
            console.log('选择排序算法');

            let length = arr.length;
            for (let i = 0; i < length - 1; i++) {
                let min = arr[i];
                let minIndex = i;
                for (let j = i + 1; j < length; j++) {
                    if (arr[j] < min) {
                        minIndex = j;
                        min = arr[j];
                    }
                }
                // 将最小项 放到前面

                let tmp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = tmp;
            }
            return arr;
        },


        /**
         * 插入排序
         *  我自己的实现
         */
        InsertSort(arr) {
            console.log('插入排序算法');
            let length = arr.length;
            for (let i = 1; i < length; i++) {
                let tmp = arr[i];
                for (let j = i; j > 0; j--) {
                    if (tmp < arr[j - 1]) {
                        arr[j] = arr[j - 1];
                        arr[j - 1] = tmp;
                    } else {
                        break;
                    }
                }
            }
            return arr;
        },

        // 插入排序
        InsertSort2(arr) {
            let length = arr.length;
            for (let i = 0; i < length; i++) {
                let key = arr[i];
                let j = i - 1;
                while (j >= 0 && arr[j] > key) {
                    arr[j + 1] = arr[j];
                    j--;
                }
                arr[j + 1] = key;
            }
            return arr;
        },

        // 查找元素时采用二分查找的方式
        InsertSort3(arr) {
            console.log('二分查找法');
            let length = arr.length;
            for (let i = 1; i < length; i++) {
                // console.log('这里的编码', i);
                let left = 0;
                let key = arr[i];
                let right = i - 1;

                while (left <= right) {
                    let middle = parseInt((left + right) / 2);
                    // console.log('middle', middle);
                    if (key < arr[middle]) {
                        right = middle - 1;
                    } else {
                        left = middle + 1;
                    }
                }
                for (let j = i - 1; j >= left; j--) {
                    arr[j + 1] = arr[j];
                }
                arr[left] = key;
            }
            return arr;
        },


        /**
         * 希尔排序
         */
        shellSort(arr) {
            // 希尔排序暂时没有思路
            console.log('希尔排序', arr);

            let length = arr.length;
            let tmp;
            let gap = 1;
            while (gap < length / 5) { // 动态间隔序列
                // console.log('打包安装');
                gap = gap * 5 + 1;
                // console.log('初始化gap', gap);
            }

            for (gap; gap > 0; gap = Math.floor(gap / 5)) {
                console.log('gap ==== ', gap);
                for (let i = 0; i < length; i++) {
                    tmp = arr[i];
                    let j = i - gap;
                    for (; j >= 0 && tmp < arr[j]; j -= gap) {
                        arr[j + gap] = arr[j];
                    }
                    arr[j + gap] = tmp;
                }
            }
            return arr;

            // let length = arr.length;
            // let gph = parseInt(length / 2);

            // for (; gph >= 1; gph /= 2) {
            //     console.log('一次一次的循环遍历', gph);

            //     // 一组一组的进行排序
            //     for (let i = 0; i < length - gph; i++) {
            //         let key = arr[i + gph];
            //         for (let j = i + gph; j < length; j += gph) {

            //             if (key > arr[j]) {

            //             } else {

            //             }

            //         }
            //     }
            // }
        },


        /**
         * 归并排序
         */
        MergeSort(arr) {
            console.log('归并排序---MergeSort', arr);

            let length = arr.length;
            if (length < 2) {
                return arr;
            }

            var middle = Math.floor(length / 2);
            var left = arr.slice(0, middle);
            var right = arr.slice(middle);
            // console.error('这里走了几次');
            // console.log('left', left, 'right', right);
            return this.merge(this.MergeSort(left), this.MergeSort(right));
        },

        // 专门提供用于归并排序的函数
        merge(left, right) {
            let result = [];
            while (left.length && right.length) {
                if (left[0] <= right[0]) {
                    result.push(left.shift());
                } else {
                    result.push(right.shift());
                }
            }

            while (left.length) {
                result.push(left.shift());
            }

            while (right.length) {
                result.push(right.shift());
            }

            return result;
        },


        /**
         * 快速排序
         * 
         */
        QuickSort(arr, left, right) {
            // console.log('快速排序', arr);

            // let length = arr.length;
            // if (length < 2) {
            //     return arr;
            // }
            // let base = arr[0];
            // console.log('base', base);
            // let maxBaseIndex = 1;

            // for (let i = 1; i < length; i++) {
            //     if (arr[i] < base) {
            //         console.log('小于的', arr[i]);
            //         let tmp = arr[i];
            //         arr[i] = arr[maxBaseIndex];
            //         arr[maxBaseIndex] = tmp;
            //         maxBaseIndex++;
            //     }
            // }

            // console.log('第一圈走完', arr, maxBaseIndex);
            // // 换位置
            // let tmp = arr[0];
            // arr[0] = arr[maxBaseIndex - 1];
            // arr[maxBaseIndex - 1] = tmp;

            // console.log('arr', arr);

            // let left = arr.slice(0, maxBaseIndex);
            // let right = arr.slice(maxBaseIndex)
            // console.log('left', left, 'right', right);

            // this.resolveQuickSort(left, right);
            // this.QuickSort(left);
            // this.QuickSort(right);


            console.log('快速排序');

            if (Object.prototype.toString.call(arr).slice(8, -1) === 'Array' && typeof left === 'number' && typeof right === 'number') {

                if (left < right) {
                    // 这里进行排序
                    let x = arr[right];
                    let i = left - 1;
                    let temp;

                    for (let j = left; j <= right; j++) {
                        if (arr[j] <= x) {
                            i++;
                            temp = arr[i];
                            arr[i] = arr[j];
                            arr[j] = temp;
                        }
                    }

                    this.QuickSort(arr, left, i - 1);
                    this.QuickSort(arr, i + 1, right);
                }
                return arr;
            } else {
                throw Error('传入参数不合法');
            }
        },

        QuickSort2(arr, left, right) {
            if (Object.prototype.toString.call(arr).slice(8, -1) === 'Array' && typeof left === 'number' && typeof right === 'number') {
                if (left < right) {
                    let base = arr[left]; // 取第0项为基准
                    let maxBaseIndex = left; // 比基准大的项的索引

                    for (let i = left + 1; i <= right; i++) {
                        if (arr[i] <= base) {
                            // 交换位置
                            maxBaseIndex++;
                            let temp = arr[maxBaseIndex];
                            arr[maxBaseIndex] = arr[i];
                            arr[i] = temp;
                        }
                    }

                    let temp = arr[maxBaseIndex];
                    arr[maxBaseIndex] = arr[left];
                    arr[left] = temp;

                    this.QuickSort2(arr, left, maxBaseIndex - 1);
                    this.QuickSort2(arr, maxBaseIndex + 1, right);
                }
                return arr;
            } else {
                throw Error('错误的');
            }
        },

        // 快速排序
        QuickSort3(arr) {
            console.log('快速排序3', '简单了很多');
            if (arr.length <= 1) return arr;
            let pivoIndex = Math.floor(arr.length / 2);
            let privo = arr.splice(pivoIndex, 1)[0];
            let left = [];
            let right = [];

            console.log('推荐人', privo);

            for (let i = 0; i < arr.length; i++) {
                if (arr[i] < privo) {
                    left.push(arr[i]);
                } else {
                    right.push(arr[i]);
                }
            }

            console.log(left, right, arr);
            return this.QuickSort3(left).concat([privo], this.QuickSort3(right));
        }






    }
})();




