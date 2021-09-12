const { SyncHook, AsyncSeriesHook } = require('tapable')


class Car {
  constructor() {
    // 电池
    this.battery = 10
    // 一个同步充电方法，一个异步
    this.hooks = {
      charging: new AsyncSeriesHook(["source", "target", "routesList"]),
      powerBank: new SyncHook(['chon'])
    }
  }
}

const myCar = new Car()
// 绑定

// 绑定同步钩子 并传参
myCar.hooks.powerBank.tap('aa', (who) => {
  console.log(who)
  who.battery += 10
})
// 绑定一个异步Promise钩子
myCar.hooks.charging.tapPromise('bb', (source, target, routesList, callback) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`tapPromise to ${source}  ${routesList}`)
      target.battery += 40
      resolve()
    }, 2000);
  })
})

console.time('cost')
console.log(myCar.battery);
// 执行

myCar.hooks.powerBank.call(myCar)
myCar.hooks.charging.promise('Async', myCar, 'demo').then(() => {
  console.timeEnd('cost')
  console.log(myCar.battery);

})


console.log(myCar.battery);

