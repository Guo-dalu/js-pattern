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
