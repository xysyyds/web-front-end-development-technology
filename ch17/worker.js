//worker.js
onmessage = function(evt) {
	alert("Worker...");
	var d = evt.data; //ͨ��evt.data��÷�����������
	postMessage(d); //����ȡ�������ݷ��ͻ����߳�
}
