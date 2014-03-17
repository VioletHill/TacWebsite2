//programmer mark --  time line

//两个坐标之间最小相差 100 最大150 maxDay
var repeatTime=0;
var maxRepeatTimeLine=50;			//在线画出后 出现时间点的运动轨迹  画线持续时间
var maxRepeatTimeEvent=50;			//运动持续时间
var maxOffsetTimeEvent=10;			//运动最大偏移
var nowOffsetEventTime;
var event=new Array();
var eventTime=new Array();
var eventImage=new Array();

function getMonthNo(monthStr)			//根据一个month的字符串转化为数字返回
{
	monthStr=monthStr.substring(0,3);
	if (monthStr=="Jan") return 1;
	if (monthStr=="Feb") return 2;
	if (monthStr=="Mar") return 3;
	if (monthStr=="Apr") return 4;
	if (monthStr=="May") return 6;
	if (monthStr=="Jun") return 7;
	if (monthStr=="Jul") return 8;
	if (monthStr=="Sep") return 9;
	if (monthStr=="Oct") return 10;
	if (monthStr=="Nov") return 11;
	if (monthStr=="Dec") return 12;
}


function compareDate(dateOne,dateTwo)		//比较两个日期 dateOne 大于 dateTwo 返回1  小于 返回-1  等于 返回 0
{
	var yearOne=parseInt( dateOne.substring(0,4) );
	var yearTwo=parseInt( dateTwo.substring(0,4) );
	if (yearOne>yearTwo) return 1;
	else if (yearOne<yearTwo) return -1;
	else {
		var monthOne=getMonthNo( dateOne.substring(4,7) );
		var monthTwo=getMonthNo(dateTwo.substring(4,7) );
		if (monthOne<monthTwo) return -1;
		else if (monthOne>monthTwo) return 1;
		else {
			var dayOne=parseInt( dateOne.substring(7) );
			var dayTwo=parseInt( dateTwo.substring(7) );
			if (dateOne>dateTwo) return 1;
			else if (dateOne<dateTwo) return -1;
			else return 0;
		}
	}
}

var monthDays=[0,31,59,90,120,151,181,212,243,273,304,334];
var maxDay=150;

function getDifferentialDateWith2000(year,month,day) 		//与2000年1月1日差几天
{
	var days=(year-2000)*365;				
	days=days+Math.floor((year-2000)/4)+1;					//中间有几个论年
	if ((year-2000)%4==0 && month>2) days=days+1;			//2004年 论年+1
	days=days+monthDays[month-1]+day;
	return days;
}


function getDifferentialDate(dateOne,dateTwo)			//两个日期差值在maxDay天以内 返回差值  maxDay天以外 直接返回maxDay
{
	var compareResult = compareDate(dateOne, dateTwo);
	if (compareResult==0) return 0;
	else if (compareResult==1){
		var tmp=dateOne;
		dateOne=dateTwo;
		dateTwo=tmp;
	}
	
	var yearOne=parseInt(dateOne.substring(0,4));
	var yearTwo=parseInt(dateTwo.substring(0,4));
	var monthOne=getMonthNo(dateOne.substring(4,7));
	var monthTwo=getMonthNo(dateTwo.substring(4,7));
	var dayOne=parseInt(dateOne.substring(7));
	var dayTwo=parseInt(dateTwo.substring(7));

	if (yearTwo-yearOne>=2) return maxDay;				//仅仅比较年差在一年内的
	var two=getDifferentialDateWith2000(yearTwo, monthTwo, dayTwo);
	var one=getDifferentialDateWith2000(yearOne, monthOne, dayOne);

	return Math.min(maxDay,two-one);
	
}

function getEventDelayTime(repeatTime,maxRepeatTime,offsetTime,a)	//加速度  数字越大 加速度越慢
{
	if (repeatTime<maxRepeatTime){
		return Math.min(2,repeatTime*a);
	}
	else if (repeatTime==maxRepeatTime+offsetTime) return 100;
	else if (repeatTime<maxRepeatTime+offsetTime) return (repeatTime-maxRepeatTime)*a+2;
	else return (maxRepeatTime+2*offsetTime-repeatTime)*a+2;
}


