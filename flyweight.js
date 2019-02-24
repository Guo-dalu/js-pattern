/**
 * 运用共享技术来有效支持大量细粒度的对象
 * 将对象的状态划分为内部状态和外部状态：state/props
 * 内部状态存储于对象内部
 * 内部状态可以被一些对象共享
 * 内部状态独立于具体的场景，通常不会改变
 * 外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享
 */

var Model = function(sex) {
  this.sex = sex
}
Model.prototype.takePhoto = function() {
  console.log("sex= " + this.sex + " underwear=" + this.underwear)
}

var maleModel = new Model("male"),
  femaleModel = new Model("female")

for (var i = 1; i <= 50; i++) {
  maleModel.underwear = "underwear" + i
  maleModel.takePhoto()
}

for (var j = 1; j <= 50; j++) {
  femaleModel.underwear = "underwear" + j
  femaleModel.takePhoto()
}

/**
 * sex是内部状态，underwear是外部状态
 * 内部状态有多少种组合，系统中就存在多少个对象
 * 使用享元模式的关键就在于区分 state 和 props
 */

/**
 * 文件上传
 * 也许并不是一开始就需要new两个对象，用对象工厂来解决
 * 手动set props 改为由Manager管理
 */
var Upload = function(uploadType) {
  this.uploadType = uploadType
}

Upload.prototype.delFile = function(id) {
  uploadManager.setExternalState(id, this) // (1)
  if (this.fileSize < 3000) {
    return this.dom.parentNode.removeChild(this.dom)
  }

  if (window.confirm("确定要删除该文件吗? " + this.fileName)) {
    return this.dom.parentNode.removeChild(this.dom)
  }
}

var UploadFactory = (function() {
  var createdFlyWeightObjs = {}
  return {
    create: function(uploadType) {
      if (createdFlyWeightObjs[uploadType]) {
        return createdFlyWeightObjs[uploadType]
      }
      return (createdFlyWeightObjs[uploadType] = new Upload(uploadType))
    }
  }
})()

var uploadManager = (function() {
  var uploadDatabase = {}
  return {
    add: function(id, uploadType, fileName, fileSize) {
      var flyWeightObj = UploadFactory.create(uploadType)
      var dom = document.createElement("div")
      dom.innerHTML =
        "<span>文件名称:" +
        fileName +
        ", 文件大小: " +
        fileSize +
        "</span>" +
        '<button class="delFile">删除</button>'
      dom.querySelector(".delFile").onclick = function() {
        flyWeightObj.delFile(id)
      }

      document.body.appendChild(dom)
      uploadDatabase[id] = {
        fileName: fileName,
        fileSize: fileSize,
        dom: dom
      }
      return flyWeightObj
    },
    setExternalState: function(id, flyWeightObj) {
      var uploadData = uploadDatabase[id]
      for (var i in uploadData) {
        flyWeightObj[i] = uploadData[i]
      }
    }
  }
})()

var id = 0
window.startUpload = function(uploadType, files) {
  for (var i = 0, file; (file = files[i++]); ) {
    var uploadObj = uploadManager.add(
      ++id,
      uploadType,
      file.fileName,
      file.fileSize
    )
  }
}

startUpload("plugin", [
  {
    fileName: "1.txt",
    fileSize: 1000
  },
  {
    fileName: "2.html",
    fileSize: 3000
  },
  {
    fileName: "3.txt",
    fileSize: 5000
  }
])
startUpload("flash", [
  {
    fileName: "4.txt",
    fileSize: 1000
  },
  {
    fileName: "5.html",
    fileSize: 3000
  },
  {
    fileName: "6.txt",

    fileSize: 5000
  }
])
