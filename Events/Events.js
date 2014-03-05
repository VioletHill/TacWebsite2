//programmer mark --  time line

//两个坐标之间最小相差 100 最大150 maxDay
var repeatTime=0;
var maxRepeatTime=200;
var event=["cs19dfsf3P","duefadsfadsfasdfasdfas","TacCodeJam"];
var eventTime=["2013Feb2","2013Feb5","2014Apr16"];

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


function showTimeLine()
{
	if (repeatTime>=maxRepeatTime) return ;
	drawTimeLine();
	drawEvent();
	if (repeatTime<maxRepeatTime){
		repeatTime++;
		setTimeout("showTimeLine()",10);
	}
	else {
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
	ctx.globalAlpha=0.2*repeatTime/maxRepeatTime;
	ctx.lineWidth=4;
	ctx.beginPath();
	
	addLine(0, height/2, width, height/2, ctx);
}

function drawCircle(x,y,radius,context)
{
	context.fillStyle="red";
	context.globalAlpha=1*repeatTime/maxRepeatTime;
	context.arc(x,y,radius,0,Math.PI*2,true);
	context.fill();
}


function drawEventLable(x,y,context,eventLabel)
{
	var maxLabelLength=10;
	if (eventLabel.length>maxLabelLength){
		eventLabel=eventLabel.substring(0,maxLabelLength)+"...";
	}
	context.fillStyle="black";
	context.globalAlpha=0.5*repeatTime/maxRepeatTime;
	context.font = "bold 15px Arial";  
	context.textAlign='center';
	context.fillText(eventLabel,x,y);
}

function drawEventTimeLable(x,y,context,eventTimeLable)
{
	var label=eventTimeLable.substring(4,7)+' '+eventTimeLable.substring(7);
	context.fillStyle="black";
	context.globalAlpha=0.5*repeatTime/maxRepeatTime;
	context.font = "bold 15px Arial";  
	context.textAlign='center';
	context.fillText(label,x,y);
}


var eventLabelHeight=25;
var eventTimeLableHeight=25;

var eventX=new Array();
var radius;

function drawEvent() {
	
	var canvas=document.getElementById('timeEventsCanvas');
	var ctx=canvas.getContext('2d');
	
	var width=canvas.width;
	var height=canvas.height-eventLabelHeight-eventTimeLableHeight;
	radius=height/2;
	ctx.clearRect(0,0,width,canvas.height);
	
	ctx.beginPath();
	
	var x=50;
	for (var i=0; i<event.length; i++){
		if (i!=0){
			var distanceX=getDifferentialDate(eventTime[i-1], eventTime[i]);
			x+=Math.max(distanceX,100);
		}
		
		drawCircle(x, height/2, radius, ctx);
		
		drawEventLable(x, height+eventLabelHeight-5, ctx,event[i]);
		
		drawEventTimeLable(x, height+eventLabelHeight+eventTimeLableHeight-5, ctx, eventTime[i]);
		
		eventX[i]=x;
	}
}

function clickTimeLine(e){
	var clickX=e.pageX-getLeft($(".timeLineCanvasDiv")) ;
	for (var i=0; i<event.length; i++){
		if (Math.abs(eventX[i]-clickX)<=radius){
			alert(i);
			return ;
		}
	}
}

//programmer mark 

$('#timeLine').ready(function (){
	$(".timeLineCanvasDiv").click(function (e){
		clickTimeLine(e);
	});
});

