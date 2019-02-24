/**
 * 父类和子类之间的继承
 * 抽象类和实例类
 */

// class Beverage {
//   constructor() {
//     this.init()
//   }

//   init() {
//     this.boilWater()
//     this.brew()
//     // this.pourInCup()
//     // this.addCondiments()
//   }

//   boilWater() {
//     console.log("煮沸水")
//   }

//   brew() {
//     throw new Error("子类必须重写brew方法")
//   }
// }

// class Tea extends Beverage {
//   brew() {
//     console.log("泡茶")
//   }
// }

// let tea = new Tea()

/**
 * 有时候不是四个步骤而是三个步骤，步骤会有变化
 * 钩子方法：隔离变化，子类决定要不要挂钩
 */

class Beverage {
  constructor(isNeedConfiments) {
    this.isNeedConfiments = isNeedConfiments || false
    this.init()
  }

  init() {
    this.boilWater()
    this.brew()
    // this.pourInCup()
    if (this.isNeedConfiments) {
      // hook
      this.addCondiments()
    }
  }

  boilWater() {
    console.log("煮沸水")
  }

  brew() {
    throw new Error("子类必须重写brew方法")
  }

  addCondiments() {
    console.log("加奶加糖")
  }
}

class Tea extends Beverage {
  constructor(isNeedConfiments) {
    super(isNeedConfiments)
  }

  brew() {
    console.log("泡茶")
  }
}

let tea = new Tea(true)

class BlackCoffee extends Beverage {
  constructor() {
    super(false)
  }

  brew() {
    console.log("手冲黑咖啡")
  }
}

let blackCoffee = new BlackCoffee()

/**
 * 好莱坞原则：不要来找我，我会给你打电话
 * 底层组件挂钩到高层组件中，高层组件决定什么时候以何种方式去使用这些底层组件
 * 父类通知子类，哪一个方法应该在何时调用，子类只负责提供设计上的细节
 * 发布-订阅模式和回调函数也是好莱坞原则的体现
 *
 */

/**
 * 不需要继承的模板方法
 */

var Beverage = function(param) {
  var boilWater = function() {
    console.log("把水煮沸")
  }
  var brew =
    param.brew ||
    function() {
      throw new Error("必须传递brew 方法")
    }
  var pourInCup =
    param.pourInCup ||
    function() {
      throw new Error("必须传递pourInCup 方法")
    }
  var addCondiments =
    param.addCondiments ||
    function() {
      throw new Error("必须传递addCondiments 方法")
    }
  var F = function() {}
  F.prototype.init = function() {
    boilWater()
    brew()
    pourInCup()
    addCondiments()
  }
  return F
}
var Coffee = Beverage({
  brew: function() {
    console.log("用沸水冲泡咖啡")
  },
  pourInCup: function() {
    console.log("把咖啡倒进杯子")
  },
  addCondiments: function() {
    console.log("加糖和牛奶")
  }
})

var Tea = Beverage({
  brew: function() {
    console.log("用沸水浸泡茶叶")
  },
  pourInCup: function() {
    console.log("把茶倒进杯子")
  },
  addCondiments: function() {
    console.log("加柠檬")
  }
})
var coffee = new Coffee()
coffee.init()
var tea = new Tea()
tea.init()

/**
 * coffee / tea 都是传参生成的，返回了构造器F
 * js中，高阶函数是更好的选择
 */