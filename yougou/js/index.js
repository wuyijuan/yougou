//二级导航
;(function(){
	var $li=$('.goods-list li');
	$li.hover(function(){
		$(this).addClass('bac');
		$(this).children('i').css('background-position-x','-52px');
		$(this).children('h4').children('a').css('color','#fff');
		$(this).children('p').children('a').css('color','#fff');
		$('.sub').eq($(this).index()).show();
	},function(){
		$(this).removeClass('bac');
		$(this).children('i').css('background-position-x','0')
		$(this).children('h4').children('a').css('color','#666');
		$(this).children('p').children('a').css('color','#666');
		$('.sub').eq($(this).index()).hide();
	});
})();

//轮播
;(function(){
	var $banner=$('.lunbo');
	var $imgs=$('.scroll img');
	var $btns=$('.lunbo .btn span');
	console.log($btns);
	var $index=0;
	var $pindex=0;
	//鼠标滑过
	$btns.on('mouseover',function(){
		$index=$(this).index('span')-1;
		tabswitch();
		$pindex=$index;
		console.log($index);
	});
	
	var timer=null;
	timer=setInterval(function(){
		$index++;
		if($index>4){
			$pindex=4;
			$index=0;
		}
		tabswitch();
		$pindex=$index;
	},2000);
	$banner.hover(function(){
		clearInterval(timer)
	},function(){
		timer=setInterval(function(){
			$index++;
			if($index>4){
				$pindex=4;
				$index=0;
			}
			tabswitch();
			$pindex=$index;
		},2000);
	})
	//图片切换
	function tabswitch(){
		$btns.eq($index).addClass('hover').siblings('span').removeClass('hover');
		if($pindex==4 && $index==0){
			if($(this).nodeName=='SPAN'){
				$imgs.eq($pindex).animate({
					left:990
				},10);
				$imgs.eq($index).css('left','-990px').animate({
					left:0
				},10);
			}else{
				$imgs.eq($pindex).animate({
					left:-990
				},10);
				$imgs.eq($index).css('left','990px').animate({
					left:0
				},10);
			}
		}else if($pindex==0&&$index==4){
			if($(this).nodeName=='SPAN'){
				$imgs.eq($pindex).animate({
					left:-990
				},10);
				$imgs.eq($index).css('left','990px').animate({
					left:0
				},10);
			}else{
				$imgs.eq($pindex).animate({
					left:990
				},10);
				$imgs.eq($index).css('left','-990px').animate({
					left:0
				},10);
			}
		}else if($index>$pindex){
			$imgs.eq($pindex).animate({
				left:-990
			},10);
			$imgs.eq($index).css('left','990px').animate({
				left:0
			},10);
		}else if($pindex>$index){
			$imgs.eq($pindex).animate({
				left:990
			},10);
			$imgs.eq($index).css('left','-990px').animate({
				left:0
			},10);
		}
	}
})();
//获取轮播图片
/*;(function($){
	var $imgs=$('.scroll img');
	$.ajax({
		type:'get',
		url:'php/lunbo.php',
		success:function(data){
			var arr=JSON.parse(data);
			$.each(arr, function(index,value){
				$imgs.eq(index).attr('src',arr[index].src);
			});
		}
	});
})(jQuery);*/

;(function($){
	var $imgs=$('.scroll img');
	$.ajax({
		type:'get',
		url:'php/lunbo.php',
		dataType:'json',
		success:function(data){
			$.each(data, function(index,value){
				$imgs.eq(index).attr('src',data[index].src);
			});
		}
	});
})(jQuery);


//热门品牌
;(function($){
	var $imgs=$('.hot-wrap .img img');
	$.ajax({ 
		type:'get',
		url:'php/hot.php',
		dataType:'json',
		success:function(data){
			$.each(data, function(index,value){
				$imgs.eq(index).attr('src',data[index].src);
			});
		}
	});
})(jQuery);
//品牌列表
;(function($){
	//热门品牌
	var $hotbrand=$('.hot-list li a');
	console.log($hotbrand);
	//优购导购 
	var $youbrand=$('.yougou .brand img');
	var $youspan=$('.yougou .brand span');
	$.ajax({
		type:'get',
		url:'php/brandlist.php',
		dataType:'json',
		success:function(data){
			$.each(data, function(index,value){
				$("<img/>").appendTo($($hotbrand.eq(index))).attr('src',data[index].src);
				$youbrand.eq(index).attr('src',data[index].src);
				$youspan.eq(index).text(data[index].name);
			});
		}
	});
})(jQuery);


//中间大图
;(function($){
	var $bigimg=$('.women');
	$.ajax({
		type:'get',
		url:'php/women.php',
		dataType:'json',
		success:function(data){
			$.each(data, function(index,value){
				$bigimg.eq(index).find('.center').find('img').attr('src',data[index].src);
			});
		}
	});
})(jQuery);
//小图
;(function($){
	var $simg=$('.women .simg');
	$.ajax({
		type:'get',
		url:'php/simg.php',
		dataType:'json',
		success:function(data){
			$.each(data, function(index,value){
				$simg.eq(index).attr('src',data[index].src);
			});
		}
	});
})(jQuery);


//品牌列表
;(function(){
	var $ul=$('.hot-list ul');
	var $li=$('.hot-list ul li');
	var $btn1=$('#btn1');
	var $btn2=$('#btn2');
	var $num=0;
	var $liwidth=$li.width();
	function tabswitch(){
		$ul.animate({
			left:-$liwidth*$num
		});			
	}
	$btn2.on('click',function(){
		$num++;
		if($num>$li.length-1){
			$num=0;
		}
		tabswitch();
	});
	$btn1.on('click',function(){
		$num--;
		if($num<0){
			$num=$li.length-1;
		}
		tabswitch();
	});
})();

//特卖专区
;(function($){
	var $lis=$('.img-list .oli');
	console.log($lis);
	$.ajax({
		type:'get',
		url:'php/temai.php',
		dataType:'json',
		success:function(data){			
			$.each(data, function(index,value){
				$lis.eq(index).find('img').attr('src',data[index].src);
				$lis.eq(index).find('.desc').text(data[index].title);
				$lis.eq(index).find('span').text(data[index].pic);
				$lis.eq(index).find('em').text(data[index].del);
			});
		}
	});
})(jQuery);
//特卖专区切换
;(function(){
	$('.temai-wrap ol li').hover(function(){
		$('.temai-wrap ol li').css('background','#fff').children('a').css('color','#666').siblings('span').hide();		
		$(this).css('background','#000').children('a').css('color','#fff').siblings('span').show();
		$('.temai-wrap ul').eq($(this).index()).show().siblings('ul').hide();
	});
})();
//登录注销
;(function(){
	function addCookie(key,value,day){
		var date=new Date();
		date.setDate(date.getDate()+day);
		document.cookie=key+'='+encodeURI(value)+';expires='+date;
	}
	function getCookie(key){
		var str=decodeURI(document.cookie);
		var arr=str.split('; ');
		for(var i=0;i<arr.length;i++){
			var arr1=arr[i].split('=');
	 		if(arr1[0]==key){
				return arr1[1];
			}
		}
	}
	function delCookie(key,value){
		addCookie(key,value,-1);
	}
	var tel=null;
	if(getCookie('tel')){
		tel=getCookie('tel');
		$('.top-nav .nav .login a').eq(0).html(tel);
		$('.top-nav .tuichu').show();
	};
	$('.top-nav .tuichu').on('click',function(){
		delCookie('tel',tel);
		$('.top-nav .nav .login a').eq(0).html('登录');
		$('.top-nav .tuichu').hide();
	})
})();