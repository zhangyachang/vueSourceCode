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
          console.log('这个东西', ele);
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

    // 优先队列
    PriorityQueue: (function () {
      console.log('优先队列');
      let sym = Symbol();

      class Priority {
        constructor(ele, pri) {
          this.ele = ele;
          this.pri = pri;
        }
      }

      return class {
        constructor() {
          this[sym] = [];
        }

        /**
         * 元素值
         * @param {*} ele 
         * @param {Number} priority 元素权重，值越大，越靠前
         */
        enqueue(ele, priority) {
          let node = new Priority(ele, priority);
          let i = 0;
          while (i < this.size()) {
            if (this[sym][i].pri < priority) {
              break;
            }
            i++;
          }
          this[sym].splice(i, 0, node);
        }

        size() {
          return this[sym].length;
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

        print() {
          this[sym].forEach(v => {
            console.log(v);
          });
        }
      };
    })(),

    // 双向队列
    // 允许从前面添加取出，也允许从后面添加取出
    // 代码实现太容易了，不写了。



    // 链表
    /**
     * 链尾添加节点 append
     * 查找指定数据对应的节点 find
     * 指定数据后面插入节点 insert
     * 移除指定数据对应的节点 remove
     * 打印链表数据 print
     * 返回链表长度 size
     * 
     * // 可能额外需要的功能
     * 查找对应数据对应索引 indexOf
     * 按照索引查找节点 find
     * 按照索引插入节点 insert
     * 按照索引移除节点 remove
     */
    LinkList: (function () {
      console.log('链表');
      let HEAD = Symbol();

      // 定义链表结构
      class Node {
        constructor(data) {
          this.data = data;
          this.next = null;
        }
      }

      return class {
        constructor() {
          this[HEAD] = null;
        }

        // 链尾添加节点 append
        append(data) {
          let newNode = new Node(data);
          if (!this[HEAD]) {
            this[HEAD] = newNode;
            return;
          }

          let head = this[HEAD];
          while (head.next) {
            head = head.next;
          }
          head.next = newNode;
        }

        // 查找指定的
        find(data) {
          let head = this[HEAD];
          if (head === null) {
            return null;
          }

          while (head && head.data !== data) {
            head = head.next;
          }
          if (head !== null) {
            return head;
          } else {
            return null;
          }
        }

        // 查找指定值的点，若不存在则返回最后一项
        // findNodeOrLast(data) {
        //   let head = this[HEAD];

        //   if (head === null) {
        //     return this[HEAD];
        //   }

        //   let prev = null;
        //   while (head && head.data !== data) {
        //     prev = head;
        //     head = head.next;
        //   }

        //   if (head) {
        //     return head;
        //   } else {
        //     return prev;
        //   }
        // }

        insert(target, data) {
          let findNode = this.find(target);
          if (findNode !== null) {
            let newNode = new Node(data);
            newNode.next = findNode.next;
            findNode.next = newNode;
            return true;
          } else {
            return false;
          }
        }

        remove(data) {
          // console.log('打印字符串');
          let head = this[HEAD];
          let prev = null;
          while (head && head.data !== data) {
            prev = head;
            head = head.next;
          }

          if (head !== null) {
            if (prev === null) {
              // 删除首元素
              this[HEAD] = head.next;
            } else {
              // 删除非首元素
              prev.next = head.next;
            }

            // 这里就是删除了元素
          }

          // 这里就是没有删除任何元素
        }

        print() {
          let head = this[HEAD];
          while (head) {
            console.log(head.data);
            head = head.next;
          }
        }

        size() {
          let i = 0;
          let head = this[HEAD];

          while (head) {
            i++;
            head = head.next;
          }

          return i;
        }

        indexOf(data) {
          console.log('查找元素对应索引');
          let head = this[HEAD];
          let i = 0;
          while (head && head.data !== data) {
            head = head.next;
            i++;
          }
          if (head) {
            return i;
          } else {
            return -1;
          }

          // if (i === 0 && head) {
          //   return i;
          // } else if (head === null) {
          //   return -1;
          // } else {
          //   return i;
          // }
        }

        findNodeByIndex(index) {
          if (typeof index !== 'number') {
            throw Error('index参数是一个数字');
          }

          let head = this[HEAD];
          let i = 0;
          let prev = null;
          while (head && i !== index) {
            prev = head;
            head = head.next;
            i++;
          }

          return {
            node: head,
            prev: prev
          };
        }

        findByIndex(index) {
          if (typeof index !== 'number') {
            throw Error('index参数是一个数字');
          }

          let head = this[HEAD];
          let i = 0;

          while (head && i !== index) {
            if (i === index) return head;
            head = head.next;
            i++;
          }

          return undefined;
        }

        findByIndexAndPrevNode(index) {
          if (typeof index !== 'number') {
            throw Error('index参数是一个数字');
          }

          let head = this[HEAD];
          let prev = null;
          let i = 0;

          while (head && i !== index) {
            prev = head;
            head = head.next;
            i++;
          }

          if (head !== null) {
            return {
              node: head,
              prev: prev
            };
          } else {
            return {
              code: -1
            }
          }


        }

        // 按照索引插入节点
        insertItemByIndex(index, data) {
          if (typeof index !== 'number') {
            throw Error('index参数是一个数字');
          }

          let newNode = new Node(data);
          let head = this[HEAD];
          let i = 0;
          let prev = null;

          if (index === 0) {
            newNode.next = head;
            this[HEAD] = newNode;
            return {
              code: 0,
              msg: '成功'
            };
          }

          let beforeNode = this.findByIndex(index - 1);
          if (beforeNode) {
            newNode.next = beforeNode.next;
            beforeNode.next = newNode;
          } else {
            throw new Error('beforeNode节点不存在');
          }

          // while (head && i !== index) {
          //   prev = head;
          //   head = head.next;
          //   i++;
          // }

          // // console.log('i, index', i, index, 'head', head);
          // if (head === null && i === index) {
          //   prev.next = newNode;
          //   return {
          //     code: 0,
          //     msg: '成功'
          //   };
          // }

          // if (head !== null) {
          //   newNode.next = head;
          //   prev.next = newNode;
          //   return {
          //     code: 0,
          //     msg: '成功'
          //   };
          // } else {
          //   return {
          //     code: -2,
          //     msg: '无此索引'
          //   };
          // }
        }

        // 按照索引移除节点
        removeNodeByIndex(index) {
          // console.log('按照索引移除节点', index);
          let result = this.findByIndexAndPrevNode(index);
          // console.log('查找结果', result);
          if (result.code === -1) {
            return false;
          }
          let { prev, node } = result;
          // console.log('prev', prev, 'node', node);

          if (prev === null) {
            this[HEAD] = node.next;
            return true;
          }
          prev.next = node.next;
        }
      }
    })(),


    /**
     * 集合结构
     * 
     */
    Collection: (function () {


      return {
        // 并集 交集 差集 子集
        union(a, b) {
          return new Set([...a, ...b]);
        },

        intersection(a, b) {
          let s = new Set();

          b.forEach(item => {
            if (a.includes(item)) {
              s.add(item);
            }
          });
          return s;
        },

        difference(a, b) {
          let s = new Set();
          a.forEach(item => {
            if (!b.includes(item)) {
              s.add(item);
            }
          });
          return s;
        },

        subset(a, b) {
          for (let item of b) {
            if (!a.includes(item)) {
              console.log('走到了');
              return false;
            }
          }
          
          return true;
        }

      }
    })(),





  }

})();