function showTimeLine()
{
	if (repeatTime>=maxRepeatTimeLine+maxRepeatTimeEvent+maxOffsetTimeEvent*2) return ;
	drawTimeLine();

	if (repeatTime<maxRepeatTimeLine){
		repeatTime++;
		setTimeout("showTimeLine()",10);
	}
	else {
		repeatTime++;
		
		nowOffsetEventTime=getOffsetEventTime(repeatTime-maxRepeatTimeLine,maxRepeatTimeEvent,maxOffsetTimeEvent,50)+50;
		var drawEventAlpha=Math.min((repeatTime-maxRepeatTimeLine)/maxRepeatTimeEvent,1);
		
		drawEvent(nowOffsetEventTime, drawEventAlpha);
		
		setTimeout("showTimeLine()",getEventDelayTime(repeatTime-maxRepeatTimeLine,maxRepeatTimeEvent,maxOffsetTimeEvent),2);
	}
}

function addLine(ax,ay,bx,by,context)
{
	context.moveTo(ax,ay);
	context.lineTo(bx,by);
	context.stroke();
}


function drawTimeLine()
{
	var canvas=document.getElementById('timeLineCanvas');
	var ctx=canvas.getContext('2d');
	var width=canvas.width;
	var height=canvas.height;
	ctx.clearRect(0,0,width,height);
	ctx.strokeStyle="#61c0d7";
	ctx.globalAlpha=0.2*repeatTime/maxRepeatTimeLine;
	ctx.lineWidth=4;
	ctx.beginPath();
	ctx.globalAlpha=0.2;
	addLine(0, height/2, width, height/2, ctx);
}

function drawCircle(x,y,radius,context,alpha)
{
	context.globalAlpha=alpha;
	context.arc(x,y,radius,0,Math.PI*2,true);
	context.fill();
}


function drawEventLable(x,y,context,eventLabel,alpha)
{
	var maxLabelLength=10;
	if (eventLabel.length>maxLabelLength){
		eventLabel=eventLabel.substring(0,maxLabelLength)+"...";
	}
	context.fillStyle="black";
	context.globalAlpha=alpha;
	context.font = "bold 15px Arial";  
	context.textAlign='center';
	context.fillText(eventLabel,x,y);
}

function drawEventTimeLable(x,y,context,eventTimeLable,alpha)
{
	var label=eventTimeLable.substring(4,7)+' '+eventTimeLable.substring(7);
	context.fillStyle="black";
	context.globalAlpha=alpha;
	context.font = "bold 15px Arial";  
	context.textAlign='center';
	context.fillText(label,x,y);
}


var eventLabelHeight=25;
var eventTimeLableHeight=25;

var eventX=new Array();
var radius;

function getOffsetEventTime(repeatTime,maxRepeatTime,offsetEventTime,distance)									//返回此时offsetEventTime  也就是 这时候时间点应该偏移的位置 
																												//repeat已经运行次数 maxRepeatTime 最大运行次数 offsetEventTime 偏移最远距离 distance需要移动的最大距离s
{
	var offsetEventTime;
	if (repeatTime>maxRepeatTime){		// 偏移
		if (repeatTime>offsetEventTime+maxRepeatTime){	//回来了
			offsetEventTime=maxRepeatTime+offsetEventTime-( repeatTime-maxRepeatTime-offsetEventTime);
			offsetEventTime=offsetEventTime/maxRepeatTime*distance;
		}
		else {											//往外继续偏移
			offsetEventTime=repeatTime/maxRepeatTime*distance;
		}
	}
	else {
		offsetEventTime=repeatTime/maxRepeatTime*distance;
		
	}
	return offsetEventTime ;
}

var selectEvent=1;

function drawEvent(x,drawEventAlpha) {		//offsetEventTime 需要的位置	drawEventAlpha 默认透明度的百分比
	
	var canvas=document.getElementById('timeEventsCanvas');
	var ctx=canvas.getContext('2d');
	
	var width=canvas.width;
	var height=canvas.height-eventLabelHeight-eventTimeLableHeight;
	radius=8;
	ctx.clearRect(0,0,width,canvas.height);
	
	var circleAlpha;

	for (var i=0; i<event.length; i++){
		if (i!=0){
			var distanceX=getDifferentialDate(eventTime[i-1], eventTime[i]);
			x+=Math.max(distanceX,100);
		}
		
		if (selectEvent!=i){
			ctx.lineWidth=0;
			ctx.fillStyle="#61c0d7";
			ctx.strokeStyle="#61c0d7";
			circleAlpha=0.8*drawEventAlpha;
		}
		else {
			ctx.lineWidth=5;
			ctx.strokeStyle="white"
			ctx.fillStyle="#97c13c";
			circleAlpha=drawEventAlpha;
		}
		
		ctx.beginPath();
		drawCircle(x, height/2, radius, ctx,1*circleAlpha);
		if (selectEvent==i)	ctx.stroke();
		
		drawEventLable(x, height+eventLabelHeight-5, ctx,event[i],0.5*drawEventAlpha);
		
		drawEventTimeLable(x, height+eventLabelHeight+eventTimeLableHeight-5, ctx, eventTime[i],0.5*drawEventAlpha);
		
		eventX[i]=x;
	}
}

