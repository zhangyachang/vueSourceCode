
!function () {
    // console.log('promise规范');
    const PENDING = 'pending';
    const FULFILLED = 'fulfilled';
    const REJECTED = 'rejected';

    function Promise(executor) {
        let self = this;

        self.status = PENDING;
        self.onFulfilled = []; // 成功回调队列
        self.onRejected = []; // 失败回调队列

        function resolve(value) {
            if (self.status === PENDING) {
                self.status = FULFILLED;
                self.value = value;
                self.onFulfilled.forEach(fn => fn());
            }
        }

        function reject(reason) {
            if (self.status === PENDING) {
                self.status = REJECTED;
                self.reason = reason;
                self.onRejected.forEach(fn => fn());
            }
        }

        try {
            executor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    Promise.prototype.then = function (onFulfilled, onReject) {
        // console.log('成功的回调', onFulfilled);
        // console.log('失败的回调', onReject);

        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onReject = typeof onReject === 'function' ? onReject : reason => { throw reason };

        let self = this;

        let promise2 = new Promise((resolve, reject) => {
            if (self.status === PENDING) {
                // console.log('肯定是这里的 PENDING');
                self.onFulfilled.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(self.value);
                            // console.log('这个x是什么', x);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });

                self.onRejected.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onReject(self.reason);
                            // console.log('失败的这个是什么', self.reason, x);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
            } else if (self.status === FULFILLED) {
                // console.log('肯定是这里的 FULFILLED');
                setTimeout(() => {
                    try {
                        // resolve(self.value);
                        let x = onFulfilled(self.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            } else if (self.status === REJECTED) {
                // console.log('肯定是这里的 REJECTED');
                setTimeout(() => {
                    try {
                        // reject(self.reason);
                        let x = onReject(self.reason);
                        // console.log('返回值', x);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }
        });

        return promise2;
    };

    function resolvePromise(promise2, x, resolve, reject) {
        if (promise2 === x) {
            reject(new TypeError('重复的'));
        }

        if (x && typeof x === 'object' || typeof x === 'function') {
            let used;
            try {
                let then = x.then;
                if (typeof then === 'function') {
                    then.call(x, (y) => {
                        if (used) return;
                        used = true;
                        resolvePromise(promise2, y, resolve, reject);
                    }, (r) => {
                        if (used) return;
                        used = true;
                        reject(r);
                    });
                } else {
                    if (used) return;
                    used = true;
                    resolve(x);
                }
            } catch (e) {
                if (used) return;
                used = true;
                reject(e);
            }
        } else {
            resolve(x);
        }
    }


    Promise.resolve = function (param) {
        if (param instanceof Promise) {
            return param;
        }

        return new Promise((resolve, reject) => {
            if (param && typeof param.then === 'function') {
                setTimeout(() => {
                    param.then(resolve, reject);
                }, 0);
            } else {
                resolve(param);
            }
        });
    };

    Promise.reject = function (param) {
        return new Promise((resolve, reject) => {
            reject(param);
        });
    };

    Promise.prototype.catch = function (onReject) {
        return this.then(null, onReject);
    };

    /**
     * 不管成功失败，都会走到finally中，并且fin
     */
    Promise.prototype.final = function (callback) {
        // console.log('代码执行顺序');
        return this.then(value => {
            return Promise.resolve(callback()).then(() => {
                return value;
            });
        }, err => {
            return Promise.resolve(callback()).then(() => {
                throw err;
            });
        });
    };



    Promise.all = function (promises) {
        promises = Array.from(promises);

        return new Promise((resolve, reject) => {
            let index = 0;
            let result = [];
            if (promises.length === 0) {
                // return [];
                resolve([]);
            } else {
                function processValue(i, data) {
                    result[i] = data;
                    if (++index === promises.length) {
                        resolve(result);
                    }
                }

                for (let i = 0; i < promises.length; i++) {
                    Promise.resolve(promises[i])
                        .then(res => {
                            processValue(i, res);
                        })
                        .catch(err => {
                            reject(err);
                            return;
                        })
                }
            }
        });
    };


    Promise.race = function (promises) {
        promises = Array.from(promises);
        return new Promise((resolve, reject) => {

            if (promises.length === 0) {
                return;
            }

            for (let i = 0; i < promises.length; i++) {
                Promise.resolve(promises[i])
                    .then(res => {
                        resolve(res);
                        return;
                    })
                    .catch(err => {
                        reject(err);
                        return;
                    })
            }
        });
    };

    window.Promise = Promise;

}();



let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject({
            code: 0,
            msg: '成功'
        });
    }, 3000);
});




let p3 = {
    p: '',
    msg: 'p3'
};

// let p2 = new Promise((resolve, reject) => {
//     resolve(32);
// });

let p2 = {
    then: function (resolve, reject) {
        setTimeout(() => {
            resolve({
                status: 200,
                msg: '12312'
            });
        }, 0);
    }
};


Promise.race([p1, p2, p3])
    .then(res => {
        console.log('promises.all', res);
    })
    .catch(err => {
        console.log('err', err);
    })



// // console.log('代码执行');

// p1
//     .then(res => {
//         console.log('执行结果', res);
//     })
//     .final(res => {
//         console.log('执行最终结果', res);
//     })



// console.log('代码更新');


// console.log('1111111111111111111111111111111111111111111111111');

// p1
//     .then(res => {
//         console.log('这一个·1111111111');
//         console.log('res', res);
//         console.log('这一个·1111111111');
//     })
//     .catch(err => {
//         console.log('err', err);
//     })
// console.log('1111111111111111111111111111111111111111111111111');




// // console.log(2222222222);
// // throw TypeError("下面的代码还会执行吗");
// // console.log(111111111111);

// console.log('执行顺序1');
// new Promise((resolve, reject) => {
//     console.log('promise执行');
//     setTimeout(() => {
//         resolve({
//             status: 200,
//             msg: '成功'
//         });
//     }, 3000);
// })
//     .then(res => {
//         console.log('成功的回调函数', res);
//         return {
//             msg: '返回值'
//         };
//     }, err => {
//         console.log('失败的回调函数', err);
//         return "123123123123";
//     })
//     .then(res => {
//         console.log('res', res);
//         return "123123";
//     })
//     .then(res => {
//         console.log('res', res);
//         return "123123";
//     })
//     .then(res => {
//         console.log('res', res);
//         console.log('走到这里了吗');
//     })

// console.log('执行顺序2');


// // .catch(err => {
// //     console.log('失败的回调函数', err);
// // })


// // try {
// //     throw 123123;
// // } catch (e) {
// //     console.log('捕获错误', e);
// // }




// let readyStatus = 'notR11eady';

// if(readyStatus === 'ok'){
//     console.log('成功了');
// }else if(readyStatus === 'notReady'){
//     console.log('失败了');
// }else{
//     console.log('其他');
// }

