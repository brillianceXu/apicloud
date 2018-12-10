function initcart() {

	$(".inner .cart-checkbox").click(function() {
		if ($(this).hasClass('checked')) {
			$(this).removeClass('checked');
			$(this).find('input').attr('checked', false);
		} else {
			$(this).addClass('checked');
			$(this).find('input').attr('checked', true);
		}

		if ($(".inner .cart-checkbox") == true) {
			$('.quanxuan .cart-checkbox').addClass('checked');
		} else {
			$('.quanxuan .cart-checkbox').removeClass('checked');
		}

		var is_checked = true;
		$('.inner .cart-checkbox').each(function() {
			if (!$(this).hasClass('checked')) {
				is_checked = false;
				return false;
			}
		});
		if (is_checked) {
			$('.quanxuan .cart-checkbox').addClass('checked');
		} else {
			$('.quanxuan .cart-checkbox').removeClass('checked');
		}
		select_cart_goods();

	});

	$(".inner .f_checkbox").click(function() {

		pub = $(this).attr("title");

		if ($(this).attr("checked") == "checked") {

			var is_checked_2 = true;
			$('.check-wrapper-' + pub).each(function() {
				if ($(this).attr("checked") != "checked") {
					is_checked_2 = false;
					return false;
				}
			});
			if (is_checked_2) {
				$('.f_pub_checkbox_' + pub).attr("checked", 'checked');
			} else {
				$('.f_pub_checkbox_' + pub).removeAttr("checked", 'checked');
			}

		} else {
			$('.f_pub_checkbox_' + pub).removeAttr("checked");
		}

		var is_checked = true;
		$('.f_checkbox').each(function() {
			if ($(this).attr("checked") != "checked") {
				is_checked = false;
				return false;
			}
		});
		if (is_checked) {
			$('.quanxuan .cart-checkbox1').addClass('checked');
		} else {
			$('.quanxuan .cart-checkbox1').removeClass('checked');
		}
		select_cart_goods();

	});

	$(".f_pub_checkbox").click(function() {
		pub = $(this).attr("title");
		var is_checked = false;
		if ($(this).attr("checked") == 'checked') {

			$(this).attr("checked", "checked");
			$(this).parent().parent().parent().find('.check-wrapper-' + pub).attr('checked', 'checked');

			is_checked = true;
		} else {
			$(this).parent().parent().parent().find('.check-wrapper-' + pub).removeAttr("checked");
			is_checked = false;
		}

		$('.f_checkbox').each(function() {
			if ($(this).attr("checked") != "checked") {
				is_checked = false;
				return false;
			}
		});
		if (is_checked) {
			$('.quanxuan .cart-checkbox1').addClass('checked');
		} else {
			$('.quanxuan .cart-checkbox1').removeClass('checked');
		}

		select_cart_goods();

	});

	$(function() {
		$(".order_checked input").click(function() {
			$(this).parents(".checkout_other2").addClass("checkout_other");
			$(this).parents(".checkout_other2").removeClass("checkout_other2");
			$(this).parents(".order_checked").find(".right_arrow_flow2").addClass("right_arrow_flow");
			$(this).parents(".order_checked").find(".right_arrow_flow2").removeClass("right_arrow_flow2");
			$(this).parents(".order_checked").find("em").html($(this).next().html());
			if ($(this).attr("id") == 'definetime_input') {
				$("#choose_time").animate({
					height : '80%'
				}, [10000]);
				var total = 0, h = $(window).height(), top = $('.f_title_time').height() || 0, con = $('.f_content_time');
				total = 0.8 * h;
				con.height(total - top + 'px');
				$(".f_mask").show();
			}
		})
	});

//	$('.edit_btn').bind('click', function() {
//		alert(1);
//		if ($(this).html() == "编辑") {
//			num = $(this).attr("name");
//			$(".edit_box_" + num).show();
//			$(".edit_info_" + num).hide();
//			$(this).html("完成");
//		} else {
//			num = $(this).attr("name");
//			$(".edit_box_" + num).hide();
//			$(".edit_info_" + num).show();
//			$(this).html("编辑");
//		}
//	});

	$('.edit_btn').click(function(){
		alert(222);
	});

	$('#issurplus').attr('checked', false);
}

function bianjicart(that){
			if ($(that).html() == "编辑") {
		num = $(that).attr("name");
			$(".edit_box_" + num).show();
			$(".edit_info_" + num).hide();
			$(that).html("完成");
		} else {
			num = $(that).attr("name");
			$(".edit_box_" + num).hide();
			$(".edit_info_" + num).show();
			$(that).html("编辑");
		}
}


