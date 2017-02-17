jQuery(function() {
	mui.init();
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	mui('body').on('tap', 'a', function() {
		document.location.href = this.href;
	});

});
//写cookies
function setCookie(objName, objValue, objHours) { //添加cookie
	var str = objName + "=" + escape(objValue);
	if(objHours > 0) { //为0时不设定过期时间，浏览器关闭时cookie自动消失
		var date = new Date();
		var ms = objHours * 3600 * 1000;
		date.setTime(date.getTime() + ms);
		str += "; expires=" + date.toGMTString();
	}
	document.cookie = str;
}
//读取cookies
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))

		return unescape(arr[2]);
	else
		return null;
}

//删除cookies
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}


//倒计时函数
function clickDX(e, timeN, type) {
	var _that = $(e);
	var defalutVal = $(e).html();
	var timeNum = timeN;
	//var phone=$("#phone").val();
	//区分是注册的手机号还是找回密码的手机号
	var phone = $(e).parent().siblings().find("input").val();
	var phoneStr = $(e).parent().prevAll("li").find("input").next(".Validform_right").html();
	if(!phone) {
		alert("请输入手机号！");
		return false;
	}
	if(phoneStr == "通过信息验证！") {
		$.ajax({
			type: "post",
			url: "http://login.gmatonline.cn/cn/wap-api/phone-code",
			dataType: "json",
			data: {
				phoneNum: phone,
				type: type
			},
			//jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
			//jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
			success: function(data) {
				alert(data.message);
				if(data.message == "发送失败!手机号码为空！") {
					return false;
				} else {
					if(data.code == 1) {
						setCookie("phoneCode", data.phonecode);
					}
					//$(e).removeAttr("onclick");
					$(e).attr("disabled", true);
					_that.unbind("click").html(timeNum + "秒后");
					var timer = setInterval(function() {
						_that.html(timeNum + "秒后");
						timeNum--;
						if(timeNum < 0) {
							clearInterval(timer);
							$(e).removeAttr("disabled");
							_that.html(defalutVal);

						}
					}, 1000);
				}
			},
			error: function() {
				alert('fail');
			}
		});
	}
}

//h5获取本地Url，上传图片
function getObjectURL(file) {
	var url = null;
	if(window.createObjectURL != undefined) { // basic
		url = window.createObjectURL(file);
	} else if(window.URL != undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file);
	} else if(window.webkitURL != undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
}