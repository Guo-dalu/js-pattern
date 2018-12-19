// 定义一系列的算法，把它们一个个封装起来，并且可以相互替换

// 1. 一组策略，负责具体的计算，2，环境类context，接受用户请求并委托给某一个策略



var calculateBonus = fucntion(level, salary) {
  if(level === 's') {
    return salary * 4
  }
  if(level === 'a') {
    return salary * 3
  }
  if(level === 'b') {
    return salary * 2
  }
}

var strategies = {
  s: (salary) => (salary * 4),
  a: salary => (salary *3),
  b: salary => (salary * 2)
}

var calculateBonus = (level, salary) => (strategies[level](salary))



// 表单校验

registerForm.onsubmit = () => {
  if(registerForm.username === '') {
    alert('no emtpy username')
    return false
  }
  if(registerForm.password.length < 6) {
    alert('require longer password')
    return false
  }
  if(!/^1[0-9]${10}$/.test(registerForm.phone)) {
    alert('require right phone number')
    return false
  }
}

/*
- if-else 庞大
- 缺乏弹性，需要深入内部实现
- 复用性差

需要 多态 可组合 委托 开闭原则 复用
在函数作为一等对象的语言中，策略模式是隐形的，strategy就是值为函数的变量
不用类，还可以用高阶函数

var calculateBonus = (func, salary) => (func(salary))
*/



// 组合策略

var strategies = {
  isNonEmpty(value, errormsg) {
    if (!value) {
      return errormsg
    }
  },
  minLength(value, length, errormsg) {
    if (value.length < length) {
      return errormsg
    }
  },
  isMobile(value, errormsg) {
    if (!/^1[0-9]{10}$/.test(value)) {
      return errormsg
    }
  }
}

class Validator {
  constructor() {
    this.cache = []
  }

  add(value, rules) {
    var self = this
    rules.forEach(rule => {
      (rule => {
        var strategiesArr = rule.strategy.split(":")
        var errormsg = rule.errormsg
        this.cache.push(() => {
          var strategy = strategiesArr.shift()
          strategiesArr.unshift(value)
          strategiesArr.push(errormsg)
          return strategies[strategy].apply(value, strategiesArr)
        })
      })(rule)
    })
  }

  start() {
    var errormsg
    this.cache.some(validateFunc => {
      if ((errormsg = validateFunc())) {
        return true
      }
      return false
    })
    return errormsg
  }
}

var validate = form => {
  var validator = new Validator()
  validator.add(form.username, [
    {
      strategy: "isNonEmpty",
      errormsg: "not allowed empty"
    },
    {
      strategy: "minLength:6",
      errormsg: "should longder than 6 character"
    }
  ])
  validator.add(form.phonenumber, [
    {
      strategy: "isMobile",
      errormsg: "wrong phone number"
    }
  ])
  var errormsg = validator.start()
  return errormsg
}

var form = {
  username: "323423423",
  phonenumber: "15116767676"
}

console.log(validate(form))