function checkboxOnclick(checkbox,money) {

	if (checkbox.checked == true) {
		document.getElementById("allow_user_surplus").style.display = "block";
		changeSurplus(money);
	} else {
		document.getElementById("allow_user_surplus").style.display = "none";
		changeSurplus(0);
	}
}

function chkAll_onclick() {
	var is_checked = false;
	if ($('.quanxuan .cart-checkbox').hasClass('checked')) {
		$('.quanxuan .cart-checkbox').removeClass('checked');
		$('.inner .cart-checkbox').removeClass('checked');
		is_checked = false;
	} else {
		$('.quanxuan .cart-checkbox').addClass('checked');
		$('.inner .cart-checkbox').addClass('checked');
		is_checked = true;
	}
	for (var i = 0; i < document.formCart.elements.length; i++) {
		var e = document.formCart.elements[i];
		e.checked = is_checked;
	}
	select_cart_goods();
}

function select_cart_goods() {
	var sel_goods = new Array();
	var obj_cartgoods = document.getElementsByName("sel_cartgoods[]");
	var j = 0;
	for ( i = 0; i < obj_cartgoods.length; i++) {
		if (obj_cartgoods[i].checked == true) {
			sel_goods[j] = obj_cartgoods[i].value;
			j++;
		}
	}

	_ajax(api_url + 'flow.php?act=selcart&sel_goods=' + sel_goods, "post", {
		'values' : {

			'username' : username,
			'password' : password
		}
	}, "json", function(ret) {

		api.hideProgress();
		if (ret.err_msg == '') {
			_toast('修改成功！');
		}

		selcartResponse(ret);

	});

}

function selcartResponse(res) {
	if (res.result == '请选择要结算的商品！') {
		$('.xm-button').addClass('to_cart');
		$('.xm-button').attr('disable');
	} else {
		$('.xm-button').removeClass('to_cart');
		$('.xm-button').removeAttr('disable');
	}
	if (res.err_msg.length > 0) {
		_alert(res.err_msg);
	} else {

		document.getElementById('cart_amount_desc').innerHTML = res.result;
	}
}

function selcart_submit() {
	var obj_cartgoods = document.getElementsByName("sel_cartgoods[]");
	var j = 0;
	for ( i = 0; i < obj_cartgoods.length; i++) {
		if (obj_cartgoods[i].checked == true) {
			j++;
		}
	}

	var sel_goods = new Array();
	var obj_cartgoods = document.getElementsByName("sel_cartgoods[]");
	var m = 0;
	for ( n = 0; n < obj_cartgoods.length; n++) {
		if (obj_cartgoods[n].checked == true) {
			sel_goods[m] = obj_cartgoods[n].value;
			m++;
		}
	}

	if (j > 0) {
		//		document.formCart.action = 'flow.php?step=checkout';
		//		document.formCart.elements['step'].value = 'checkout';
		//		document.formCart.submit();
		//	_showProgress();

		//		_ajax(api_url + 'flow.php?step=checkout&sel_goods=' + sel_goods, "post", {
		//			'values' : {
		//
		//				'username' : username,
		//				'password' : password
		//			}
		//		}, "json", function(ret) {
		//
		//			api.hideProgress();
		//			if (ret.error == 1) {
		//				_alert(ret.content);
		//			} else {
		//				_alert(ret.content);
		//			}
		//
		//			_alert(JSON.stringify(ret));
		//
		//		});

		_showProgress();
		var d = new Date();
		url_get = api_url + 'flow.php?step=checkout&sel_cartgoods=' + sel_goods + '&username=' + username + '&password=' + password;

		url_encoded = encodeURI(url_get) + (url_get.indexOf("?") === -1 ? "?" : "&") + d.getTime() + d.getMilliseconds();

		_ajax(url_encoded, "get", {

		}, "json", function(ret) {

			api.hideProgress();

			//_alert(JSON.stringify(ret));
			if (ret.error == 401) {
				api.openWin({
					name : 'ckaddress',
					url : '../checkout/ckaddress_win.html',
					pageParam : {
						content : ret.content
					}
				});

			} else {
				api.openWin({
					name : 'checkout',
					url : '../checkout/checkout_win.html',
					pageParam : {
						content : ret.content
					}
				});
			}

		});

	} else {
		_toast('请选择要结算的商品！');
	}
}

