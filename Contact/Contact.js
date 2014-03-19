var isSending=false;
$(".contactDiv").ready(function(){
	$(".sendEmail").click(function(){
		if (isSending){
			alert("发送中 请稍后");
			return ;
		}
		isSending=true;
		var name=$(".contactName")[0].value;
		var email=$(".contactEmail")[0].value;
		var content=$(".contactMessage")[0].value;
		
		if (name==null || name==""){
			alert('请输入您的名字');
			return ;
		}
		if (email==null || email=="" || !isEmail(email)){
			alert("请填写正确的邮箱,方便我们之后联系您");
			return ;
		}
		
		if (content==null | content==""){
			alert('请输入您宝贵的意见');
			return ;
		}
		
		
		
		$.post("Contact/ContactSendMessage.php",{"name":name,"email":email,"content":content},function(){
			alert("消息发送成功");
			content=$(".contactMessage")[0].value="";
			isSending=false;
		});
	});
});


function isEmail(str){
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return reg.test(str);
}
