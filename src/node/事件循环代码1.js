console.log('start')

setTimeout(() => {
  console.log('setTimeout1')
}, 0)

setTimeout(() => {
  console.log('setTimeout2')
  Promise.resolve().then(() => {
    console.log('promise')
  })
}, 0)

console.log('end')
