jQuery(function() {

	//地址插件
	new PCAS("province", "city", "area");
	//$("#province option:selected").val()
	//声明模块
	var myApp = angular.module("myApp", []);
	//通过模块生成调用控制器
	myApp.controller("PriceCtrl", ["$scope", "$http", function($scope, $http) {

	}]);
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		var courseId = self.courseId;
		var addressNum = self.addressNum;
		var ids = self.ids;
		var name_qf = self.name_qf;
		//编辑地址函数里面传的num
		var num = self.num;
		if(name_qf == 'add') {
			$("#title_name").html("添加收货地址");
		} else {
			$("#title_name").html("修改收货地址");
		}
		$.ajax({
			type: "post",
			url: "http://smartapply.gmatonline.cn/pay/wap-api/clear?id=" + courseId + "&userId=" + localStorage.getItem('s_userId'),
			dataType: "jsonp",
			jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
			jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
			success: function(data) {
				if(data.code == 1) {
					if(data.message.consignee[0]) {
						if(num || num == 0) {
							$("#userS").val(data.message.consignee[num].province);
							$("#userC").val(data.message.consignee[num].city);
							$("#userQ").val(data.message.consignee[num].area);
							$("#name").val(data.message.consignee[num].name);
							$("#details_address").val(data.message.consignee[num].address);
							$("#phone").val(data.message.consignee[num].phone);
							$("#alias").val(data.message.consignee[num].alias);
						}
					} else {

					}
					jQuery("#saveAddress")[0].addEventListener("tap", function() {
						saveAddress(ids);
					});
				} else {
//					closeme();
					mui.openWindow({
						id: "login",
						url: "login.html"
					});
				}
			},
			error: function() {
				alert('fail');
			}
		});
	});
});

//下拉赋值
function assignmentVal(o) {
	var val = $(o).find("a").html();
	$(o).parent().siblings("button").find(".bei_val").html(val);
}
//保存收货信息
function saveAddress(idT) {
	var province = $("#province option:selected").val();
	var city = $("#city option:selected").val();
	var area = $("#area option:selected").val();
	var name = $("#name").val();
	var details_address = $("#details_address").val();
	var phone = $("#phone").val();
	var alias = $("#alias").val();
	var reg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
	if(province != '--省份--' && province) {

	} else {
		province = $("#userS").val();
		city = $("#userC").val();
		area = $("#userQ").val();
	}
	if(name && details_address && phone && province && city && area) {
		if(!reg.test(phone)) {
			alert("手机号码格式不正确！");
		} else {
			var str = '';
			if(idT) {
				str = "&id=" + idT;
			} else {
				str = '';
			}
			$.ajax({
				type: "post",
				url: "http://smartapply.gmatonline.cn/pay/wap-api/save-consignee?name=" + name + "&address=" + details_address +
					"&phone=" + phone + "&province=" + province + "&city=" + city + "&area=" + area + "&alias=" + alias + str + "&userId=" + localStorage.getItem('s_userId'),
				dataType: "jsonp",
				jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
				jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
				success: function(data) {
					if(data.code == 1) {　　　　　
//						closeme();
						mui.openWindow({
							id: "sureAddress",
							url: "sureAddress.html",
							extras: {
								courseId: idT,
								addressNum: 1
							}
						})

					} else {
						//未修改就会保存失败
						alert(data.message);
					}
				},
				error: function() {
					alert('fail');
				}
			});
		}
	} else {
		alert("*号为必填项哦!");
	}

}