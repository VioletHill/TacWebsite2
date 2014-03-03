var $tempItem;
var $tempBg;
var itemWidth;
var itemHeight;
var itemTop;
var itemLeft;

function clickWorksItem($item){
	itemTop=getTop($item);
	
	itemLeft=getLeft($item);
	itemWidth=($item).width();
	itemHeight=($item).height();
	
	var marginLeft=getLeft($('#worksDiv'))-itemLeft;
	
//	var marginTop=getTop($('#worksDiv'))-itemTop;  //呈现在worksDiv上
	var marginTop=$('body').scrollTop()-itemTop+10;	//呈现在中间;
	var worksDivWidth=$('#worksDiv').width();
	var worksDivHeight=$('#worksDiv').height();

	$('body').css({
		'overflow':'hidden',
	});
	
	if ($tempBg==null){
		$tempBg=$("<div id='overlay'></div>");
		$tempBg.click(function(){
			closeWorksItem();
		});
		$('body').append($tempBg);
	}
	$tempBg.css({
		'position':'absolute',
		'background-color':'black',
		'width':'100%',
		'height':'100%',
		'opacity':'0.5',
		'top':$('body').scrollTop()+'px',
		'left':'0px',
		'z-index':'997',
	});
	
	$tempBg.show();
	
	
	if ($tempItem==null){

		$tempItem=$("<div id='tempItem'></div>");
		$('#startWorks').append($tempItem);
	}
		
	$tempItem.css({
		'position':'absolute',
		'top':itemTop+'px',
		'left':itemLeft+'px',
		'width':itemWidth+'px',
		'height':itemHeight+'px',
		'background':'url(Works/Image/item.png)',
		'background-size':'100% 100%',
		'background-repeat':'no-repeat',
		'display':'none',
		'z-index':'998'
	}).fadeIn("medium").animate({
			'margin-left':marginLeft+'px',
			'margin-top':marginTop+'px',
			'width':worksDivWidth+'px',
			'height':worksDivHeight+'px',
			'background-color':'pink',
		},"medium");
	
}	

function closeWorksItem(){
	$tempItem.animate({
		'position':'absolute',
		'margin-left':'0px',
		'margin-top':'0px',
		'top':itemTop+'px',
		'left':itemLeft+'px',
		'width':itemWidth+'px',
		'height':itemHeight+'px',
		'background':'url(Works/Image/item.png)',
		'background-size':'100% 100%',
		'background-repeat':'no-repeat',
		'display':'none',
		'z-index':'998'
	},"medium").fadeOut('medium',function(){
		$tempBg.hide();
		$('body').css({
			'overflow':'auto',
		});
	});
	
}

$(".worksDiv").ready(function(){
	
	$(".worksItem").click(function(){
		clickWorksItem($(this));
		
	});
	
	$(".worksIndicateItem").click(function(){
		$(".worksIndicateItem").removeClass("selected");
		$(this).addClass("selected");
	});
});

