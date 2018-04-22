//注册验证
;(function(){
	//手机号验证
	var bstop=true;
	console.log()
	$('.phone input').on('blur',function(){
		var $reg=/^1[34578]\d{9}$/;
		var tel=$('.phone input').val();
		if($reg.test(tel)){
			$.ajax({
				type:'post',
				url:'php/register.php',
				data:{
					tel:tel
				},
				success:function(data){
					console.log(data);
					if(!data){
						$('.phone p').css('visibility','hidden');
						$('.phone .draw').show();
						$('.phone').css('border-color','#ddd');
						bstop=false;
					}else{
						$('.phone p').css('visibility','visible').children('span').text('该用户名已存在');
						$('.phone').css('border-color','#e60012');
						bstop=true;
					}
				}
			})
		}else{
			$('.phone p').css('visibility','visible').children('span').text('格式错误');
			$('.phone').css('border-color','#e60012');
			bstop=true;
		}
	});
	//验证码
	$('.code input').on('blur',function(){
		var $ver=$('.ver').text();
		var $code=$('.code input').val();
		if($code==$ver){
			$('.code p').css('visibility','hidden');
			$('.code .draw').show();
			$('.code').css('border-color','#ddd');
			bstop=false;
		}
		else{
			$('.code p').css('visibility','visible');
			$('.code').css('border-color','#e60012');
			bstop=true;
		}
	});
	//密码
	$('.password input').on('input',function(){
		$('.safe li').css({
			'background':'#c5c4c4',
			'color':'#666'
		});
		var $password=$('.password input').val();
		var $reg1=/\d+/g;
		var $reg2=/[a-zA-Z]+/g;
		var $reg3=/[^a-zA-Z0-9]+/g;
		var $num=0;
		if($reg1.test($password)){
			$num++;
		}if($reg2.test($password)){
			$num++;
		}if($reg3.test($password)){
			$num++;
		}
		if($password.length>=6&&$password.length<=25){
			$('.safe').show();
			switch($num){
				case 1:$('.di').css({
					'background':'#e60012',
					'color':'#fff'
				});break;
				case 2:$('.zhong').css({
					'background':'#e60012',
					'color':'#fff'
				});break;
				case 3:$('.gao').css({
					'background':'#e60012',
					'color':'#fff'
				});break;
			}
		}
		
	});
	$('.password input').on('blur',function(){
		var $password=$('.password input').val();
		if($password.length>=6&&$password.length<=25){
			$('.password p').css('visibility','hidden');
			$('.password .draw').show();
			$('.password').css('border-color','#ddd');
			bstop=false;
		}
		else{
			$('.password p').css('visibility','visible');
			$('.password').css('border-color','#e60012');
			bstop=true;
		}	
	});
	//确认密码
	$('.con-password input').on('blur',function(){
		var $password=$('.password input').val();
		var $conpsd=$('.con-password input').val();
		if($conpsd==$password&&$conpsd!=''){
			$('.con-password p').css('visibility','hidden');
			$('.con-password .draw').show();
			$('.con-password').css('border-color','#ddd');
			bstop=false;
		}
		else{
			$('.con-password p').css('visibility','visible');
			$('.con-password').css('border-color','#e60012');
			bstop=true;
		}	
	});
	//获取验证码
	var $ver=$('.ver');	
	$ver.on('click',function(){
		var arr=[];
		for(var i=48;i<=57;i++){
			arr.push(String.fromCharCode(i))
		}
		for(var i=97;i<=122;i++){
			arr.push(String.fromCharCode(i));
		}
		var str=''
		for (var i=0;i<4;i++) {
			var ranum=parseInt(Math.random()*arr.length)
			if(ranum>10){
				var bool=Math.random()>0.5?true:false
				if(bool){
					str+=arr[ranum].toUpperCase();
				}else{str+=arr[ranum]}
			}
			else{str+=arr[ranum]}
		}
	    $ver.text(str);
	});
	
	$('form').on('submit',function(){
		if(bstop){
			return false;
		}
	});
})();

