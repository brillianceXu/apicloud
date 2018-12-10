function goodsgallery() {
	$(function() {
		$("div.module_special .wrap .major ul.list li:last-child").addClass("remove_bottom_line");
	});
	var active = 0, as = document.getElementById('pagenavi').getElementsByTagName('a');

	for (var i = 0; i < as.length; i++) {
		(function() {
			var j = i;
			as[i].onclick = function() {
				t2.slide(j);
				return false;
			}
		})();
	}
	var t2 = new TouchSlider({
		id : 'sliderlist',
		speed : 600,
		timeout : 6000,
		before : function(index) {
			as[active].className = '';
			active = index;
			as[active].className = 'active';
		}
	});
}

function show_goods_desc() {
	document.getElementById('product_desc').innerHTML = '{$goods.goods_desc}';
}

function goods_cut() {
	var num_val = document.getElementById('number');
	var new_num = num_val.value;
	var Num = parseInt(new_num);
	if (Num > 1)
		Num = Num - 1;
	num_val.value = Num;
}

function goods_add() {
	var num_val = document.getElementById('number');
	var new_num = num_val.value;
	var Num = parseInt(new_num);
	Num = Num + 1;
	num_val.value = Num;
}

/**
 * 点选可选属性或改变数量时修改商品价格的函数
 */
function changePrice() {
	var attr = getSelectedAttributes(document.forms['ECS_FORMBUY']);
	var qty = document.forms['ECS_FORMBUY'].elements['number'].value;
	if (qty <= 0) {
		document.forms['ECS_FORMBUY'].elements['number'].value = 1;
		qty = 1;
	}

	//_showProgress();
	var d = new Date();
	url_get = api_url + 'goods.php?act=price&id=' + goodsId + '&attr=' + attr + '&number=' + qty + '&username=' + username + '&password=' + password;
	url_encoded = encodeURI(url_get) + (url_get.indexOf("?") === -1 ? "?" : "&") + d.getTime() + d.getMilliseconds();
	_ajax(url_encoded, "get", {

	}, "json", function(ret) {

		api.hideProgress();

		changePriceResponse(ret);

	});

	//Ajax.call('goods.php', 'act=price&id=' + goodsId + '&attr=' + attr + '&number=' + qty, changePriceResponse, 'GET', 'JSON');
}

/**
 * 接收返回的信息
 */
function changePriceResponse(res) {
	if (res.err_msg.length > 0) {
		_alert(res.err_msg);
	} else {
		document.forms['ECS_FORMBUY'].elements['number'].value = res.qty;
		if (document.getElementById('ECS_GOODS_AMOUNT')) {
			document.getElementById('ECS_GOODS_AMOUNT').innerHTML = res.result;
		}
		if (document.getElementById('ECS_GOODS_NUMBER')) {
			document.getElementById('ECS_GOODS_NUMBER').innerHTML = res.goods_attr_number;
			if (res.goods_attr_number > 0) {
				document.getElementById('ECS_ADD_TO_CART').style.display = "block";
				document.getElementById('ECS_ONE_STEP_BUY').style.display = "block";
				document.getElementById('ECS_DAOHUO').style.display = "none";
			} else {
				document.getElementById('ECS_ADD_TO_CART').style.display = "none";
				document.getElementById('ECS_ONE_STEP_BUY').style.display = "none";
				document.getElementById('ECS_DAOHUO').style.display = "block";
			}
		}
		if (document.getElementById('ECS_GOODS_AMOUNT_JF')) {
			document.getElementById('ECS_GOODS_AMOUNT_JF').innerHTML = res.result_jf;
		}
		if (document.getElementById('ECS_GOODS_AMOUNT_CHOOSE')) {
			document.getElementById('ECS_GOODS_AMOUNT_CHOOSE').innerHTML = res.result;
		}
		if (document.getElementById('ECS_GOODS_ATTR_THUMB')) {
			document.getElementById('ECS_GOODS_ATTR_THUMB').src = res.goods_attr_thumb;
		}
		if (document.getElementById('ECS_GOODS_ATTR')) {
			document.getElementById('ECS_GOODS_ATTR').innerHTML = res.goods_attr;
		}
		if (document.getElementById('ECS_SELECT_GOODS_ATTR') && res.goods_attr != '') {
			document.getElementById('ECS_SELECT_GOODS_ATTR').style.display = "block";
			document.getElementById('ECS_SELECT_GOODS_ATTR').innerHTML = "<dt onClick='choose_attr(0)'><span>产品属性：" + res.goods_attr + "</span></dt>";
		}
		if (document.getElementById('IS_EXCLUSIVE') && res.is_exclusive) {
			document.getElementById('IS_EXCLUSIVE').style.display = 'block';
		} else {
			document.getElementById('IS_EXCLUSIVE').style.display = 'none';
		}
	}
}

function choose_attrtwo(num) {
	$("#choose_attr2").animate({
		height : '80%'
	}, [10000]);
	var total = 0, h = $(window).height(), top = $('.Promotions h2').height() || 0, con = $('.Promotions');
	total = 0.8 * h;
	con.height(total - top + 'px');
	$(".f_mask2").show();
}

function close_choose_attr2() {
	$(".f_mask2").hide();
	$('#choose_attr2').animate({
		height : '0'
	}, [10000]);
}

function changeAtt(t) {
	t.lastChild.checked = 'checked';
	for (var i = 0; i < t.parentNode.childNodes.length; i++) {
		if (t.parentNode.childNodes[i].className == 'hover') {
			t.parentNode.childNodes[i].className = '';
			t.childNodes[0].checked = "checked";
		}
	}
	t.className = "hover";
	changePrice();
}

function changeAtt1(t) {
	t.lastChild.checked = 'checked';
	for (var i = 0; i < t.parentNode.childNodes.length; i++) {
		if (t.className == 'hover') {
			t.className = '';
			t.childNodes[0].checked = false;
		} else {
			t.className = "hover";
			t.childNodes[0].checked = true;
		}
	}
	changePrice();
}

function choose_attrstr(num) {
	$("#choose_attr3").animate({
		height : '80%'
	}, [10000]);
	var total = 0, h = $(window).height(), top = $('.subNavBox').height() || 0, con = $('.subNavBox ul');
	total = 0.8 * h;
	con.height(total - top + 'px');
	$(".f_mask3").show();
}

function close_choose_attr3() {
	$(".f_mask3").hide();
	$('#choose_attr3').animate({
		height : '0'
	}, [10000]);
}

function choose_attrone(num) {
	$("#choose_attr1").animate({
		height : '80%'
	}, [10000]);
	var total = 0, h = $(window).height(), top = $('.good_canshu').height() || 0, con = $('.xiangq');
	total = 0.8 * h;
	con.height(total - top + 'px');
	$(".f_mask1").show();
}

function close_choose_attr1() {
	$(".f_mask1").hide();
	$('#choose_attr1').animate({
		height : '0'
	}, [10000]);
}

function choose_attr(num) {
	document.body.style.overflow = 'hidden';
	$("#choose_attr").animate({
		height : '80%'
	}, [10000]);
	var total = 0, h = $(window).height(), top = $('.f_title_attr').height() || 0, bottom = $('#choose_attr .f_foot').height() || 0, con = $('.f_content_attr');
	total = 0.8 * h;
	con.height(total - top - bottom + 'px');
	$(".f_mask").show();
	if (num == 0) {
		var actionForm = document.getElementById('purchase_form');
		actionForm.action = "javascript:addToCart(gid),close_choose_attr()";
	}
	if (num == 1) {
		var actionForm = document.getElementById('purchase_form');
		actionForm.action = "javascript:addToCart(gid,0,1),close_choose_attr()";
	}
}

function close_choose_attr() {
	document.body.style.overflow = '';
	$(".f_mask").hide();
	$('#choose_attr').animate({
		height : '0'
	}, [10000]);
}

function tell_me(goods_id) {
	//no_have = (typeof(no_have_val) == "undefined" ? 0 : no_have_val);

	_showProgress();
	var d = new Date();
	url_get = api_url + 'user.php?act=book_goods&id=' + goods_id + '&username=' + username + '&password=' + password;
	url_encoded = encodeURI(url_get) + (url_get.indexOf("?") === -1 ? "?" : "&") + d.getTime() + d.getMilliseconds();
	_ajax(url_encoded, "get", {

	}, "json", function(ret) {

		api.hideProgress();

		tellmeResponse(ret);

	});

	//Ajax.call('user.php?act=book_goods', 'id=' + goods_id, tellmeResponse, 'GET', 'JSON');
}