function add_num(rec_id, goods_id, supp_id, is_package) {
	var sel_goods = new Array();
	var obj_cartgoods = document.getElementsByName("sel_cartgoods[]");
	var j = 0;
	for ( i = 0; i < obj_cartgoods.length; i++) {
		if (obj_cartgoods[i].checked == true) {
			sel_goods[j] = obj_cartgoods[i].value;
			j++;
		}
	}
	document.getElementById("goods_number_" + rec_id + "").value++;
	if (document.getElementById("goods_number_" + rec_id + "").value > 1) {
		document.getElementById("jiannum" + rec_id).className = 'input-sub active';
	} else {
		document.getElementById("jiannum" + rec_id).className = 'input-sub';
	}
	var number = document.getElementById("goods_number_" + rec_id + "").value;

	_showProgress();

	var d = new Date();
	url_get = api_url + 'flow.php?step=update_group_cart&sel_goods=' + sel_goods + '&rec_id=' + rec_id + '&number=' + number + '&goods_id=' + goods_id + '&suppid=' + supp_id + '&is_package=' + is_package;

	url_encoded = encodeURI(url_get) + (url_get.indexOf("?") === -1 ? "?" : "&") + d.getTime() + d.getMilliseconds();
	_ajax(url_encoded, "get", {

	}, "json", function(ret) {

		api.hideProgress();

		changeNumResponse(ret);
		//_alert(JSON.stringify(ret));
		_toast('修改成功');
	});
}

function minus_num(rec_id, goods_id, supp_id, is_package) {
	var sel_goods = new Array();
	var obj_cartgoods = document.getElementsByName("sel_cartgoods[]");
	var j = 0;
	for ( i = 0; i < obj_cartgoods.length; i++) {
		if (obj_cartgoods[i].checked == true) {
			sel_goods[j] = obj_cartgoods[i].value;
			j++;
		}
	}
	if (document.getElementById("goods_number_" + rec_id + "").value > 1) {
		document.getElementById("goods_number_" + rec_id + "").value--;
		if (document.getElementById("goods_number_" + rec_id + "").value > 1) {
			document.getElementById("jiannum" + rec_id).className = 'input-sub active';
		} else {
			document.getElementById("jiannum" + rec_id).className = 'input-sub';
		}
	}
	var number = document.getElementById("goods_number_" + rec_id + "").value;

	_showProgress();
	var d = new Date();
	url_get = api_url + 'flow.php?step=update_group_cart&sel_goods=' + sel_goods + '&rec_id=' + rec_id + '&number=' + number + '&goods_id=' + goods_id + '&suppid=' + supp_id + '&is_package=' + is_package;
	url_encoded = encodeURI(url_get) + (url_get.indexOf("?") === -1 ? "?" : "&") + d.getTime() + d.getMilliseconds();
	_ajax(url_encoded, "get", {

	}, "json", function(ret) {

		api.hideProgress();

		changeNumResponse(ret);
		//_alert(JSON.stringify(ret));
		_toast('修改成功');

	});

	//Ajax.call('flow.php', 'step=update_group_cart&sel_goods=' + sel_goods + '&rec_id=' + rec_id + '&number=' + number + '&goods_id=' + goods_id + '&suppid=' + supp_id + '&is_package=' + is_package, changeNumResponse, 'GET', 'JSON');
}

function change_price(rec_id, goods_id, supp_id) {
	var r = /^[1-9]+[0-9]*]*$/;
	var number = document.getElementById("goods_number_" + rec_id + "").value;

	var sel_goods = new Array();
	var obj_cartgoods = document.getElementsByName("sel_cartgoods[]");
	var j = 0;
	for ( i = 0; i < obj_cartgoods.length; i++) {
		if (obj_cartgoods[i].checked == true) {
			sel_goods[j] = obj_cartgoods[i].value;
			j++;
		}
	}

	if (!r.test(number)) {
		alert("您输入的格式不正确！");
		document.getElementById("goods_number_" + rec_id + "").value = document.getElementById("hidden_" + rec_id + "").value;
	} else {
		//Ajax.call('flow.php', 'step=update_group_cart&rec_id=' + rec_id + '&number=' + number + '&goods_id=' + goods_id, changeNumResponse, 'GET', 'JSON');

		_showProgress();
		var d = new Date();
		url_get = api_url + 'flow.php?step=update_group_cart&sel_goods=' + sel_goods + '&rec_id=' + rec_id + '&number=' + number + '&goods_id=' + goods_id + '&suppid=' + supp_id;
		url_encoded = encodeURI(url_get) + (url_get.indexOf("?") === -1 ? "?" : "&") + d.getTime() + d.getMilliseconds();
		_ajax(url_encoded, "get", {

		}, "json", function(ret) {

			api.hideProgress();

			changeNumResponse(ret);
			//_alert(JSON.stringify(ret));
			_toast('修改成功');

		});

	}
}

