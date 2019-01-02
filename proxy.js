/*
保护代理：代替receiver拒绝 caller
虚拟代理：把开销大的对象延迟到真正需要的时候再去创建; 合并耗时的请求(throttle)

单一职责原则
注意代理要提供相同接口
*/

// https://github.com/sindresorhus/p-throttle/blob/master/index.js

const pThrottle = (fn, limit, interval) => {
  const queue = new Map()
  let currentTick = 0
  let activeCount = 0

  const throttled = function(...args) {
    let timeout
    return new Promise((resovle, reject) => {
      const execute = () => {
        resovle(fn.apply(this, args))
        queue.delete(timeout)
      }
      const now = Date.now()
      if (now - currentTick > interval) {
        // reset
        activeCount = 1
        currentTick = now
      } else if (activeCount < limit) {
        activeCount++
      } else {
        // when activeCount reaches limit
        currentTick += interval
        activeCount = 1
      }
      console.log('before timeout', timeout)
      timeout = setTimeout(execute, currentTick - now)
      queue.set(timeout, reject)
    })
  }

  return throttled
}

const now = Date.now()

const fn = index => {
  const secDiff = ((Date.now() - now) / 1000).toFixed()
  return Promise.resolve(`${index}: ${secDiff}s`)
}

const throttled = pThrottle(fn, 2, 1000)

for (let i = 1; i <= 6; i++) {
  throttled(i).then(console.log)
}

for (let i = 1; i <= 6; i++) {
  fn(i).then(console.log)
}
