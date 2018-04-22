<?php
	require "conn.php";

	if(isset($_POST['tel'])){//前端ajax传输过来的
		$tel=$_POST['tel'];
		$password=$_POST['password'];
	}else{
		exit('非法操作');
	}
	
	$query="select * from user where tel='$tel' and psd='$password'";
	$result=mysql_query($query);
	
	if(mysql_fetch_array($result)){
		echo true;
	}else{
		echo false;
	}

?>