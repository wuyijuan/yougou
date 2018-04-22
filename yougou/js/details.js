//放大镜
;(function(){
	var $mag=$('.deta .mag');
	var $ware=$('.deta .ware');
	var $bigware=$('.deta .bigware');
	var $bigimg=$('.deta .bigware img');
	$ware.on('mouseover',function(ev){
		$mag.show();
		$bigware.show();
		move(ev);
	});
	$ware.on('mouseout',function(){
		$mag.hide();
		$bigware.hide();
	});
	function move(ev){
		//var $l=ev.clientX-$ware.offset().left-$mag.width()/2;
		//var $t=ev.clientY-($ware.offset().top-$(window).scrollTop())-$mag.height()/2;
		var $l=ev.pageX-$ware.offset().left-$mag.width()/2;
		var $t=ev.pageY-$ware.offset().top-$mag.height()/2;
		
		if($l<0){
    		$l=0;
    	}else if($l>=$ware.width()-$mag.width()){
    		$l=$ware.width()-$mag.width();
    	}		
    	if($t<0){
    		$t=0;
    	}else if($t>=$ware.height()-$mag.height()){
    		$t=$ware.height()-$mag.height();
    	}
    	$mag.css({
    		'left':$l,
    		'top':$t
    	});
    	$a=$bigimg.width()/$ware.width();
    	$bigimg.css({
    		'left':-$l*$a,
    		'top':-$t*$a
    	});
	}
})();
//图片
;(function($){
	var $imglist=$('.img-list img');
	var $imgm=$('.ware img');
	$.ajax({
		type:'get',
		url:'php/details.php',
		dataType:'json',
		success:function(data){
			$imgm.attr('src',data[0].srcm);
			$('.bigware img').attr('src',data[0].srcb);
			$.each(data, function(index,value){			
				$imglist.eq(index).attr('src',data[index].srcs);
			});
			$('.img-list li').on('mouseover',function(){
				$(this).css('border-color','#E60012').siblings('li').css('border-color','#ddd');
				$imgm.attr('src',data[$(this).index()].srcm);
				$('.bigware img').attr('src',data[$(this).index()].srcb);
			})
		}
	});
	$('.img-list li').eq(0).css('border-color','#E60012');
})(jQuery);

//回到顶部
;(function(){
	$(window).on('scroll',function(){
	    var $scrolltop=$(window).scrollTop();
	    if($scrolltop>0){
	   		$('.back').show();
	    }else{
	    	$('.back').hide();
	    }
	  
	});
	$('.back a').on('click',function(){
	    $('html,body').animate({
	    	scrollTop:0
	    },10)
	});
})();

;(function(){
	$(window).on('scroll',function(){
	    var $scrolltop=$(window).scrollTop();
	    var $display=$('.goumai').css('display');
	    if($scrolltop>=300&&$display=='none'){
		   	$('.bot-buy').show();
		}
	    else if($display=='block'&&$scrolltop<300){
			$('.bot-buy').hide();
			$('.goumai').hide();
		} 
		else{
			$('.bot-buy').hide();
		}
	});
	var $cha=$('.cha');
	$cha.on('click',function(){
		$cha.parent().hide();
		$('.goumai').show();
	});
	$('.goumai').on('click',function(){
		$cha.parent().show();
		$('.goumai').hide();
	});
})();
//加入购物车弹窗
;(function(){
	$('.btn .in').on('click',function(){
		$('.mengban').show();
		$('.casement').show();
		$('.djs span').html(10);
		var timer=setInterval(function(){//函数每一秒钟执行一次。
			var num=$('.djs span').html();//获取strong的值
				num--;//累减
				if(num<0){//判断时间为0，盒子消失，定时器关闭。
					$('.mengban').hide();
			    	$('.casement').hide();
			    	clearInterval(timer);
				}
			$('.djs span').html(num);//重新赋值
		},1000);
	});
	$('.casement .close').on('click',function(){
		$('.mengban').hide();
		$('.casement').hide();
	});	
	$('.casement .jixu').on('click',function(){
		$('.mengban').hide();
		$('.casement').hide();
	});		
})();
//加入购物车
;(function(){
	var sidarr=[];//存放sid的值
	var numarr=[];//存放数量的值。			
	function getcookievlaue(){
		if(getCookie('cartsid')){
			sidarr=getCookie('cartsid').split(',');
		}
		
		if(getCookie('cartsid')){
			numarr=getCookie('cartnum').split(',');
		}
	}		
	$('.btn .in').on('click', function() {
		//1.先判断当前点击的商品是否存在于cookie中。
		var sid = $('.ware img').attr('sid');//当前按钮对应图片的sid
		getcookievlaue();//sidarr:才存在
		if($.inArray(sid,sidarr)!=-1){//存在
			//将原来的值加上我当前的值
			//parseInt(numarr[$.inArray(sid,sidarr)])：通过sid的位置，找到商品数量
			var num=parseInt(numarr[$.inArray(sid,sidarr)])+parseInt($('.count1').html());
			numarr[$.inArray(sid,sidarr)]=num;//通过sid的位置，找num的位置
			addCookie('cartnum', numarr.toString(), 7);
		}else{//不存在
			sidarr.push(sid);//将当前sid添加到数组里面。
			addCookie('cartsid',sidarr.toString(),7);
			numarr.push($('.count1').html());
			addCookie('cartnum',numarr.toString(),7);
		}
	});
})();
;(function(){
	var num=$('.count1').html();
	$('.jia').on('click',function(){
		num++;
		$('.count1').html(num);
	});
	$('.jian').on('click',function(){
		if(num>1){
			num--;
		}else{
			num=1;
		}
		$('.count1').html(num);
	});
})();
