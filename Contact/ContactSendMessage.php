<?php 

	$name=$_POST['name'];
	$content=$_POST['content'];
	$email=$_POST['email'];
	
	
	$to = "appleclub.tongji@gmail.com";
	$subject = "Tac Website Message";
	$message = "name:$name\n  content:$content";
	$from = $email;
	$headers = "From: $from";
	mail($to,$subject,$message,$headers);


?>