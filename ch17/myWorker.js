/*  myWorker.js  
     ÿ��1���������10��10-99֮�������
*/
var tenIntger = new Array(); //���屣�����2λ����
function createTenIntger() { //����10���������
	for (var j = 0; j < 10; j++) //ѭ��10��
	{ //������ѧ�����������10~99֮���������������������
		tenIntger[j] = Math.floor(Math.random() * 90 + 10);
	}
	postMessage(tenIntger.sort()); //����Ԫ������󴫵ݸ����߳�
	setTimeout("createTenIntger()", 1000); //ÿ��1�����²���1��
}
createTenIntger(); //���÷���
