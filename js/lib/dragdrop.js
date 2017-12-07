//拖动
$(function() {
	var docElem = window.document.documentElement;
	var brandSelected = [];
	//存放区域
	var draggableAreas = document.querySelectorAll('.drop-area__item');
	var draArea = []; //存放区域参数

	function scrollX() {
		return window.pageXOffset || docElem.scrollLeft;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}

	function getOffset(el) {
		var offset = el.getBoundingClientRect();
		return {
			top: offset.top + scrollY(),
			left: offset.left + scrollX()
		}
	}

	//划分区域
	function drawAreas() {
		draArea = [];
		for (var i = 0, len = draggableAreas.length; i < len; i++) {
			var dragAreaElem = draggableAreas[i];

			var position = getOffset(dragAreaElem);
			var height = dragAreaElem.offsetHeight;
			//console.log(position)

			if (position.top != 0 && !$(draggableAreas[i]).is(":hidden")) {

				//console.log(position.top)
				draArea.push(position.top)
			}

		}
	}

	function hasSelect() {
		brandSelected = [];
		for (var i = 0, len = draggableAreas.length; i < len; i++) {
			var $dragAreaElem = $(draggableAreas[i]);
			var $name = $dragAreaElem.attr('name');
			var $index = $dragAreaElem.attr('index');
			if ($name) {
				brandSelected.push({
					name: $name,
					index: $index
				});
			}

		}
		if (brandSelected.length === 10) {
			$('.box_brand_list').hide();
			//$('.common_foot').removeClass('add-top');
		} else {
			$('.box_brand_list').show();
			//$('.common_foot').addClass('add-top');
		}
		//console.log(brandSelected)
	}

	function deleteDraOs(name) {
		if (name) {
			//清空这个元素的index			
			$('#grid').find('[name=' + name + ']').find('.brand_count').text('').hide();

		}
	}

	function deteteAreasE(name) {
		if (name) {
			//清除放置区域内元素
			var $item = $('#drop-area').find('[name=' + name + ']');
			$item.addClass('add-box');
			$item.find('.box-brand').attr('src', '../css/i/brand-empty.png');
			var $name = $item.attr('name');
			$item.attr('name', '');
		}
	}

	function onselect(e1, draggableEl) {
		//目标元素
		var $poit = $(draggableEl);
		var $poitName = $poit.attr('name');
		//是否是添加标签

		//清除元素index
		deleteDraOs($poitName)
			//初始元素
		var $draimg = $(e1);

		var atrName = $draimg.attr('name');

		var imgsrc = $draimg.find('.box-brand').attr('src')
		var brandName = $draimg.find('.brand_name').text();
		deteteAreasE(atrName)
			//获取序列 替换img 和name
		var index = $poit.attr('index');
		$poit.find('.box-brand').attr('src', imgsrc);
		$poit.find('.big_brand_name').text(brandName);
		$poit.attr('name', atrName);
		// console.log(index, imgsrc, brandName)
		$draimg.find('.brand_count').text(index).show();
		if ($poit.hasClass('add-box')) {
			var $items = $poit.removeClass('add-box');
		}
		hasSelect();

	}
	//拖拽区域
	var draggableElems = document.querySelectorAll('.grid__item');
	//拖拽元素
	var sourceEle = null;
	// array of Draggabillies
	var draggies = [];

	// init Draggabillies
	var dragAEleIndex = null;

	//存放目标元素
	var dragTarget = null;
	var isRightArea = null;
	var dragAreaHeight = $('.drop-area__item').height();
	for (var i = 0, len = draggableElems.length; i < len; i++) {

		var draggableElem = draggableElems[i];
		var draggie = new Draggabilly(draggableElem);

		draggie.on('dragStart', function(ev, p) {
			//console.log(ev,p)
			sourceEle = ev.target
			drawAreas()
		})
		draggie.on('dragMove', function(ev, p, mv) {

			//判断是否在目标元素上面
		})
		draggie.on('dragEnd', function(ev, p) {
				var dragPtop = $('.box_brand_list').offset().top;
				var EleTop = getOffset(ev.target).top
				var heights = ev.target.height;
				// console.log(dragPtop, EleTop, heights)
				var downarea = dragPtop - EleTop > heights * 2 / 3 ? true : false;
				//console.log(EleTop)
				dragAEleIndex = null;
				isRightArea = null;
				for (var i = 0, index; index = draArea[i]; i++) {
					if (draArea[i + 1]) {

						if (Math.abs(EleTop - index) < heights * 2 / 3 && draArea[i + 1] - EleTop > heights * 2 / 3) {
							dragAEleIndex = i;
							isRightArea = true;
						}
						// if(EleTop-index > -height*2/3 && draArea[i+1]-EleTop> height*2/3 ) {
						// 	dragAEleIndex = i+1;
						// 	isRightArea = true;
						// }
					} else {
						if (Math.abs(EleTop - index) < heights * 2 / 3 && draArea[i] + dragAreaHeight - EleTop > heights * 2 / 3) {
							dragAEleIndex = i;
							isRightArea = true;
						}
					}

				}
				//获取两个元素
				dragTarget = draggableAreas[dragAEleIndex];
				sourceEle = $(ev.target).parents('.grid__item');
				//还原属性		
				sourceEle.attr('style', '');

				//console.log(sourceEle,dragTarget);
				if (isRightArea && downarea) {
					onselect(sourceEle, dragTarget)
				}



			})
			//draggie.disable()
			// draggie.on('pointerMove',function(ev){
			// 	console.log(ev)
			// })
		draggies.push(draggie);
	}
	//删除
	$('.btn_remove_normal').click(function() {
		$item = $(this).closest('.drop-area__item');
		var $name = $item.attr('name');
		deleteDraOs($name)
		deteteAreasE($name)
		hasSelect()
	})
	setTimeout(function() {
		drawAreas()
	}, 200)
})
