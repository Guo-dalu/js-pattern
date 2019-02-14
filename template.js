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
    console.log('手冲黑咖啡')
  }
}

let blackCoffee = new BlackCoffee()

/**
 * 好莱坞原则：不要来找我，我会给你打电话
 * 底层组件挂钩到高层组件中，高层组件决定什么时候以何种方式去使用这些底层组件
 * 
 */