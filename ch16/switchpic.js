/* switchpic.js */
 //����ȫ�ֱ���
 var CurScreen = 1; //��ǰ��ʾ��ͼ��
 var MaxScreen = 5; //�����л�ͼ����
 var timer = null; //��ʱ������
 function $(id) {
 	return document.getElementById(id);
 }

 function switchPic() { //�л�ͼ��������ʱ����
 	if (CurScreen == MaxScreen) {
 		CurScreen = 1;
 	} else {
 		CurScreen++;
 	}
 	//�л�ͼ�����ֵʱ����1
 	$("pic").src = "images/example" + CurScreen + ".png"; //����ͼ����ļ���
 }

 function reStart() { //���¿�ʼ������Ƴ�ʱ����
 	switchPic(); //�л���һ��ͼ
 	init(); //��ʼ��ʱ��
 }

 function pause() { //��ͣ�л��������ͣʱ����
 	clearInterval(timer); //�����ʱ��
 }

 function init() { //��ʼ����������body����ʱ����
 	timer = setInterval('switchPic();', 1000);
 }
