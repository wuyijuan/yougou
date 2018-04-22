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
	
	if(getCookie('cartsid')){
		$('.kong').hide();
		$('.goods').show();
		getcookievlaue();
		$.each(sidarr, function(index,value) {
			$.ajax({
				type:"post",
				url:"php/cart.php",
				data:{
					sid:value
				},
				dataType:'json',
				success:function(data){
					console.log(data);
					$('table .goods .img').find('img').attr('src',data[0].img);
					$('table .decs a').html(data[0].title);
					$('table .price').html(data[0].pic);
					$('table .total strong').html(data[index].pic*numarr[index]);
					$('.bot .count li span').html($('table .total strong').html());
				}
			});
			console.log(numarr[index]);
			$('.amount input').val(numarr[index]);
			
		});
	}
	else{
		$('.goods').hide();
		$('.kong').show();
	}
	//删除购物车
	$('.delete').on('click',function(){
		var r=confirm('你确定要删除吗？');
		if(r==true){
			delCookie('cartsid','');
			delCookie('cartnum','');
			location.reload();
		}
	})
})();
;(function(){
	var num=$('table .amount input').val();
	$('#jia').on('click',function(){
		num++;
		var price=$('table .price').html()*num;
		$('table .amount input').val(num);
		$('table .total strong').html(price);
		$('.bot .count li span').html(price);
	});
	$('#jian').on('click',function(){
		if(num>0){
			num--;
		}
		else{
			num=0;
		}
		var price=$('table .price').html()*num;
		$('table .amount input').val(num);
		$('table .total strong').html(price);
		$('.bot .count li span').html(price);
	});
})();
;(function(){
	$('.cart .all').click(function(){
		if($(this).prop('checked')){
			$('.cart .check').prop('checked',true);
		}else{
			$('.cart .check').prop('checked',false);
		}
	});
			
	var $check=$('.cart .check').not('.all');
	//console.log($input.length);
	$check.click(function(){
		if($('.check:checked').not('.all').length==$check.length){
			$('.cart .all').prop('checked',true);
		}
		else{
			$('.cart .all').prop('checked',false);
		}
	});
})();
