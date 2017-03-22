jQuery(function() {
	$('#username').val('');
	$('#password').val('');
	jQuery(".group-input").Validform({
		btnSubmit: "#sub_b",
		showAllError: true,
		tiptype: 3
	});
	jQuery("#close-icon")[0].addEventListener("tap", function() {
		mui.openWindow({
			id:"index",
			url: "index.html"
		})
	});
	jQuery("#sub_b")[0].addEventListener("tap", function() {
		subLogin('#username', '#password');
	});
});
//登录

function subLogin(name, pass) {
	var username = $(name).val();
	var password = $(pass).val();
	if(!username) {
		alert("请输入用户名！");
		return false;
	} else if(!password) {
		alert("请输入密码！");
		return false;
	} else {

		$.ajax({
			type: "post",
			url: "http://login.gmatonline.cn/cn/wap-api/check-login?userName=" + username + "&userPass=" + password,
			dataType: "jsonp",
			jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
			jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函啊啊数名称，默认为jQuery自动生成的随机函数名
			success: function(data) {
				if(data.code == 1) {
					//              setCookie('userCode',data.code);
					//              setCookie('userName',data.username);
					localStorage.setItem('userName', data.username);
					localStorage.setItem('userCode', data.code);
					localStorage.setItem('uid', data.uid);
					//托福
					$.ajax({
						type: "post",
						url: "http://www.toeflonline.cn/cn/wap-api/unify-login?uid=" + data.uid + "&username=" + data.username + "&password=" + data.password +
							"&email=" + data.email + "&phone=" + data.phone,
						dataType: "jsonp",
						jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
						jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
						success: function(data01) {
							//                      setCookie('userId',data01.userId);
						
							localStorage.setItem('userId', data01.userId);
							//留学
							$.ajax({
								type: "post",
								url: "http://smartapply.gmatonline.cn/cn/wap-api/unify-login?uid=" + data.uid + "&username=" + data.username + "&password=" + data.password +
									"&email=" + data.email + "&phone=" + data.phone,
								dataType: "jsonp",
								jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
								jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
								success: function(data02) {
									//                              setCookie('s_userId',data02.userId);
									localStorage.setItem('s_userId', data02.userId);
									//gmat
									$.ajax({
										type: "post",
										url: "http://www.gmatonline.cn/index.php?web/webapi/unifyLogin&uid=" + data.uid + "&username=" + data.username + "&password=" + data.password +
											"&email=" + data.email + "&phone=" + data.phone,
										dataType: "jsonp",
										jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
										jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
										success: function() {
											//bbs
											$.ajax({
												type: "post",
												url: "http://bbs.gmatonline.cn/api/gmat.php?action=unifyLogin&uid=" + data.uid,
												dataType: "jsonp",
												jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
												jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
												success: function() {
													//setCookie('smartSid',data.sid);
												},
												error: function() {
													//alert("bbsfail");
												}
											});
										},
										error: function() {
											//alert("gmatfail");
										}
									});
								},
								error: function() {
									alert("smartfail");
								}
							});
						},
						error: function() {
							alert("toeflfail");
						}
					});

					setTimeout(function() {

						mui.openWindow({
							id: "index.html",
							url: "index.html",
							createNew:true
						})

					}, 2000);
				} else {
					alert(data.message);
				}
			},
			error: function() {
				alert('fail');
			}
		});

	}

}