function changeNumResponse(result) {
	if (result.error == 1) {
		alert(result.content);
		document.getElementById("goods_number_" + result.rec_id + "").value = result.number;
		document.getElementById("hidden_" + result.rec_id + "").value = result.number;
	} else if (result.error == 888) {
		alert(result.message);
		document.getElementById("goods_number_" + result.rec_id + "").value = result.number;
		document.getElementById("hidden_" + result.rec_id + "").value = result.number;
	} else {
		document.getElementById("hidden_" + result.rec_id + "").value = result.number;
		document.getElementById('cart_amount_desc').innerHTML = result.cart_amount_desc;
		//购物车商品总价说明
		show_div_text = "恭喜您！ 商品数量修改成功！ ";
		document.getElementById("goods_numx_" + result.rec_id + "").innerHTML = 'x' + result.number;

	}

}

function closeCustomer() {
	$("#choose").hide();
}

function choose_gift(suppid) {
	var sel_goods = new Array();
	var obj_cartgoods = document.getElementsByName("sel_cartgoods[]");
	var j = 0;
	for ( i = 0; i < obj_cartgoods.length; i++) {
		//if(obj_cartgoods[i].checked == true)
		{
			sel_goods[j] = obj_cartgoods[i].value;
			j++;
		}
	}

	_showProgress();
	var d = new Date();
	url_get = api_url + 'flow.php?is_ajax=1&suppid=' + suppid + '&sel_goods=' + sel_goods + '&username=' + username + '&password=' + password;
	url_encoded = encodeURI(url_get) + (url_get.indexOf("?") === -1 ? "?" : "&") + d.getTime() + d.getMilliseconds();
	_ajax(url_encoded, "get", {

	}, "json", function(ret) {

		api.hideProgress();
		selgiftResponse(ret);

	});

	//Ajax.call('flow.php', 'is_ajax=1&suppid=' + suppid + '&sel_goods=' + sel_goods, selgiftResponse, 'GET', 'JSON');
}

function selgiftResponse(res) {
	$('#choose').html(res.result);
	$("#choose").animate({
		height : '80%'
	}, [10000]);
	var total = 0, h = $(window).height(), top = $('.f_title').height() || 0, con = $('.f_content');
	total = 0.8 * h;
	con.height(total - top + 'px');
	$(".f_mask").show();
}

function choose_gift_done() {
	_showProgress();
	formdata = $('#favoform').serialize();
	formdata = decodeURIComponent(formdata, true);
	url_get = api_url + 'flow.php?' + formdata;
	_ajax(url_get, "get", {

	}, "json", function(ret) {

		api.hideProgress();
		_sendEvent('choosegiftdone');
		_toast(ret.content);

	});

}

function close_choose() {

	$(".f_mask").hide();
	$('#choose').animate({
		height : '0'
	}, [10000]);

}

function choose_attr(rec_id) {
	_showProgress();
	var d = new Date();
	url_get = api_url + 'flow.php?is_ajax=1&step=show_choose_attr&rec_id=' + rec_id;
	url_encoded = encodeURI(url_get) + (url_get.indexOf("?") === -1 ? "?" : "&") + d.getTime() + d.getMilliseconds();
	_ajax(url_encoded, "get", {

	}, "json", function(ret) {

		api.hideProgress();
		show_choose_attr(ret.content);
		//_alert(JSON.stringify(ret));

	});

	//Ajax.call('flow.php?is_ajax=1&step=show_choose_attr', 'rec_id=' + rec_id, show_choose_attr, 'GET', 'JSON');
}

function show_choose_attr(result) {
	$("#choose_attr").animate({
		height : '80%'
	}, [10000]);
	$("#choose_attr").html(result);
	var total = 0, h = $(window).height(), top = $('.f_title_attr').height() || 0, con = $('.f_content_attr');
	total = 0.8 * h;
	con.height(total - top + 'px');
	$(".f_mask").show();
	changePrice();
}

