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
	if (!e) e=elem;								//传递的无论是jquery元素还是dom元素 在这里都被划为dom元素
												//jquery元素为一个数组 因此转化为dom元素只要get(0) 或者[0] 就可以
												//!e的意思是 e=undefined 即传dom元素时，e=elem[0]后 e是一个undefined
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



