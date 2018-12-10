

var action = '';//open_surplus,close_surplus,verify_surplus

function open_surplus_window() {
  if(action == 'close_surplus' || action == 'verify_surplus'){
    document.getElementById("popup_window").style.display = "";
    document.getElementById("surplus_label2").style.display = "none";
    document.getElementById("surplus_password_input2").style.display = "none";
  }
  else if(action == 'open_surplus'){
    document.getElementById("popup_window").style.display = "";
    document.getElementById("surplus_label2").style.display = "";
    document.getElementById("surplus_password_input2").style.display = "";
  }
}

function close_surplus_window(){
  document.getElementById("surplus_password_input1").value="";
  document.getElementById("surplus_password_input2").value="";
  document.getElementById("popup_window").style.display="none";
  document.getElementById("surplus_label2").style.display="none";
  document.getElementById("surplus_password_input2").style.display="none";
  action = '';
}

function open_surplus(){
  action = 'open_surplus';
  open_surplus_window();
}

function close_surplus(){
  action = 'close_surplus';
  open_surplus_window();
}

function end_input_surplus(){
  if(action == 'open_surplus')
  {
    var pwd1 = document.getElementById("surplus_password_input1").value;
    var pwd2 = document.getElementById("surplus_password_input2").value;
    var msg = '';
    if(pwd1 !== pwd2)
    {
      msg = "密码不匹配\n";
    }
    if(pwd1.length < 6)
    {
      msg = msg + "您输入的密码太短\n"
    }

    if(msg.length > 0)
    {
      alert(msg);
    }
    else
    {
      Ajax.call('user.php?act=open_surplus_password','surplus_password='+pwd1,open_surplus_response,'GET','TEXT',true,true);
    }
  }
  else if(action == 'close_surplus')
  {
    var pwd1 = document.getElementById("surplus_password_input1").value;
    Ajax.call('user.php?act=close_surplus_password','surplus_password='+pwd1,close_surplus_response,'GET','TEXT',true,true);
  }
  else if(action == 'verify_surplus')
  {
    var pwd1 = document.getElementById("surplus_password_input1").value;
    Ajax.call('user.php?act=verify_surplus_password','surplus_password='+pwd1,verify_surplus_response,'GET','TEXT',true,true);
  }
}

function cancel_input_surplus()
{
  close_surplus_window();
}

function open_surplus_response(obj)
{
  if(obj == 1)
  {
    window.location="?act=account_security";
  }
  else
  {
    close_surplus_window();
    alert('开启失败！');
  }
}

function close_surplus_response(obj)
{
  if(obj == 1)
  {
    window.location="?act=account_security";
  }
  else
  {
    close_surplus_window();
    alert('关闭失败！');

  }
}

function verify_surplus_response(result)
{
  if(result == 1)
  {
    submit_surplus_form();
  }
  else
  {
    alert('密码错误！');
  }
}

function check_surplus_open(form)
{
  var surplus = form[0].value;
  if(surplus > 0)
  {
    //Ajax.call("user.php?act=check_surplus_open","",check_surplus_open_response,"GET",true,true);
  }
  else
  {
    alert('输入的余额必须大于零！');
  }
  return false;
}

function check_surplus_open_response(result)
{
  if(result == '1')
  {
    action = 'verify_surplus';
    open_surplus_window();
  }
  else
  {
    submit_surplus_form();
  }
}

function submit_surplus_form(){
  document.getElementById("formFee").submit();
}






	function choose_attr() {
		$("#choose_attr").animate({
			height : '80%'
		}, [10000]);
		var total = 0, h = $(window).height(), top = $('.f_title_attr').height() || 0, con = $('.f_content_attr');
		total = 0.8 * h;
		con.height(total - top + 'px');
		$(".f_mask").show();
	}

	function close_choose_attr() {
		$(".f_mask").hide();
		$('#choose_attr').animate({
			height : '0'
		}, [10000]);
	}

	function choose_payment(pay_id) {
		if (pay_id == 'alipay_bank') {
			document.getElementById('payment_subbox').style.display = 'block';
		} else {
			document.getElementById('payment_subbox').style.display = 'none';
		}
	}

	function payment_validate() {
		var arr = document.getElementsByName("pay_code");
		var do_pay = false;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].checked) {
				do_pay = true;
			}
		}
		if (do_pay) {
			return true;
		} else {
			alert("请选择一个支付方式");
			return false;
		}
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



