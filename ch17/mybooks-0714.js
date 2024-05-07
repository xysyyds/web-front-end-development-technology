/* mybooks.js */
/* 3.交互行为设计 */
// 3.1 系统变量初始化
var db = null; //定义保存数据对象结果集的变量
var request;
var objStore1;
var DBName = "myBooks";
var DBVersion = 1; //定义数据库名称和版本号
var bookLists = [{
		title: "Web前端开发技术-Html、Css、JavaScript",
		author: "储久良",
		isbn: "9787302431695"
	},
	{
		title: "计算机组成原理(修订版)",
		author: "张功萱",
		isbn: "9787302433637"
	},
	{
		title: "HTML/CSS/JavaScript标准教程",
		author: "本书编委会",
		isbn: "9787121079344"
	},
	{
		title: "HTML+CSS网页设计与布局从入门到精通",
		author: "温谦",
		isbn: "9787115183392"
	},
	{
		title: "Java 2实用教程(第5版)",
		author: "耿祥义",
		isbn: "9787302464259 "
	}
];

//3.2 浏览器的支持判断
var indexedDB = window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webkitIndexedDB;
//3.3 定义 创建indexedDB数据库的方法，并监听3个事件
function initDB() {
	request = indexedDB.open(DBName, DBVersion); //返回一个IDBrequest对象     
	request.onerror = function(event) {
		//alert("打开数据库失败:"+event.target.message);
		console.log("打开数据库失败:" + event.target.message);
	}
	request.onsuccess = function(event) {
		alert("打开数据库成功!");
		//console.log("打开数据库成功!");
		db = event.target.result; //给db赋值		
	}
	request.onupgradeneeded = function(event) {
		alert("版本变化！");
		console.log("版本变化！");
		db = event.target.result;
		//为books对象仓库创建事件对象      
		objStore1 = db.createObjectStore("books", {
			keyPath: "isbn"
		}); //创建对象仓库
		var trans1 = db.transaction(["books"], "readwrite");
		objStore1 = trans1.objectStore("books"); //获取books对象仓库 
		objStore1.createIndex("by_title", 'title', {
			unique: false
		});
		objStore1.createIndex("by_author", 'author', {
			unique: false
		});
		objStore1.createIndex("by_isbn", 'isbn', {
			unique: true
		});
		loadBooks(); //初始化图书
	}
}
//3.4 启动创建数据库事件处理程序
initDB(); //数据库初始化
function $(id) {
	return document.getElementById(id);
}

function loadBooks() { //初始化加载5本图书
	alert("添加图书开始...");
	$("booklist").innerHTML = ""; //加载前先清空列表
	for (var i = 0; i < bookLists.length; i++) { //采用for循环将3个对象添加到指定对象仓库
		var request = objStore1.put(bookLists[i]); //put存在则更新，不存在则添加对象到books中
		request.onerror = function() {
			console.error('数据库中已有该对象,不能重复添加！！');
		};
		request.onsuccess = function() { //控制台输出或某个HTML标记内输出
			console.log('对象已成功存入对象仓库中！')
			//console.dir(request.value);
		};
	}
}

function showBooks() { //显示所有图书
	var query = document.forms.list.query.value;
	$("booklist").value = ""; //加载前先清空列表	
	var transaction = db.transaction(["books"], "readonly"); //为books定义只读事件
	var objStore = transaction.objectStore("books"); //获取books对象仓库
	var index = objStore.index("by_title"); //按title进行索引
	var range = IDBKeyRange.only(query); //生成范围range对象
	//alert(range.value);
	var result = (query.length > 0) ? index.openCursor(range) : index.openCursor();
	var i = 1;
	result.onsuccess = function(e) { //打开索引游标，启动成功监听事件
		var cursor = e.target.result; //获取结果集
		if (cursor) { //通过控制台输出相关信息
			text1 = i + "-" + cursor.value.title + "," + cursor.value.author + "," + cursor.value.isbn;
			$("booklist").value += $("booklist").value + text1 + "\n"

			i++;
			cursor.continue(); //下移游标，迭代执行
		}
	};

}

function addBook() {
	//添加一本图书进入客户端图书库
	var title = document.add.title.value;
	var author = document.add.author.value;
	var isbn = document.add.isbn.value;
	var book1 = {
		title: title,
		author: author,
		isbn: isbn
	};
	if (title.length > 0 && author.length > 0 && isbn.length > 0) {
		var trans2 = db.transaction("books", "readwrite");
		var objStore2 = trans2.objectStore("books"); //获取books对象仓库 
		var request1 = objStore2.add(book1);
		trans2.oncomplete = function(event) {
			alert("图书成功添加！界面即将被清空！");
			document.forms.add.title.value = "";
			document.forms.add.author.value = "";
			document.forms.add.isbn.value = "";
			window.location.reload();
			location.hash = "#list";
		};
	}
}

function deleteOne() {
	//删除指定(选中)的图书
}

function deleteDatabase() {
	if (indexedDB) {
		var deleteDB = indexedDB.deleteDatabase("books");
		deleteDB.onsuccess = function(e) {
			alert("数据库删除成功，即将重新初始化...");
			window.location.reload();
		}

	}
}

function deleteAllBooks() {
	var trans1 = db.transaction("books", "readwrite");
	var objStore1 = trans1.objectStore("books");
	objStore1.clear();
	trans1.oncomplete = function(e) {
		alert("所有图书清除成功！");
	}
	trans1.onerror = function(e) {
		alert("所有图书清除失败！");
	}
	window.location.reload();
}
/* 监听hashchange事件，并绑定事件处理函数
       根据hash值，动态地给body修改class属性的值
       完成Section随导航自动切换
 */
window.addEventListener('hashchange', function() {
	switch (location.hash) {
		case "#add":
			document.body.className = "add";
			break;
		case "#setting":
			document.body.className = "setting";
			break;
		default:
			document.body.className = "list";
	}
}, false);
