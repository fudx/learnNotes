### 这是一个刷题笔记

```

1、实现call
2、实现apply
3、实现bind
4、 实现new
5、手写EventEmmiter eventbus
6、手写instanceOf
7、防抖 & 节流
8、柯里化
9、用promise封装一个ajax
10、浅拷贝 & 深拷贝
11、乱序数组
12、实现一个带并发最大限制的异步调度器
13、创建对象的几种方式
14、实现继承的几种方式？class中的new.target 干什么用的，static 干什么用的
15、实现promise
16、实现promise基础api all any allsettled race catch finally resolve reject
17、实现async await

```

### 重点
防抖 
ajax

## 
插叙

###
### 6
```
  // 柯里化
  function add(...args1) {
    // to do
  }
  console.log(
    +add(1)(2)(3), // 6
    +add(1, 2, 3) // 6
  );
```
### 7 
```
//  promise封装ajax

```
### 深拷贝
```
function deepcopy(obj, map = new WeakMap()) {
    
  }
  var sss = {
    a: 2,
    list: {
      b: 3,
      c: [1, 2, 3, 4],
      d: {
        e: 5,
      },
    },
  };
  const ans = deepcopy(sss);
  console.log(ans);
```
### 11 

```
// 11.并发最大限制的异步调度器
  class Scheduler {
    add(promiseCreator) {}
    // ...
  }
  const timeout = (time) =>
    new Promise((resolve) => {
      setTimeout(resolve, time);
    });

  const scheduler = new Scheduler(2);
  const addTask = (time, order) => {
    scheduler.add(() => timeout(time)).then(() => console.log(order));
  };

  addTask(1000, "1");
  addTask(500, "2");
  addTask(300, "3");
  addTask(400, "4");
  // 2 3 1 4
```
