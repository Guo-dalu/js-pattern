var getSingle = fn => {
  var result
  return result || (result = fn.apply(this, arguments))
}

var createLoginLayer = () => {
  var div = document.createElement("div")
  div.innerHTML = "login panel"
  div.style.display = "none"
  document.body.appendChild(div)
  return div
}

var createSingleLoginLayer = getSingle(createLoginLayer)

// 渲染完列表后，给这个列表绑定click事件，动态追加数据，只需要绑定一次

var bindEvent = () => {
  $("div").one("click", () => {
    alert("click")
  })
}

var bindEvent = getSingle(() => {
  document.getElementById("div1").onclick = () => {
    alert("click")
  }
  return true
})

var render = () => {
  console.log("start")
  bindEvent()
}

render()
render()
render()

// 事件代理