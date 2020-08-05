// console.log('Vue.js');

/**
 * UI =Render(state);
 *
 */
const Dep = (function () {
    /**
     * 从数组中移除一项元素
     * @param {Array} arr 
     * @param {*} item 
     */
    var remove = function (arr, item) {
        if (arr.length) {
            const index = arr.indexOf(item);
            if (index > -1) {
                return arr.splice(index, 1);
            }
        }
    }

    class Dep {
        constructor() {
            this.subs = [];
        }

        addSub(sub) {
            this.subs.push(sub);
        }

        // 删除一个依赖
        removeSub(sub) {
            remove(this.subs, sub);
        }

        // 添加一个依赖
        depend() {
            console.log('插入进来的是什么', window.target);

            if (window.target) {
                this.addSub(window.target);
            }
        }

        // 通知所有依赖更新
        notify() {
            const subs = this.subs.slice();
            for (let i = 0, l = subs.length; i < l; i++) {
                subs[i].update();
            }
        }
    }

    return Dep;
})();



const Observer = (function () {
    // 能力检测：判断 __proto__ 是否可用，因为有的浏览器不支持该属性
    const hasProto = '__proto__' in {};

    const arrayKeys = Object.getOwnPropertyNames(arrayMethods);

    /**
     * Observer 类会通过递归的方式把一个对象的所有属性都转化成可观测对象
     * 
     */
    class Observer {
        constructor(value) {
            this.value = value;

            // 给value新增一个 __ob__ 属性，值为该 value 的 Observer 实例
            // 相当于为 value 打上标记，表示它已经被转化成响应式了，避免重复操作

            if (Array.isArray(value)) {
                // 当 value 为数组时的逻辑
                // ...
                console.log('当为数组时的操作逻辑');

                const augment = hasProto ? protoAugment : copyAugment;
                // augment(value, arrayMethods, arrayKeys);
            } else {
                this.walk(value);
            }
        }

        walk(obj) {
            const keys = Object.keys(obj);
            // console.log('第一次的keys', keys);
            for (let i = 0; i < keys.length; i++) {
                defineReactive(obj, keys[i]);
            }

        }
    }


    /**
     * 使一个对象转化成可观测对象
     * 
     * @param {Object} obj 对象
     * @param {String} key 对象的key
     * @param {Any} val 对象的某个key值
     */

    function defineReactive(obj, key, val) {
        // 如果只传了 obj 和 key，那么 value = obj[key]
        if (arguments.length === 2) {
            val = obj[key];
        }

        if (typeof val === 'object') {
            new Observer(val);
        }

        const dep = new Dep(); // 实例化一个依赖管理器，生成一个依赖管理数组 dep
        // console.log('实例化对象', dep);

        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                console.log(`${key}属性被读取了`);

                /** 在getter中收集依赖 */
                dep.depend();

                return val;
            },
            set(newVal) {
                if (val === newVal) {
                    return;
                }
                console.log(`${key}属性被改变了`);
                val = newVal;

                /** 在 setter 中通知依赖更新 */
                dep.notify();

            }
        })
    }

    return Observer;
})();



/**
 * Watcher类的实现
 */

const Watcher = (function () {
    // console.log('watcher类执行');

    class Watcher {
        constructor(vm, expOrFn, cb) {
            this.vm = vm;
            this.cb = cb;
            this.getter = parsePath(expOrFn);
            this.value = this.get();
        }

        get() {
            window.target = this;
            const vm = this.vm;
            let value = this.getter.call(vm, vm);
            window.target = undefined;
            return value;
        }

        update() {
            const oldValue = this.value;
            this.value = this.get();
            this.cb.call(this.vm, this.value, oldValue);
        }
    }


    /**
     * Parse simple path.
     * 把一个形如 'data.a.b.c' 的字符串路径所表示的值，从真实的 data 对象中取出来。
     * 例如：
     *  data = {a: {b: {c: 2}}}
     *  parse('a.b.c')(data) ; // 2
     */
    const bailRE = /[^\w.$]/
    function parsePath(path) {
        if (bailRE.test(path)) {
            return;
        }
        let params = path.split('.');
        return function (data) {
            console.log('params', params);
            for (let i = 0, l = params.length; i < l; i++) {
                data = data[params[i]];
            }
            return data;
        }
    }

    return Watcher;
})();



// let obj = {
//     name: '张祖',
//     age: 80,
//     sex: '男',
//     children: {
//         name: '张大',
//         age: 40,
//         sex: '男',
//         children: {
//             name: '张一',
//             age: 20,
//             sex: '男'
//         }
//     }
// };

// // console.log('11111111111111111111');
// let obObj = new Observer(obj);

// // console.log(window.target);

// // document.onclick = function () {
// //     console.log('点击事件发送');
// // };

// obj.name;





// let result = parsePath('info.sex')({
//     name: '张三',
//     info: {
//         sex: '男',
//         age: 18,
//         school: '河北小学'
//     }
// });
// console.log('返回最终结果值', result);




/**
 * Array 的获取以及改变
 *
 */

// console.log('array');
let obj = {
    arr: [1, 3, 4]
};

// console.log(obj);

// Array.prototype.newPush = function (val) {
//     console.log('arr被修改了');
//     this.push(val);
// };

// obj.arr.newPush(100);



/**
 * 经过整理，Array原型中可以改变数组自身内容的方法有7个,
 * 分别由 push pop shift unshift splice sort reverse
 */

(function () {
    const arrayProto = Array.prototype;
    // 创建一个对象作为拦截器
    const arrayMethods = Object.create(arrayProto);


    // 改变数组自身的7个方法
    const methodsToPatch = [
        'push',
        'pop',
        'shift',
        'unshift',
        'splice',
        'sort',
        'reverse'
    ];

    /**
     * 拦截变异方法并发出事件
     */
    methodsToPatch.forEach(function (method) {
        const original = arrayMethods[method]; // 缓存原生方法
        Object.defineProperty(arrayMethods, method, {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function mutator(...args) {
                const result = original.apply(this, args);
                return result;
            }
        });
    });

})();









