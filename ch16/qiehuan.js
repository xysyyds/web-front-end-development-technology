/* 切换菜单显示 qiehuan.js */
function qiehuan(num) {
	for (var id = 0; id <= 8; id++) {
		if (id == num) {
			document.getElementById("qh_con" + id).style.display = "block";
			document.getElementById("mynav" + id).className = "nav_on";
		} else {
			document.getElementById("qh_con" + id).style.display = "none";
			document.getElementById("mynav" + id).className = "";
		}
	}
}