var changeRepeatTime=0;
var isChange=false;

function changeTime(startX,newX,maxRepeatTime,maxOffset){	//时间点运动到newOffsetEventTime	//forward 是否向前移动
	if (changeRepeatTime>=maxRepeatTime+maxOffset*2){							
		isChange=false;
		return ;
	}
	
	nowOffsetEventTime=getOffsetEventTime(changeRepeatTime,maxRepeatTime,maxOffset,newX-startX)+startX;

	drawEvent(nowOffsetEventTime, 1);

	setTimeout(function(){
		changeTime(startX, newX, maxRepeatTime, maxOffset);
	},getEventDelayTime(changeRepeatTime,maxRepeatTime,maxOffsetTimeEvent,2));
	
	changeRepeatTime++;
}


function clickTimeLine(e){
	
	if (isChange) return ;		//isChange变量判断动画是否在执行中 如果在执行 则直接退出
	isChange=true;
	var clickX=e.pageX-getLeft($(".timeLineCanvasDiv")) ;
	for (var i=0; i<event.length; i++){
		if (Math.abs(eventX[i]-clickX)<=radius){
			
			var midPoint=$(".timeLineCanvasDiv").width()/2;
			var newX=midPoint-(eventX[i]-eventX[0]);
		
			var moveDistance=Math.abs(newX-nowOffsetEventTime);
			changeRepeatTime=0;
			if (moveDistance<radius){
				isChange=false;
				return ;
			}
			changeSelectImage(i);				//确定点击了第i个
			
//			if (moveDistance<50){											//移动代码
//				changeTime(nowOffsetEventTime,newX,moveDistance,5);
//			}
//			else {
//				changeTime(nowOffsetEventTime,newX,Math.min(70,moveDistance),5);
//			}
			
			drawEvent(eventX[0], 1);			//以下两句话是非移动代码
			isChange=false;
			return ;
		}
	}
	isChange=false;	//没有被点到
}


function changeSelectImage(selectIndex)
{
	if (selectEvent==selectIndex) return ;
	var isFirst=true;						//.eventImage 会使得下面的fadeOut执行4次
	selectEvent=selectIndex;
	$(".eventImage").fadeOut("slow",function(){
		if (isFirst){
			var image=eventImage[selectIndex].split(',');
			for (var i=0; i<4; i++){
				$($(".eventImage")[i]).attr("src",image[i]);
			}
			$(".eventImage").fadeIn("slow");
			isFirst=false;
		}
		
	});
}


function getEvent()		//获取与event相关的变量
{
	$.post("Events/EventsItem.php",function(data){
		var eventArray=data.split(';');
		eventArray.pop();		//splite 的时候 多了最后一个元素
		for (var i=0; i<eventArray.length; i++){
			var jsonObj=JSON.parse(eventArray[i]);
			eventTime[i]=jsonObj.date;
			event[i]=jsonObj.event;
			eventImage[i]=jsonObj.eventImage;
		}
	});
}

$('#timeLine').ready(function (){
	
	
	getEvent();
	
	$(".timeLineCanvasDiv").click(function (e){	
		clickTimeLine(e);
	});
});


function showImageAtIndex($indexImage)
{	
	$(".eventImageItemDiv").stop();
	
	$(".eventImageItemDiv").not($indexImage).animate({
		"width":"246.8px",
		"height":"341px",
		"opacity":"0.2",
	},"0.5");
	
	$indexImage.animate({
		"width":"493.6px",
		"height":"341px",
		"opacity":"1",
	},"0.5");
}

$('.eventImageDiv').ready(function(){
	
	$(".eventImageItemDiv:last").css({
		"width":"493.6px",
		"height":"341px",
		"opacity":"1",
	});
	
	$(".eventImageItemDiv").hover(function(){
		showImageAtIndex($(this));
	});
	
	$(".eventImageItemDiv").click(function(){
		showImageAtIndex($(this));
	});

});




