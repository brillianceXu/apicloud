function scrolling() {
	TouchSlide({
		slideCell : "#scrollimg",
		titCell : ".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
		mainCell : ".bd ul",
		effect : "leftLoop",
		autoPage : true, //自动分页
		autoPlay : true //自动播放
	});
}

function scrollbest() {
	TouchSlide({
		slideCell : "#scroll_best",
		titCell : ".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
		effect : "leftLoop",
		autoPage : true, //自动分页
		//switchLoad:"_src" //切换加载，真实图片路径为"_src"
	});
}

function scrollnew() {
	TouchSlide({
		slideCell : "#scroll_new",
		titCell : ".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
		effect : "leftLoop",
		autoPage : true, //自动分页
		//switchLoad:"_src" //切换加载，真实图片路径为"_src"
	});
}

function scrollhot() {
	TouchSlide({
		slideCell : "#scroll_hot",
		titCell : ".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
		effect : "leftLoop",
		autoPage : true, //自动分页
		//switchLoad:"_src" //切换加载，真实图片路径为"_src"
	});
}

function scrolltop() {

	var oMarquee = document.getElementById("mq");
	//滚动对象
	var iLineHeight = 30;
	//单行高度，像素
	var iLineCount = 7;
	//实际行数
	var iScrollAmount = 1;
	//每次滚动高度，像素
	function run() {
		oMarquee.scrollTop += iScrollAmount;
		if (oMarquee.scrollTop == iLineCount * iLineHeight)
			oMarquee.scrollTop = 0;
		if (oMarquee.scrollTop % iLineHeight == 0) {
			window.setTimeout("run()", 2000);
		} else {
			window.setTimeout("run()", 50);
		}
	}


	oMarquee.innerHTML += oMarquee.innerHTML;
	window.setTimeout("run()", 2000);

}

function promotiontime() {
	var Tday = new Array();
	var daysms = 24 * 60 * 60 * 1000
	var hoursms = 60 * 60 * 1000
	var Secondms = 60 * 1000
	var microsecond = 1000
	var DifferHour = -1
	var DifferMinute = -1
	var DifferSecond = -1
	function clock(key) {
		var time = new Date()
		var hour = time.getHours()
		var minute = time.getMinutes()
		var second = time.getSeconds()
		var timevalue = "" + ((hour > 12) ? hour - 12 : hour)
		timevalue += ((minute < 10) ? ":0" : ":") + minute
		timevalue += ((second < 10) ? ":0" : ":") + second
		timevalue += ((hour > 12 ) ? " PM" : " AM")
		var convertHour = DifferHour
		var convertMinute = DifferMinute
		var convertSecond = DifferSecond
		var Diffms = Tday[key].getTime() - time.getTime()
		DifferHour = Math.floor(Diffms / daysms)
		Diffms -= DifferHour * daysms
		DifferMinute = Math.floor(Diffms / hoursms)
		Diffms -= DifferMinute * hoursms
		DifferSecond = Math.floor(Diffms / Secondms)
		Diffms -= DifferSecond * Secondms
		var dSecs = Math.floor(Diffms / microsecond)

		if (convertHour != DifferHour)
			a = DifferHour + ":";
		if (convertMinute != DifferMinute)
			b = DifferMinute + ":";
		if (convertSecond != DifferSecond)
			c = DifferSecond + ":";
		d = dSecs;
		if (DifferHour > 0) {
			a = a
		} else {
			a = ''
		}
		document.getElementById("jstimerBox" + key).innerHTML = a + b + c + d;
		//显示倒计时信息
	}

}