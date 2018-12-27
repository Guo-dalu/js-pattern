/*
是什么

事件回调
vue中的Pub-sub
bus emit
reducer 的调用结果，存储在 store 内部的 state 中，并在每一次 reducer 的调用中并作为参数传入。
惰性发布，先发布了再订阅，先把发布事件存在栈中，订阅的时候依次执行（重新发布）

优点
 1. pub主动告诉sub，异步编程中常用于替代回调
 2. 解耦


缺点
	 如果用了太多，模块与模块的联系被隐藏到了背后，搞不清来自哪里

 */

 Event.trigger('click', 1)

 Event.listen('click', console.log)

 	_create = function( namespace ){
				var namespace = namespace || _default;
				var cache = {},
				offlineStack = [], // 离线事件
				ret = {
					listen: function( key, fn, last ){
						_listen( key, fn, cache );
						if ( offlineStack === null ){
							return;
						}
						if ( last === 'last' ){
						}else{
							each( offlineStack, function(){
								this();
							});
						}
						offlineStack = null;
					},
