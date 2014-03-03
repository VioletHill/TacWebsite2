function resetNavigationDiv(){
	$offset = $('.placeholder').offset();
	$('.mainNavigationDiv').css({	
		'position':'fixed',
		 'top':'0px', 
		 'left':$offset.left+'px',
		 'z-index':'9'
	 });	 
}


$(function(){
	$(window).scroll(function(){
		resetNavigationDiv();
	});
});

function getTop(elem){
	var e=elem[0];
	if (!e) e=elem;								//���ݵ�������jqueryԪ�ػ���domԪ�� �����ﶼ����ΪdomԪ��
												//jqueryԪ��Ϊһ������ ���ת��ΪdomԪ��ֻҪget(0) ����[0] �Ϳ���
												//!e����˼�� e=undefined ����domԪ��ʱ��e=elem[0]�� e��һ��undefined
	var offset=e.offsetTop;
	if (e.offsetParent!=null) offset+=getTop(e.offsetParent);
	return offset;
}

function getLeft(elem){
	var e=elem[0];
	if (!e) e=elem;
	var offset=e.offsetLeft;
	if (e.offsetParent!=null) offset+=getLeft(e.offsetParent);
	return offset;
}



