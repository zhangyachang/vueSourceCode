let dataStructure = (function () {
  console.log('数据结构');


  return {
    /**
     * 栈是一种遵循后进先出 （LIFO） 原则的有序数据集
     * 
     *  1. 添加数据 push
     *  2. 返回栈顶数据 peek
     *  3. 从栈中删除栈顶数据并返回 pop
     *  4. 清空栈 clear
     *  5. 返回栈中的数据个数 size
     */

    Stack: (function () {
      // console.log('函数执行了吗');
      let sym = Symbol();

      return class {
        constructor() {
          this[sym] = [];
        }

        push(ele) {
          this[sym].push(ele);
        }

        peek() {
          return this[sym][this[sym].length - 1];
        }

        pop() {
          return this[sym].pop();
        }

        clear() {
          this[sym] = [];
        }

        size() {
          return this[sym].length;
        }

        print() {
          this[sym].forEach(item => {
            console.log(item);
          });
        }

      }
    })(),




    /** 队列的数据结构 */

    /**
     * enqueue 入队
     * dequeue 出队
     * first 返回队首元素，但不删除
     * clear 清空队列
     * size 返回队列长度
     */
    Queue: (function () {
      let sym = Symbol();

      return class {
        constructor() {
          this[sym] = [];
        }

        enqueue(item) {
          this[sym].push(item);
        }

        dequeue() {
          return this[sym].shift();
        }

        first() {
          return this[sym][0];
        }

        clear() {
          this[sym] = [];
        }

        size() {
          return this[sym].length;
        }
      }
    })(),



  }

})();