console.log('start')

setTimeout(() => {
  console.log('setTimeout')
}, 0)

setImmediate(() => {
  console.log('setImmediate')
})

Promise.resolve().then(() => {
  console.log('promise')
})

console.log('end')
