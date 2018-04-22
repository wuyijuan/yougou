<?php
	require 'conn.php';
	$sid=$_POST['sid'];
	$query="select * from cart where sid='$sid'";
	$result=mysql_query($query);
	$arr=array();
	for($i=0;$i<mysql_num_rows($result);$i++){
		$arr[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
	}
	echo json_encode($arr);

?>