function tellmeResponse(result) {
	if (result.error == 1) {
		document.getElementById('tell_me_form').style.display = 'block';
		// document.getElementById('bg').style.display='block';
		document.getElementById('phone_num').value = result.tel;
		document.getElementById('arrival_email').value = result.email;
		choose_attr6(0);
	}
	if (result.error == 0) {
		_alert(result.message);
	}
	if (result.error == 2) {
		_alert(result.message);
		close_choose_attr6();
		document.getElementById('tell_me_form').style.display = document.getElementById('tell_me_form').style.display == 'none' ? 'block' : 'none';
		//  document.getElementById('bg').style.display='none';
	}
}

function tell_me1(goods_id) {
	var num = document.getElementById('book_number').value;
	var tel = document.getElementById('phone_num').value;
	var email = document.getElementById('arrival_email').value;
	var msg = '';
	var g = /^[1-9]*[1-9][0-9]*$/;
	if (num == '') {
		msg += '数量不能为空!\n';
	} else if (!g.test(num)) {
		msg += '数量需为正整数！\n';
	}
	if (tel == '') {
		msg += '手机号码不能为空！\n';
	}
	if (email == '') {
		msg += '邮箱不能为空!\n';
	}
	if (msg) {
		_alert(msg);
		return false;
	} else {
		//no_have = (typeof(no_have_val) == "undefined" ? 0 : no_have_val)
		_showProgress();
		var d = new Date();
		url_get = api_url + 'user.php?act=add_book_goods&id=' + goods_id + '&num=' + num + '&tel=' + tel + '&em=' + email + '&username=' + username + '&password=' + password;
		url_encoded = encodeURI(url_get) + (url_get.indexOf("?") === -1 ? "?" : "&") + d.getTime() + d.getMilliseconds();
		_ajax(url_encoded, "get", {

		}, "json", function(ret) {

			api.hideProgress();

			tellmeResponse(ret);

		});

		//Ajax.call('user.php?act=add_book_goods', 'id=' + goods_id + '&num=' + num + '&tel=' + tel + '&em=' + email, tellmeResponse, 'GET', 'JSON');
	}
}

function choose_attr6(num) {
	$("#choose_attr6").animate({
		height : '80%'
	}, [10000]);
	var total = 0, h = $(window).height(), top = $('.callme').height() || 0, con = $('.tell_me_con');
	total = 0.8 * h;
	con.height(total - top + 'px');
	$(".f_mask6").show();
}

function close_choose_attr6() {
	$(".f_mask6").hide();
	$('#choose_attr6').animate({
		height : '0'
	}, [10000]);
}

function guanzhu(sid) {
	_showProgress();
	var d = new Date();
	url_get = api_url + 'supplier.php?go=other&act=add_guanzhu&suppId=' + sid + '&username=' + username + '&password=' + password;
	url_encoded = encodeURI(url_get) + (url_get.indexOf("?") === -1 ? "?" : "&") + d.getTime() + d.getMilliseconds();
	_ajax(url_encoded, "get", {

	}, "json", function(ret) {

		api.hideProgress();

		selcartResponse(ret);

	});

	//Ajax.call('supplier.php', 'go=other&act=add_guanzhu&suppId=' + sid, selcartResponse, 'GET', 'JSON');
}

function selcartResponse(result) {
	_toast(result.info);
}

function ShowMyComments(goods_id, type, page) {
	Ajax.call('goods_comment.php?act=list_json', 'goods_id=' + goods_id + '&type=' + type + '&page=' + page, ShowMyCommentsResponse, 'GET', 'JSON');
}

function ShowMyCommentsResponse(result) {
	if (result.error) {

	}

	try {
		var layer = document.getElementById("ECS_MYCOMMENTS");
		layer.innerHTML = result.content;
		var myPhotoSwipe = $("#gallery a").photoSwipe({
			enableMouseWheel : false,
			enableKeyboard : false,
			allowUserZoom : false,
			loop : false
		});
	} catch (ex) {
	}
}

function fly() {

	var img = document.getElementById("sliderlist").getElementsByTagName("img")[0].src;
	console.log('tupiandizhishi'+img);
	var flyer=$('<img class="u-flyer" src="'+img+'">');
	flyer.fly({
		start : {
			left : 200,
			top : 200
		},
		end : {
			left : 50,
			top : 700,
			width : 0,
			height : 0
		}
	});

}
