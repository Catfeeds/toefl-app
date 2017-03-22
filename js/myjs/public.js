//jQuery(function() {
mui.init({
	//监听Android手机的back、menu按键
	keyEventBind: {
		backbutton: false,  //Boolean(默认true)关闭back按键监听
		menubutton: false   //Boolean(默认true)关闭menu按键监听
	}
});
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
//	mui('body').on('tap', 'a', function() {
//		document.location.href = this.href;
//	});

//});
//在android4.4.2中的swipe事件，需要preventDefault一下，否则触发不正常
window.addEventListener('dragstart', function(e) {
	mui.gestures.touch.lockDirection = true; //锁定方向
	mui.gestures.touch.startDirection = e.detail.direction;
});
window.addEventListener('dragright', function(e) {
	if(!mui.isScrolling) {
		e.detail.gesture.preventDefault();
	}
});

// 关闭自身窗口
function closeme() {
	var ws = plus.webview.currentWebview();
	plus.webview.close(ws);
}

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

//注册倒计时函数
function clickDX(e, timeN, type) {
	var _that = $(e);
	var defalutVal = $(e).html();
	var timeNum = timeN;
	if(type == 1) {
		//var phone=$("#phone").val();
		//区分是注册的手机号还是找回密码的手机号
		var phone = $(e).parent().prev("li").find("input").val();
		var phoneStr = $(e).parent().siblings().find("input").next(".Validform_right").html();
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
							localStorage.setItem("phoneCode", data.phonecode);

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
	} else {
		//var phone=$("#phone").val();
		//区分是注册的手机号还是找回密码的手机号
		var email = $(e).parent().siblings().find("input").val();
		var emailStr = $(e).parent().siblings().find("input").next(".Validform_right").html();
		if(!email) {
			alert("请输入邮箱！");
			return false;
		}
		if(emailStr == "通过信息验证！") {
			$.ajax({
				type: "post",
				url: "http://login.gmatonline.cn/cn/wap-api/send-mail",
				dataType: "json",
				data: {
					email: email,
					type: type
				},
				//jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
				//jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
				success: function(data) {
					alert(data.message);
					if(data.message == "发送失败!邮箱为空！") {
						return false;
					} else {

						localStorage.setItem("emailCode", data.code);
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
/**
 *将秒转换为 hh:mm:ss
 *
 */
function time_To_hhmmss(seconds) {
	var hh;
	var mm;
	var ss;
	//传入的时间为空或小于0
	if(seconds == null || seconds < 0) {
		return;
	}
	//得到小时
	hh = seconds / 3600 | 0;
	seconds = parseInt(seconds) - hh * 3600;
	if(parseInt(hh) < 10) {
		hh = "0" + hh;
	}
	//得到分
	mm = seconds / 60 | 0;
	//得到秒
	ss = parseInt(seconds) - mm * 60;
	if(parseInt(mm) < 10) {
		mm = "0" + mm;
	}
	if(ss < 10) {
		ss = "0" + ss;
	}
	if(hh != 0) {
		return hh + "h" + mm + "m" + ss + "s";
	} else if(mm != 0) {
		return parseInt(mm) + "m" + ss + "s";
	} else if(ss != 0) {
		return parseInt(ss) + "s";
	}

}

function getTimeFromSeconds(totalSeconds) {
	if(totalSeconds < 86400) {
		var dt = new Date("01/01/2000 0:00");
		dt.setSeconds(totalSeconds);
		return formatTime(dt);
	} else {
		return null;
	}
}

function formatTime(dt) {
	var h = dt.getHours(),
		m = dt.getMinutes(),
		s = dt.getSeconds(),
		r = "";
	if(h > 0) {
		r += (h > 9 ? h.toString() : "0" + h.toString()) + ":";
	}
	r += (m > 9 ? m.toString() : "0" + m.toString()) + ":"
	r += (s > 9 ? s.toString() : "0" + s.toString());
	return r;
}
//mui的无传值跳转页面方式
function jumpPage(obj, urlStr) {
//		mui.plusReady(function() {
//				jQuery(obj)[0].addEventListener("tap", function() {
//						// 获取所有Webview窗口
//						var curr = plus.webview.currentWebview();
//						plus.webview.open(urlStr);
//						curr.close();
//					});
//					});
	var webview_style = {
		popGesture: "close"
	};
	jQuery(obj)[0].addEventListener("tap", function() {
		mui.openWindow({
			id: urlStr,
			url: urlStr,
			styles: webview_style,
			waiting: {
				autoShow: false
			}
		});
	});
	
	
}

//转意符换成普通字符
function escape2Html(str) {
	var arrEntities = {
		'lt': '<',
		'gt': '>',
		'nbsp': ' ',
		'amp': '&',
		'quot': '"'
	};
	return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function(all, t) {
		return arrEntities[t];
	});
}
//时间戳转换 为时间
function formatDate(now) {
	var now = new Date(now * 1000);
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var date = now.getDate();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	return year + "-" + fixZero(month, 2) + "-" + fixZero(date, 2) + "  " ;
//	+ fixZero(hour, 2) + ":" + fixZero(minute, 2) + ":" + fixZero(second, 2);
}
//时间如果为单位数补0  
function fixZero(num, length) {
	var str = "" + num;
	var len = str.length;
	var s = "";
	for(var i = length; i-- > len;) {
		s += "0";
	}
	return s + str;
}