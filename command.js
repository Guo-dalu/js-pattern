/*
绘制按钮， 和按钮点击事件的解耦

*/

const setCommand = (btn, command) => {
  btn.onclick = () => {
    command.execute()
  }
}

const menuBar = {
  refresh: () => {
    console.log("refresh")
  }
}

class RefreshMenuBarCommand {
  constructor(receiver) {
    this.receiver = receiver
  }
  execute() {
    this.receiver.refresh()
  }
}

const refreshMenuBarCommand = new RefreshMenuBarCommand(menuBar)

setCommand(btn1, refreshMenuBarCommand)

const setCommand = (btn, cb) => {
  btn.onclick = () => {
    cb()
  }
}

/* 过度设计，函数可以直接传
  命令模式是 回调函数 在面向对象编程中的 替代品

  需要有有一个receiver, recevier去做具体的事情，而command 提供了execute ，让recevier去执行
  可以用于redo 和 undo
*/

var Ryu = {
  attack: function() {
    console.log("攻击")
  },
  defense: function() {
    console.log("防御")
  },
  jump: function() {
    console.log("跳跃")
  },
  crouch: function() {
    console.log("蹲下")
  }
}

var makeCommand = function(receiver, state) {
  // 创建命令
  return function() {
    receiver[state]()
  }
}
var commands = {
  "119": "jump", // W
  "115": "crouch", // S
  "97": "defense", // A
  "100": "attack" // D
}

var commandStack = [] // 保存命令的堆栈
document.onkeypress = function(ev) {
  var keyCode = ev.keyCode,
    command = makeCommand(Ryu, commands[keyCode])
  if (command) {
    command() // 执行命令
    commandStack.push(command) // 将刚刚执行过的命令保存进堆栈
  }
}

document.getElementById("replay").onclick = function() {
  // 点击播放录像
  var command
  while ((command = commandStack.shift())) {
    // 从堆栈里依次取出命令并执行
    command()
  }
}

// 宏命令是一组命令的集合，想想gulp
// https://riptutorial.com/gulp/example/13423/concat-and-uglify-js-and-css-files
