//var blockHeight=850;
var isShowEventTimeLine=false;
function resetNavigationDiv(){
	$offset = $('.placeholder').offset();
	
	var offsetY=window.pageYOffset;
//	var alpha=0;
//	var navigationTop=0;

	if (!isShowEventTimeLine && offsetY+800>=getTop($("#startEvents"))){
		isShowEventTimeLine=true;
		showTimeLine();
	}
	
//	if (offsetY<400){
//		alpha=1-offsetY % blockHeight % 40 / 40;
//		navigationTop=0;
//	}
//	else {
//		navigationTop=Math.floor((offsetY + 400)/ blockHeight ) * blockHeight;
//			if (offsetY>=navigationTop){
//				alpha=1-offsetY % blockHeight % 40 / 40;
//			}
//		else {
//			if ( (navigationTop-offsetY) % 400 ==0) alpha=0;
//			else {
//				alpha=1-(navigationTop-offsetY) /400;
//			}	
//		}
//		
//	}

	$('.mainNavigationDiv').css({	
		'position':'fixed',
		 'top':0+'px', 
		 'left':$offset.left+'px',
		 'z-index':'9',
	 });
}


$(function(){
	$(window).scroll(function(){
		resetNavigationDiv();
	});
	
	$(window).resize(function() {
		resetNavigationDiv();
	})
});

function getTop(elem){
	var e=elem[0];
	if (!e) e=elem;								//这里保证无论带进来的是html元素还是 jquery元素都可以
	
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

$(document).ready(function() {
	$('.navigationItem').click(function() {
		var dest = '#start' + $(this).html();
		// console.log(dest);
		$('html, documentElement').clearQueue().animate({
    		scrollTop: $(dest).offset().top
 		}, 1000);
	});
});



