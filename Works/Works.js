var $tempItem;
var $tempBg;
var itemWidth;
var itemHeight;
var itemTop;
var itemLeft;

function clickWorksItem($item)
{
	itemTop=getTop($item);
	itemLeft=getLeft($item);
	itemWidth=($item).width();
	itemHeight=($item).height();

	var marginLeft=getLeft($('#worksDiv'))-itemLeft;
	
//	var marginTop=getTop($('#worksDiv'))-itemTop;  //呈现在worksDiv上
	var marginTop=$('body').scrollTop()-itemTop;	//呈现在中间;
	var worksDivWidth=$('#worksDiv').width();
	var worksDivHeight=$('#worksDiv').height();
//	
	
	var itemId=$item.attr("id");
	
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
		'overflow':'auto',
	});
	
	$tempBg.show();
	
	
	if ($tempItem==null){

		$tempItem=$("<div id='tempItem'> <div id='tempItemImage'></div> </div>");
		$('#startWorks').append($tempItem);
		$itemShowDiv=$(".itemShowDiv");
		$itemShowDiv.remove();
		$tempItem.append($itemShowDiv);
	}
	
	
	$("#tempItemImage").css({
		'background':'url('+ $item.attr("launchImage") + ')',
		'width':worksDivWidth+'px',
		'height':worksDivHeight+'px',
		'max-height':'100%',
		'background-size':'100% 100%',
		'background-repeat':'no-repeat',
		'display':'block',
	});
	$tempItem.css({
		'position':'absolute',
		'top':itemTop+'px',
		'left':itemLeft+'px',
		'width':itemWidth+'px',
		'height':itemHeight+'px',
		'display':'none',
		'overflow-x':'hidden',
		'overflow-y':'scroll',
		'z-index':'998'
	}).fadeIn("fast").animate({
			'margin-left':marginLeft+'px',
			'margin-top':marginTop+'px',
			'width':worksDivWidth+'px',
			'height':worksDivHeight+'px',
			'height':'100%',
		},"fast",function(){
			setTimeout(function(){
				$("#tempItemImage").fadeOut("fast");
				$(".itemShowDiv").css({
					'display':'block',
					'width':worksDivWidth+'px',
					'height':worksDivHeight+'px',
					'overflow-y':'scroll',
					'z-index':'999',
				});
			},"600");
		});
	showWork(itemId);
}	

function showWork(itemId)
{
	$.post("Works/WorksItem.php",{id:itemId},function(data){
		var obj=JSON.parse(data);
		$(".itemShowName").html(obj.name);
		$(".itemShowDescription").html(obj.description);
		var screenImageShootAdd=obj.screenShoot.split(",");
		var htmlStr="";
		for (var i=0; i<screenImageShootAdd.length; i++){
			htmlStr+="<img src='"+screenImageShootAdd[i]+ "'\>";
		}
		
		$(".itemShowScreenShoot").html(htmlStr);
		$('.itemViewInITunes').attr('href',obj.itunsLink); 
		
		$(".itemAuthor").html(obj.author);
		
		$('.itemViewInITunes').unbind("click");
		$(".itemViewInITunes").click(function(){
			window.open(obj.itunsLink);
		});
	});
}


function closeWorksItem()
{
	$(".itemShowDiv").hide();
	$tempItem.css({
		'position':'absolute',
		'margin-left':'0px',
		'margin-top':'0px',
		'top':itemTop+'px',
		'left':itemLeft+'px',
		'width':itemWidth+'px',
		'height':itemHeight+'px',
		'background-size':'100% 100%',
		'background-repeat':'no-repeat',
		'display':'none',
		'z-index':'998'
	}).fadeOut('fast',function(){
		$tempBg.hide();
		$('body').css({
			'overflow':'auto',
		});
	});
	
}

var nowSelect=1;
var isAnimate=false;
function moveGallery(select)
{

	if (nowSelect==select || isAnimate) return ;
	isAnimate=true;
	
	var gallerDiv = document.getElementsByClassName('galleryDiv')[0];
	var wheelPosition=($(gallerDiv).width())*(select-1);
	wheelPosition+=2*(select-1);
	$(".galleryMoveContainer").animate({left:-wheelPosition},"fast",function(){
		isAnimate=false;
		nowSelect=select;
	});
}


$(".worksDiv").ready(function(){
	$(".worksItem").hover(function(){
		$(this).css({'background':'url('+$(this).attr("iconHover")+')', 'background-size':'100% 100%','cursor':'pointer' });
	},function(){
		$(this).css({'background':'url('+$(this).attr("icon")+')', 'background-size':'100% 100%','cursor':'default' });
	});
	
	$(".worksItem").click(function(){
		clickWorksItem($(this));
		
	});
	
	$(".worksIndicateItem").click(function(){
		
		$(".worksIndicateItem").removeClass("selected");
		$(this).addClass("selected");
		moveGallery(this.id);
	});
});

$(".itemShowDiv").ready(function(){
	$(".closeShowItem").click(function(){
		
	});
});


