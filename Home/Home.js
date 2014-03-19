function showVideo(){
	$(".homeNormalDiv").fadeOut("medium",function(){
		$(".homeVideoDiv").fadeIn("medium",function(){
			var video=document.getElementById("homeVideo");
			video.load();
			video.play();
		});
		
	});
}

function videoEnd(){
	var video=document.getElementById("homeVideo");
	video.pause();
	$(".homeVideoDiv").fadeOut("medium",function(){
		$(".homeNormalDiv").fadeIn("medium");
	});
}

$(".homeDiv").ready(function(){
	$(".homeSeeVideo").click(function(){
		showVideo();
	});
	
	$(".videoClose").click(function(){
		videoEnd();
	});
});


