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

      return class {
        constructor() {
          this.items = [];
        }

        push(ele) {
          this.items.push(ele);
        }

        peek() {
          return this.items[this.items.length - 1];
        }

        pop() {
          return this.items.pop();
        }

        clear() {
          this.items = [];
        }

        size() {
          return this.items.length;
        }

        print() {
          this.items.forEach(item => {
            console.log(item);
          });
        }
      }
    })(),



  }

})();