;(function(){
	//切换
	$('#phone').on('click',function(){
		$('.main2').show();
		$('.main1').hide();
	});
	$('#zhanghao').on('click',function(){
		$('.main1').show();
		$('.main2').hide();
	});
})();
//登录验证
;(function(){
	function addCookie(key,value,day){
		var date=new Date();//创建日期对象
		date.setDate(date.getDate()+day);//过期时间：获取当前的日期+天数，设置给date
		document.cookie=key+'='+encodeURI(value)+';expires='+date;//添加cookie，设置过期时间
	}
	$('.main1 .pwd input').on('blur',function(){
		var $password=$('.main1 .pwd input').val();
		if($password.length>=6&&$password.length<=25){
			$('.main1 .pwd p').css('visibility','hidden');
			$('.main1 .pwd').css('border-color','#ddd');
		}
		else{
			$('.main1 .pwd p').css('visibility','visible');
			$('.main1 .pwd').css('border-color','#e60012');
		}	
	});
	$('.main1 .sub').on('click',function(){
		var $tel=$('#tel').val();
		var $password=$('#pwd').val();
		$.ajax({
			type:'post',
			url:'php/login.php',
			data:{
				tel:$tel,
				password:$password
			},
			success:function(data){
				if(!data){
					console.log(data)
					$('.main1 .user p').css('visibility','visible').children('span').text('用户名或密码错误');
					$('.main1 .user').css('border-color','#e60012');
					alert('登录失败');
					location.href='login.html';
				}else{
					$('.main1 .user p').css('visibility','hidden');
					$('.main1 .user').css('border-color','#ddd');
					addCookie('tel',$tel,7);
					location.href='index.html';
				}
			}
		})
	});
	
})();
