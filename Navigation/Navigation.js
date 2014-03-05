var blockHeight=850;

function resetNavigationDiv(){
	$offset = $('.placeholder').offset();
	
	var offsetY=window.pageYOffset;
	var alpha=0;
	var navigationTop=0;
	
	if (offsetY<400){
		alpha=1-offsetY % blockHeight % 40 / 40;
		navigationTop=0;
	}
	else {
		navigationTop=Math.floor((offsetY + 400)/ blockHeight ) * blockHeight;
			if (offsetY>=navigationTop){
				alpha=1-offsetY % blockHeight % 40 / 40;
			}
		else {
			if ( (navigationTop-offsetY) % 400 ==0) alpha=0;
			else {
				alpha=1-(navigationTop-offsetY) /400;
			}	
		}
		
	}
	

	$('.mainNavigationDiv').css({	
		'position':'absolute',
		 'top':navigationTop +'px', 
		 'left':$offset.left+'px',
		 'z-index':'9',
		 'opacity':alpha,
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



