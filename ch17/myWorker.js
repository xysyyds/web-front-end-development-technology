/*  myWorker.js  
     每隔1秒随机产生10个10-99之间的整数
*/
var tenIntger = new Array(); //定义保存随机2位整数
function createTenIntger() { //产生10个随机整数
	for (var j = 0; j < 10; j++) //循环10次
	{ //利用数学函数随机产生10~99之间的整数，并存入数组中
		tenIntger[j] = Math.floor(Math.random() * 90 + 10);
	}
	postMessage(tenIntger.sort()); //数组元素排序后传递给主线程
	setTimeout("createTenIntger()", 1000); //每隔1秒重新产生1次
}
createTenIntger(); //调用方法
