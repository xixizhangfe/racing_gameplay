~function(){	
	//翻页滚动
		//上一页
		$pre = $('.box-pagination .pre');
		//下一页
		$next = $('.box-pagination .next');	
		//翻页的每一个元素宽度
		var $widthiTem =Math.ceil($("#grid .swiper-item").width()) ;
		//元素个数
		var $itemLength = $("#grid .swiper-item").length;
		//整个宽度
		var $contentWidth = $itemLength*$widthiTem;
		//元素的包裹元素
		var $swiperContent = $('.brand-list');
		//初始页值
		var indexPage=0;

		$swiperContent.css('width',$contentWidth+$itemLength*2);
		$pre.hide()
		
		
		$next.click(function(){
			indexPage++;
			if(indexPage>=$itemLength-1) {
				indexPage = $itemLength-1;
				$next.hide()
			}
			$pre.show();
			$swiperContent.animate({
			'margin-left': -$widthiTem*indexPage,
			},400
			);
		})
		$pre.click(function(){
			indexPage--;
			if(indexPage <= 0) {
				indexPage = 0;
				$pre.hide();
			}
			$next.show();
			$swiperContent.animate({
			'margin-left': -$widthiTem*indexPage,
			},400
			);
		})
}()
~function(){
	//弹窗验证
	var $rectBtn = $('.rect');
	
	$rectBtn.click(function(){
		alerts(2)
	
	})

	function doQuery(url,prams,callBack){
		$.ajax({
            url: 'URL',           
            dataType: 'json',
            data:prams,
            success: function (data) {
            	if(data && callBack) {
            		callBack(data);
            	}
            }
    	}) 
	}
	function alerts(data){
		$('[alert-box]').remove();
		var $scores = $('#reslut'+data).html();
		$('body').append($scores);
		var $btnClose = $('[close]');
		$btnClose.click(function(){
			close()
		})
	}
	function close() {
		$('[alert-box]').remove();
	}
	 
}()
