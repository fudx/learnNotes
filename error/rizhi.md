### 先绑定 后new 我分不清了 后new的this 是否指向绑定的函数进行判断 但是函数体是绑定的函数
```
Function.prototype.myBind = function (content,...args1) {
    let self = this
    const fn = function (...args2) {
        return self.apply(this instanceof fn ? this : content,[...args1,...args2])
    }
    if(self.prototype) {
        fn.prototype = Object.create(self.prototype)
    }
    return fn
}
```

### instanceOf 实现
```
left instanceOf right

right.prototype里如果有left 则返回true 否则是right
```
2024.8.20