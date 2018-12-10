function initcate() {

	$(document).ready(function() {
		//筛选浮层显示控制
		var filtrate = $(".filtrate"), submit = $(".submit,.back,.reset");
		filtrate.bind("click", function() {
			$("._next").show();
			$("._pre").hide();
			window.scrollTo(0, 0);
		});
		submit.bind("click", function() {
			$("._next").hide();
			$("._pre").show();
		});
		//初始化筛选浮层
		bizFilter.init();
	});

	$(function() {
		//搜索浮层显示逻辑
		var sbox = $("#head_search_box"), sort = $('#product_sort'), g_list = $("#goods_list"), g_m1 = "0", g_m2 = "96px";
		var initCss = function(type) {
			if (type == 1) {
				sort.css({
					"position" : "static",
					"width" : "100%"
				});
				g_list.css("margin-top", g_m1);
			} else {
				sort.attr("style", "");
				g_list.css("margin-top", g_m2);
			}
		};
		var m = {
			input : $("#keyword"),
			rawAll : '',
			dd : $(".text_box"),
			cancel : $(".mix_back"),
			rawKey : '请输入商品名称 货号',
			main : function() {
				this.init();
				this.be();
			},
			init : function() {
				this.rawAll = this.input.val();
			},
			be : function() {
				var _this = this;
				this.input.focus(function() {
					var mix_search = $("#mix_search_div");
					if (mix_search.length > 0) {
						$("._pre").hide();
						mix_search.show();
						$("#keyword1").focus();
						return;
					}
					var newKey = _this.input.val();
					if (newKey != _this.rawKey && newKey != _this.rawAll) {
						$(this).val(newKey);
					} else {
						$(this).val(_this.rawKey);
					}
					if ($(window).scrollTop() > 0) {
						initCss(1);
						window.scrollTo(0, 0);
						_this.dd.trigger("click");
						//for ddclick
					}
				}).blur(function() {
					var newKey = _this.input.val();
					if (newKey === _this.rawKey) {
						$(this).val(_this.rawAll);
					} else {
						$(this).val(newKey);
					}
				});
				this.cancel.bind("click", function() {
					$("#mix_search_div").hide();
					$("._pre").show();
				});
				document.getElementById("clear_input").onclick = function() {
					$("#mix_search_div").hide();
					$("._pre").show();
				}
			}
		};
		m.main();
		$(window).resize(function() {
			sbox.css("width", "100%");
			sort.css("width", "100%");
		});
		//顶部sticky效果
		setTimeout(function() {
			var sboxH = sbox.height();
			var sortH = sort.height();
			var sortStart = sort.offset().top - sboxH;
			var showEnd = sort.offset().top;
			var init = function() {
				sbox.css({
					"position" : "fixed",
					"top" : "0"
				});
				window.scrollTo(0, 0);
			};
			var rawScroll = 0, nowScroll = 0;
			var upOrDown = function() {
				var delta = 30;
				if (nowScroll > rawScroll + delta) {
					return 1;
				} else if (nowScroll < rawScroll - delta) {
					return 2;
				} else {
					return 0;
				}
			};
			var sticky = function() {
				nowScroll = $(window).scrollTop();
				if (nowScroll >= sortStart) {
					sort.css({
						"position" : "fixed",
						"top" : sboxH,
						"z-index" : "9999"
					});
					g_list.css({
						"margin-top" : sortH
					});
				} else {
					sort.attr("style", "");
					g_list.attr("style", "");
				}
				if (nowScroll > showEnd + sortH) {
					var up = upOrDown();
					if (up == 1) {
						if (sbox.css("display") != "none") {
							sbox.hide();
							sort.hide();
						}
						rawScroll = nowScroll;
					} else if (up == 2) {
						if (sbox.css("display") == "none") {
							sbox.show();
							sort.show();
						}
						rawScroll = nowScroll;
					}
				} else {
					if (sbox.css("display") == "none") {
						sbox.show();
						sort.show();
					}
				}
			};
			init();
			$(document).on("touchmove", sticky);
			$(window).on("scroll", sticky);
		}, 500);
	});

	$('.show_type').bind("click", function() {
		if ($('#goods_list').hasClass('openList')) {
			$('#goods_list').removeClass('openList');
			$(this).removeClass('show_list');
		} else {
			$('#goods_list').addClass('openList');
			$(this).addClass('show_list');
		}
	});

	$('.filtrate_has li').click(function() {
		$(this).find("input").attr("checked", "checked");
		$('.filtrate_has li').removeClass("on");
		$(this).addClass("on");
	})

	$('.filtrate_has1 li').click(function() {
		if ($(this).hasClass("on")) {
			$(this).find("input").attr("checked", "");
			$(this).removeClass("on");
		} else {
			$(this).find("input").attr("checked", "checked");
			$(this).addClass("on");
		}
	})
}

function get_brand(brand_id) {
	document.getElementById('brand').value = brand_id;
	var obj = document.getElementById('brands').getElementsByTagName('li');
	for (var i = 0; i < obj.length; i++) {
		obj[i].className = '';
	}
	document.getElementById('brand_' + brand_id).className = 'on';
}

function get_price(price_min, price_max) {
	document.getElementById('price_min').value = price_min;
	document.getElementById('price_max').value = price_max;
	var obj = document.getElementById('prices').getElementsByTagName('a');
	for (var i = 0; i < obj.length; i++) {
		obj[i].className = '';
	}
	document.getElementById('price_' + price_min).className = 'on';
}

function goods_cut($val) {
	var num_val = document.getElementById('number_' + $val);
	var new_num = num_val.value;
	var Num = parseInt(new_num);
	if (Num > 1)
		Num = Num - 1;
	num_val.value = Num;
}

function goods_add($val) {
	var num_val = document.getElementById('number_' + $val);
	var new_num = num_val.value;
	var Num = parseInt(new_num);
	Num = Num + 1;
	num_val.value = Num;
}

