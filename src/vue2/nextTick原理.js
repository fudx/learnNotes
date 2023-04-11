const callback = []
let pending = false
const flushCallback = ()=>{
    const copies = callback.slice()
    for(let i = 0; i < copies.length; i++) {
        copies[i]()
    }
    callback.length = 0
}
const timerFunc = ()=> Promise.resolve().then(flushCallback)
function nextTick(cb){
    callback.push(()=>{
        cb()
    })
    if(pending == false) {
        pending = true
        timerFunc()
    }
}