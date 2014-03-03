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