function close_choose_attr() {

	$(".f_mask").hide();

	$('#choose_attr').animate({
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

/**
 * 点选可选属性或改变数量时修改商品价格的函数
 */
function changePrice() {
	var goodsId = document.getElementById('goods_id').value;
	var attr = getSelectedAttributes(document.forms['formCart']);
	var qty = document.getElementById('cart_goods_number').value;

	_showProgress();
	var d = new Date();
	url_get = api_url + 'goods.php?act=price&id=' + goodsId + '&attr=' + attr + '&number=' + qty + '&username=' + username + '&password=' + password;
	url_encoded = encodeURI(url_get) + (url_get.indexOf("?") === -1 ? "?" : "&") + d.getTime() + d.getMilliseconds();
	_ajax(url_encoded, "get", {

	}, "json", function(ret) {

		api.hideProgress();
		changePriceResponse(ret);
		//_alert(JSON.stringify(ret));

	});
	//
	//	//Ajax.call('goods.php', 'act=price&id=' + goodsId + '&attr=' + attr + '&number=' + qty, changePriceResponse, 'GET', 'JSON');
}

/**
 * 接收返回的信息
 */
function changePriceResponse(res) {
	if (res.err_msg.length > 0) {
		alert(res.err_msg);
	} else {
		if (document.getElementById('ECS_GOODS_AMOUNT')) {
			document.getElementById('ECS_GOODS_AMOUNT').innerHTML = res.result;
		}
		if (document.getElementById('ECS_GOODS_NUMBER')) {
			document.getElementById('ECS_GOODS_NUMBER').innerHTML = res.goods_attr_number;
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
	}
}

function editCartGoods(rec_id) {
	var goodsId = document.getElementById('goods_id').value;
	var attr = getSelectedAttributes(document.forms['formCart']);
	var qty = document.getElementById('cart_goods_number').value;

	_showProgress();
	var d = new Date();
	url_get = api_url + 'flow.php?is_ajax=1&step=edit_cart_goods&rec_id==' + rec_id + '&goods_id=' + goodsId + '&attr=' + attr + '&number=' + qty + '&username=' + username + '&password=' + password;
	url_encoded = encodeURI(url_get) + (url_get.indexOf("?") === -1 ? "?" : "&") + d.getTime() + d.getMilliseconds();
	_alert(url_encoded);
	_ajax(url_encoded, "get", {

	}, "json", function(ret) {

		api.hideProgress();
		editCartGoodsResponse(ret);
		_alert(JSON.stringify(ret));

	});

	//Ajax.call('flow.php?is_ajax=1&step=edit_cart_goods', 'rec_id=' + rec_id + '&goods_id=' + goodsId + '&attr=' + attr + '&number=' + qty, editCartGoodsResponse, 'GET', 'JSON');
}

function editCartGoodsResponse(result) {

	if (result.err != 0) {
		alert(result.err);
	} else {
		_openCart();
	}
}

function showCheckoutOther(obj) {
	var otherParent = obj.parentNode;
	otherParent.className = (otherParent.className == 'checkout_other') ? 'checkout_other2' : 'checkout_other';
	//var spanzi = obj.getElementsByTagName('span')[0];
	//spanzi.className = spanzi.className == 'right_arrow_flow' ? 'right_arrow_flow2' : 'right_arrow_flow';
}

function parseParam(params) {

	var legalParams = "";

	params = params ? params : "";

	if ( typeof (params) === "string") {

		legalParams = params;

	} else if ( typeof (params) === "object") {

		try {

			legalParams = "JSON=" + $.toJSON(params);

		} catch (ex) {

			alert("Can't stringify JSON!");

			return false;

		}

	} else {

		alert("Invalid parameters!");

		return false;

	}

	if (this.debugging.isDebugging) {

		var lf = this.debugging.linefeed, info = "[Original Parameters]" + lf + params + lf + lf + "[Parsed Parameters]" + lf + legalParams;

		this.displayDebuggingInfo(info, "param");

	}

	return legalParams;

}

function setSuitShow(suitId) {
	var suit = $('#suit_' + suitId);
	if (suit == null) {
		return;
	}

	suit.animate({
		height : '80%'
	}, [10000]);
	var total = 0, h = $(window).height(), top = $('#suit_' + suitId).find('.f_title').height() || 0, con = $('#suit_' + suitId).find('.f_content');
	total = 0.8 * h;
	con.height(total - top + 'px');
	$('.f_mask').show();

}

function close_gift(suitId) {

	$('.f_mask').hide();
	var suit = $('#suit_' + suitId);
	suit.animate({
		height : '0'
	}, [10000]);
}

function check_before_done() {
	if (document.getElementById("ECS_SURPLUS")) {
		var surplus = document.getElementById("ECS_SURPLUS").value;
		//var error = Utils.trim(Ajax.call('flow.php?step=check_surplus', 'surplus=' + surplus, null, 'GET', 'TEXT', false));

		_showProgress();
		var d = new Date();
		url_get = api_url + 'flow.php?step=check_surplus&surplus=' + surplus + '&username=' + username + '&password=' + password;

		url_encoded = encodeURI(url_get) + (url_get.indexOf("?") === -1 ? "?" : "&") + d.getTime() + d.getMilliseconds();

		_ajax(url_encoded, "get", {

		}, "json", function(ret) {

			api.hideProgress();
			if (ret.error == 1) {
				try {
					document.getElementById("ECS_SURPLUS_NOTICE").innerHTML = ret.content;
				} catch (ex) {
				}
				return false;
			}
		});

	}

	// 检查用户输入的积分
	if (document.getElementById("ECS_INTEGRAL")) {
		var integral = document.getElementById("ECS_INTEGRAL").value;

		//var error = Utils.trim(Ajax.call('flow.php?step=check_integral', 'integral=' + integral, null, 'GET', 'TEXT', false));
		_showProgress();
		var d = new Date();
		url_get = api_url + 'flow.php?step=check_integral&integral=' + integral + '&username=' + username + '&password=' + password;

		url_encoded = encodeURI(url_get) + (url_get.indexOf("?") === -1 ? "?" : "&") + d.getTime() + d.getMilliseconds();

		_ajax(url_encoded, "get", {

		}, "json", function(ret) {

			api.hideProgress();
			if (ret.error == 1) {
				try {
					document.getElementById("ECS_INTEGRAL_NOTICE").innerHTML = ret.content;
				} catch (ex) {
				}
				return false;
			}

		});

	}

	/*检查发票*/
	if (document.getElementById('ECS_NEEDINV') && document.getElementById('ECS_NEEDINV').checked) {
		if (frm.elements['inv_content'].value == '0' || frm.elements['inv_content'].value == '') {
			alert('请选择发票内容');
			return false;
		}
		if (frm.elements['inv_type'].value == 'vat_invoice') {
			var check_array = new Array('vat_inv_company_name', 'vat_inv_taxpayer_id', 'vat_inv_registration_address', 'vat_inv_registration_phone', 'vat_inv_deposit_bank', 'vat_inv_bank_account', 'inv_consignee_name', 'inv_consignee_phone', 'inv_consignee_province', 'inv_consignee_city', 'inv_consignee_address');
			for (id in check_array) {
				if (frm.elements[check_array[id]].style.display != 'none' && (frm.elements[check_array[id]].value == '0' || frm.elements[check_array[id]].value == '')) {
					alert('请输入增值税发票相关信息');
					return false;
				}
			}
		} else if (frm.elements['inv_type'].value == 'normal_invoice') {
			if (document.getElementById('unit_inv').checked) {
				if (frm.elements['inv_payee'].value == '') {
					alert('请输入单位名称');
					return false;
				}
			} else if (!document.getElementById('unit_inv').checked && !document.getElementById('individual_inv').checked) {
				alert('请选择发票抬头');
				return false;
			}
		} else {
			alert('请选择发票类型');
			return false;
		}
	}

	return true;

}

function ajax_check_done() {

	api.showProgress({
		style : 'default',
		animationType : 'fade',
		title : '正在提交订单...',
		text : '请稍等...',
		modal : false
	});

	var formdata = $("#theForm").serialize();
	//alert(formdata);

	var d = new Date();
	url_get = api_url + 'flow.php?step=done&' + formdata;

	_ajax(url_get, "get", {	}, "json", function(ret) {

		api.hideProgress();

	//	_alert(JSON.stringify(ret));return;

		if (ret.error == 0) {

			tjcontent = ret.content;

			api.openWin({
				name : 'checkdone',
				url : 'checkdone_win.html',
				pageParam : {
					tjcontent : tjcontent
				}
			});
			_sendEvent("checkdone");
			setTimeout('api.closeWin()', 800);

		} else if (ret.error == 100) {
			//100 购物车没有产品
			try {

				_alert(ret.content);
			} catch (ex) {
			}

		} else if (ret.error == 101) {
			//101赠品送完
			try {

				_alert(ret.content);
			} catch (ex) {
			}

		} else if (ret.error == 102) {
			//102未登录
			try {

				_alert(ret.content);
			} catch (ex) {
			}

		} else if (ret.error == 103) {
			//102没有收获人
			try {

				_alert(ret.content);
			} catch (ex) {
			}

		} else if (ret.error == 104) {
			//no_goods_in_cart
			try {

				_alert(ret.content);
			} catch (ex) {
			}

		} else if (ret.error == 105) {
			//n/* 检查商品总额是否达到最低限购金额 */
			try {

				_alert(ret.content);
			} catch (ex) {
			}

		} else if (ret.error == 106) {
			//n/* 请选择各个商家的配送方式！ */
			try {

				_alert(ret.content);
			} catch (ex) {
			}

		}
		//配送方式存在不可用，请重新选择！
		else if (ret.error == 107) {

			try {

				_alert(ret.content);
			} catch (ex) {
			}

		}
		//$_LANG['flow_no_shipping']

else if (ret.error == 108) {

			try {

				_alert(ret.content);
			} catch (ex) {
			}

		}

		//'支付方式必须选择一项!'

else if (ret.error == 109) {

			try {

				_alert(ret.content);
			} catch (ex) {
			}

		}

		//$_LANG['balance_not_enough']

else if (ret.error == 110) {

			try {

				_alert(ret.content);
			} catch (ex) {
			}

		} else {
			try {

				_alert(ret.content);
			} catch (ex) {
			}

		}

	});

}

function ajax_add_address() {

	consignee = $('.consignee').val();
	email = $('.email').val();
	country = $('.login_text').val();
	province = $('.province_select').val();
	city = $('.city').val();
	district = $('.district').val();
	address = $('.address').val();
	mobile = $('.mobile').val();

	var msg = new Array();
	var err = false;

	if ($('.province_select').val() == 0) {
		err = true;
		msg.push(province_not_null);
	}

	if (city == 0) {
		err = true;
		msg.push(city_not_null);
	}

	if ($('.district').val() == 0) {
		err = true;
		msg.push(district_not_null);
	}

	if (Utils.isEmpty(consignee)) {
		err = true;
		msg.push(consignee_not_null);
	}
	if (email !== '' && ! Utils.isEmail($('.email').val())) {
		err = true;
		msg.push(invalid_email);
	}

	if ($('.address') && Utils.isEmpty($('.address').val())) {
		err = true;
		msg.push(address_not_null);
	}

	if ($('.mobile') && (Utils.isEmpty($('.mobile').val()))) {
		err = true;
		msg.push(mobi_not_null);
	} else {
		if ($('.mobile') && !Utils.isMobile($('.mobile').val())) {
			err = true;

			msg.push(mobile_invaild);

		}

	}

	if (err) {

		message = msg.join("\n");

		_alert(message);

	} else {

		//alert(consignee);

		_showProgress();
		var d = new Date();
		url_get = api_url + 'flow.php?step=add_consignee&username=' + username + '&password=' + password;
		url_encoded = encodeURI(url_get) + (url_get.indexOf("?") === -1 ? "?" : "&") + d.getTime() + d.getMilliseconds();

		var data = {
			consignee : $('.consignee').val(),
			email : $('.email').val(),
			country : $('.login_text').val(),
			province : $('.province_select').val(),
			city : $('.city').val(),
			district : $('.district').val(),
			address : $('.address').val(),
			mobile : $('.mobile').val(),
			step : 'add_consignee',
		};

		_ajax(url_encoded, "post", {
			values : data
		}, "json", function(ret) {

			url_get1 = api_url + 'flow.php?step=checkout';

			url_encoded1 = encodeURI(url_get1);

			_ajax(url_encoded1, "get", {

			}, "json", function(ret) {

				api.hideProgress();

				if (ret.error == 401) {
					api.openWin({
						name : 'ckaddress',
						url : '../checkout/ckaddress_win.html',
						pageParam : {
							content : ret.content
						}
					});

				} else {
					api.openWin({
						name : 'checkout',
						url : '../checkout/checkout_win.html',
						pageParam : {
							content : ret.content
						},
						reload : true
					});
				}
				setTimeout('api.closeWin()', 1000);

			});

		});
	}

}

function ajax_add_address1() {

	consignee = $('.consignee').val();
	email = $('.email').val();
	country = $('.login_text').val();
	province = $('.province_select').val();
	city = $('.city').val();
	district = $('.district').val();
	address = $('.address').val();
	mobile = $('.mobile').val();

	var msg = new Array();
	var err = false;

	if ($('.province_select').val() == 0) {
		err = true;
		msg.push(province_not_null);
	}

	if (city == 0) {
		err = true;
		msg.push(city_not_null);
	}

	if ($('.district').val() == 0) {
		err = true;
		msg.push(district_not_null);
	}

	if (Utils.isEmpty(consignee)) {
		err = true;
		msg.push(consignee_not_null);
	}
	if (email !== '' && ! Utils.isEmail($('.email').val())) {
		err = true;
		msg.push(invalid_email);
	}

	if ($('.address') && Utils.isEmpty($('.address').val())) {
		err = true;
		msg.push(address_not_null);
	}

	if ($('.mobile') && (Utils.isEmpty($('.mobile').val()))) {
		err = true;
		msg.push(mobi_not_null);
	} else {
		if ($('.mobile') && !Utils.isMobile($('.mobile').val())) {
			err = true;

			msg.push(mobile_invaild);

		}

	}

	if (err) {

		message = msg.join("\n");

		_alert(message);

	} else {

		_showProgress();
		var d = new Date();
		url_get = api_url + 'flow.php?step=add_consignee&username=' + username + '&password=' + password;
		url_encoded = encodeURI(url_get) + (url_get.indexOf("?") === -1 ? "?" : "&") + d.getTime() + d.getMilliseconds();

		var data = {
			consignee : $('.consignee').val(),
			email : $('.email').val(),
			country : $('.login_text').val(),
			province : $('.province_select').val(),
			city : $('.city').val(),
			district : $('.district').val(),
			address : $('.address').val(),
			mobile : $('.mobile').val(),
			step : 'add_consignee',
		};

		_ajax(url_encoded, "post", {
			values : data
		}, "json", function(ret) {

			api.hideProgress();
			api.alert({
				msg : ret.content
			}, function(ret, err) {
				api.closeWin({
				});
			});
		});
	}

}

function ajax_edit_address() {

	consignee = $('.consignee').val();
	email = $('.email').val();
	country = $('.login_text').val();
	province = $('.province_select').val();
	city = $('.city').val();
	district = $('.district').val();
	address = $('.address').val();
	mobile = $('.mobile').val();

	var msg = new Array();
	var err = false;

	if ($('.province_select').val() == 0) {
		err = true;
		msg.push(province_not_null);
	}

	if (city == 0) {
		err = true;
		msg.push(city_not_null);
	}

	if ($('.district').val() == 0) {
		err = true;
		msg.push(district_not_null);
	}

	if (Utils.isEmpty(consignee)) {
		err = true;
		msg.push(consignee_not_null);
	}
	if (email !== '' && ! Utils.isEmail($('.email').val())) {
		err = true;
		msg.push(invalid_email);
	}

	if ($('.address') && Utils.isEmpty($('.address').val())) {
		err = true;
		msg.push(address_not_null);
	}

	if ($('.mobile') && (Utils.isEmpty($('.mobile').val()))) {
		err = true;
		msg.push(mobi_not_null);
	} else {
		if ($('.mobile') && !Utils.isMobile($('.mobile').val())) {
			err = true;

			msg.push(mobile_invaild);

		}

	}

	if (err) {

		message = msg.join("\n");

		_alert(message);

	} else {

		//alert(consignee);

		_showProgress();
		var d = new Date();
		url_get = api_url + 'user.php?act=act_edit_address&username=' + username + '&address_id=' + address_id + '&password=' + password;
		url_encoded = encodeURI(url_get) + (url_get.indexOf("?") === -1 ? "?" : "&") + d.getTime() + d.getMilliseconds();

		var data = {
			consignee : $('.consignee').val(),
			email : $('.email').val(),
			country : $('.login_text').val(),
			province : $('.province_select').val(),
			city : $('.city').val(),
			district : $('.district').val(),
			address : $('.address').val(),
			mobile : $('.mobile').val(),
			step : 'add_consignee',
		};

		_ajax(url_encoded, "post", {
			values : data
		}, "json", function(ret) {

			api.hideProgress();

			//_alert(JSON.stringify(ret));

		});
	}

}
