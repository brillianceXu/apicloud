var taobao, model;
apiready = function() {

}
function alilogin() {
	var aliPay = api.require('aliPay');
	api.showProgress({
		style : 'default',
		animationType : 'fade',
		title : '启动中...',
		text : '请稍等...',
		modal : false
	});
	aliPay.auth({
		appId : '2017070507648977',
		partner: '2088721145347024',
		targetId : 'kk123421kkk091125'
	}, function(ret) {
		api.hideProgress();
		alert(JSON.stringify(ret));
	});
}

function wxlogin() {
	var wx = api.require('wx');
	api.showProgress({
		style : 'default',
		animationType : 'fade',
		title : '启动微信中...',
		text : '请稍等...',
		modal : false
	});
	wx.isInstalled(function(ret, err) {
		api.hideProgress();
		if (ret.installed) {
			wx.auth({
				apiKey : ''
			}, function(ret1, err1) {
				if (ret1.status) {
					wx.getToken({
						apiKey : '',
						apiSecret : '',
						code : ret1.code
					}, function(ret2, err2) {
						if (ret2.status) {
							wx.getUserInfo({
								accessToken : ret2.accessToken,
								openId : ret2.openId
							}, function(ret3, err3) {
								if (ret3.status) {

									var data = ret3;
									data.act = "wxlogin";
									//alert(JSON.stringify(data));
									_ajax(api_url + 'user.php', 'post', {
										values : data
									}, 'json', function(ret4) {
										api.hideProgress();
										if (ret4.error == 1) {
											_toast(ret4.content);
										} else {
											_toast("登陆成功！");

											_setStorage('username', ret4.content.username);
											_setStorage('password', ret4.content.password);
											_setStorage('uid', ret4.content.uid);
											_setStorage('headimgurl', ret4.content.headimgurl);
											_sendEvent("userlogin");
											api.closeWin();
										}

									});

								} else {
									alert('err3' + err3.code);
								}
							});
						} else {
							alert('err2' + err2.code);
						}
					});

				} else {
					alert('err1' + err1.code);
				}
			});

		} else {
			alert('当前设备未安装微信客户端');
		}
	});

}

function login() {
	api.showProgress({
		style : 'default',
		animationType : 'fade',
		title : '登陆中...',
		text : '请稍等...',
		modal : false
	});

	var name = $api.byId('username').value;
	if (name == "") {
		$api.byId('username').focus();
	}
	var pwd = $api.byId('password').value;
	if (pwd == "") {
		$api.byId('password').focus();
	}
	var data = {
		'username' : name,
		'password' : pwd,
		'info' :true,
		'act' : 'act_login'
	};
	_ajax(api_url + 'user.php', 'post', {
		values : data
	}, 'json', function(ret) {
		api.hideProgress();
		if (ret.error == 1) {
			_toast(ret.content);
		} else {
			_toast("登陆成功！");

			_setStorage('username', ret.content.user_name);
			_setStorage('password', pwd);
			_setStorage('uid', ret.content.user_id);
			_setStorage('headimgurl', ret.content.headimg);
			_sendEvent("userlogin");
			api.closeWin();
		}

	});

}

function register() {
	api.openWin({
		name : 'register',
		url : 'register.html',
		opaque : true,
		vScrollBarEnabled : false
	});
}

function changepsw() {
	api.openWin({
		name : 'changepsw',
		url : 'changepsw.html',
		opaque : true,
		vScrollBarEnabled : false
	});
}
