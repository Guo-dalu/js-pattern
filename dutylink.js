/**
 * 职责链依次传递
 * 作用域链，原型链，事件冒泡
 */
function order500(orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('order 500 sucess')
  } else {
    return 'next'
  }
}

function order200(orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log('order 200 sucess')
  } else {
    setTimeout(() => {
      this.next(orderType, pay, stock)
    }, 1000)
  }
}

function orderNormal(orderType, pay, stock) {
  if (stock > 0) {
    console.log('order normal sucess')
  } else {
    console.log('order failed')
  }
}

class Chain {
  constructor({
    fn,
    successor
  }) {
    this.fn = fn
    this.successor = successor
  }

  passRequest() {
    const ret = this.fn.apply(this, arguments)
    if (ret === 'next') {
      return this.successor && this.successor.passRequest.apply(this.successor, arguments)
    }
    return ret
  }

  next() {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments)
  }
}

const chainOrderNormal = new Chain({
  fn: orderNormal
})
const chainOrder200 = new Chain({
  fn: order200,
  successor: chainOrderNormal
})
const chainOrder500 = new Chain({
  fn: order500,
  successor: chainOrder200
})

// chainOrder500.passRequest(1, false, 10)

/**
 * 优点：
 * 1. 将条件分支语句拆成了一个个互不影响的小函数
 * 2. 链中的节点对象可以灵活地拆分重组
 * 3. 可以手动指定起始节点
 * 
 * 缺点：
 * 1. 不能保证某个请求一定会被节点处理到，需要兜底函数
 * 2. 大部分节点对象do nothing， 只是让请求传递了下去
 */

 /** AOP 缺点是叠加了函数的作用域，可能对性能有影响*/

 Function.prototype.after = function(fn) {
    const self = this  
    return function() {
      const ret = self.apply(this, arguments)
      return ret === 'next'? fn.apply(this, arguments) : ret
    }
 } 

 const order = order500.after(orderNormal)

 order(1, false, 0)