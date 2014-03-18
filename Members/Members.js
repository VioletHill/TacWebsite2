
var nowMemberSelect=1;
var isMemberAnimate=false;
function moveMemberGallery(select)
{
	if (nowMemberSelect==select || isMemberAnimate) return ;
	isMemberAnimate=true;
	
	var gallerDiv = document.getElementsByClassName('membersListContainer')[0];
	var wheelPosition=($(gallerDiv).width())*(select-1);
	wheelPosition+=2*(select-1);
	$(".membersMoveContainer").animate({left:-wheelPosition},"fast",function(){
		isMemberAnimate=false;
		nowMemberSelect=select;
	});
}


$(".membersList").ready(function(){
	$(".membersIndicateItem").click(function(){
		$(".membersIndicateItem").removeClass("membersIndicateSelected");
		$(this).addClass("membersIndicateSelected");
		moveMemberGallery(parseInt(this.id.substring(6)));
	});
	
	$(".membersBox").hover(function(){
		$(this).find(".membersInfo").addClass("membersInfoSelect");
	},function(){
		$(this).find(".membersInfo").removeClass("membersInfoSelect");
	});
});