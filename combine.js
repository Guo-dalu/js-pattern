/*
部分--整体的层次结构
通用模板，功能的组合，共同达到某个目的。

利用对象的多态性，统一对待组合对象和单个对象（都是execute)

叶子形状，遍历每个命令
*/

var MacroCommand = function() {
  return {
    commandsList: [],
    add: function(command) {
      this.commandsList.push(command)
    },
    execute: function() {
      for (var i = 0, command; (command = this.commandsList[i++]); ) {
        command.execute()
      }
    }
  }
}
var openAcCommand = {
  execute: function() {
    console.log("打开空调")
  }
}
/**********家里的电视和音响是连接在一起的，所以可以用一个宏命令来组合打开电视和打开音响的命令
 *********/
var openTvCommand = {
  execute: function() {
    console.log("打开电视")
  }
}
var openSoundCommand = {
  execute: function() {
    console.log("打开音响")
  }
}
var macroCommand1 = MacroCommand()
macroCommand1.add(openTvCommand)
macroCommand1.add(openSoundCommand)
/*********关门、打开电脑和打登录QQ 的命令****************/
var closeDoorCommand = {
  execute: function() {
    console.log("关门")
  }
}
var openPcCommand = {
  execute: function() {
    console.log("开电脑")
  }
}
var openQQCommand = {
  execute: function() {
    console.log("登录QQ")
  }
}
var macroCommand2 = MacroCommand()
macroCommand2.add(closeDoorCommand)
macroCommand2.add(openPcCommand)
macroCommand2.add(openQQCommand)
/*********现在把所有的命令组合成一个“超级命令”**********/
var macroCommand = MacroCommand()
macroCommand.add(openAcCommand)
macroCommand.add(macroCommand1)
macroCommand.add(macroCommand2)
/*********最后给遥控器绑定“超级命令”**********/
var setCommand = (function(command) {
  document.getElementById("button").onclick = function() {
    command.execute()
  }
})(macroCommand)

/* 类似DFS搜索整个树
 大的对象里套小的对象

 组合模式不是父子关系，只是委托

 对一组叶对象的操作要一致（execute）

 单一的从属于某个父对象，过节费从公司发到每个部门，再到每个员工。但是田经理不但是技术，还是产品，同时又是客服，就会执行3次，收到3份圣诞红包。因此不适用于组合模式。此时应当建立双向的映射。

 职责链模式提高性能（手动设定链条）
 
*/

// 引用父对象（有点像dom节点）
var Folder = function(name) {
  this.name = name
  this.parent = null //增加this.parent 属性
  this.files = []
}

Folder.prototype.add = function(file) {
  file.parent = this //设置父对象
  this.files.push(file)
}

Folder.prototype.scan = function() {
  console.log("开始扫描文件夹: " + this.name)
  for (var i = 0, file, files = this.files; (file = files[i++]); ) {
    file.scan()
  }
}

Folder.prototype.remove = function() {
  if (!this.parent) {
    //根节点或者树外的游离节点
    return
  }
  for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
    var file = files[l]
    if (file === this) {
      files.splice(l, 1)
    }
  }
}

var File = function(name) {
  this.name = name
  this.parent = null
}

File.prototype.add = function() {
  throw new Error("不能添加在文件下面")
}

File.prototype.scan = function() {
  console.log("开始扫描文件: " + this.name)
}

File.prototype.remove = function() {
  if (!this.parent) {
    //根节点或者树外的游离节点
    return
  }

  for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
    var file = files[l]
    if (file === this) {
      files.splice(l, 1)
    }
  }
}

var folder = new Folder("学习资料")
var folder1 = new Folder("JavaScript")
var file1 = new Folder("深入浅出Node.js")

folder1.add(new File("JavaScript 设计模式与开发实践"))
folder.add(folder1)
folder.add(file1)
folder1.remove() //移除文件夹
folder.scan()

// 缺点：系统中的每个对象都看起来差不多，只有运行起来才能看出来err, 难以理解
// 如果通过组合模式创建了太多的对象，可能会影响性能