jQuery(function() {
	//声明模块
	var myApp = angular.module("myApp", []);
	//通过模块生成调用控制器
	myApp.controller("PriceCtrl", ["$scope", "$http", function($scope, $http) {

	}]);
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		var courseId = self.ids;
		var addressNum = self.addressNum;
		if(!courseId) {
			courseId = 53;
		}
		if(!addressNum) {
			addressNum = 0;
		}

		$.ajax({
			type: "post",
			url: "http://smartapply.gmatonline.cn/pay/wap-api/clear?id=" + courseId + "&userId=" + localStorage.getItem('s_userId'),
			dataType: "jsonp",
			jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
			jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
			success: function(data) {
				if(data.code == 1) {
					var shixiaq = '';
					if(data.message.consignee[0]) {
						if(addressNum && data.message.consignee.length > 1) { //选择收货地址
							$("#name_sh").html(data.message.consignee[addressNum].name).attr("data-id", data.message.consignee[addressNum].id);
							$("#phone").html(data.message.consignee[addressNum].phone);
							if(data.message.consignee[addressNum].area != "市辖区") {
								shixiaq = data.message.consignee[addressNum].area;
							} else {
								shixiaq = '';
							}
							$("#address_sh").html(data.message.consignee[addressNum].province +
								data.message.consignee[addressNum].city + shixiaq);
						} else {
							$("#name_sh").html(data.message.consignee[0].name).attr("data-id", data.message.consignee[0].id);
							$("#phone").html(data.message.consignee[0].phone);
							if(data.message.consignee[0].area != "市辖区") {
								shixiaq = data.message.consignee[0].area;
							} else {
								shixiaq = '';
							}
							$("#address_sh").html(data.message.consignee[0].province +
								data.message.consignee[0].city + shixiaq);
						}
					} else {
						$("#name_sh").html("未填写");
						$("#phone").html("未填写");
						$("#address_sh").html("未填写");
					}
					$("#courseName").html(data.message.goods[0].contentName);
					$("#num").html(data.message.goods[0].num);
					$("#totNum").html(data.message.goods[0].num);
					$("#unitCost").html(data.message.goods[0].price);
					$("#totalP").html(data.message.totalMoney);
					$("#totalPrice").html(data.message.totalMoney);
					//setCookie('totalMoney',data.message.totalMoney);
					//setCookie('totalDis',data.message.totalDis);
					//setCookie('adminStr',data.message.adminStr);
					//setCookie('goods',data.message.goods);
				} else {
			
					mui.openWindow({
						id: "login",
						url: "login.html"
					});
				}
				//  点击添加收货地址
				jQuery("#showAdd")[0].addEventListener("tap", function() {
					showAdd(addressNum, courseId);
				});
				//  立即支付
				jQuery("#payCome")[0].addEventListener("tap", function() {
					payComeOn(courseId);
				});
			},
			error: function() {
				alert('fail');
			}
		});
	});
});

function subtractNum(o) {
	var old = parseInt($("#totNum").html());
	if(old <= 1) {
		alert("亲，不能再减了哦！");
	} else {
		old--;
	}
	$("#num").html(old);
	$("#totNum").html(old);
	totalP();
}

function addNum(o) {
	var old = parseInt($("#totNum").html());
	old++;
	$("#num").html(old);
	$("#totNum").html(old);
	totalP();
}

function totalP() {
	var num = parseInt($("#totNum").html());
	var unitCost = parseInt($("#unitCost").html());
	$("#totalP").html(num * unitCost);
	$("#totalPrice").html(num * unitCost);
}

function payComeOn(courseId) {
	var consignee = $("#name_sh").attr("data-id");
	var num = $("#totNum").html();
	if(consignee) {
		$.ajax({
			type: "post",
			url: "http://smartapply.gmatonline.cn/pay/wap-api/sub-order?type=0&integral=0&payType=1&consignee=" + consignee + "&userId=" + localStorage.getItem('s_userId') +
				"&id=" + courseId + "&num=" + num,
			dataType: "jsonp",
			jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
			jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
			success: function(data) {
				if(data.code == 1) {
					location.href = "http://smartapply.gmatonline.cn/pay/order/pay?orderId=" + data.orderId + "&server=wap" +
						"&userId=" + localStorage.getItem('s_userId') + "&username=" + localStorage.getItem('userName');
				}
			},
			error: function() {
				alert("网络通讯失败");
			}
		});

	} else {
		alert("请将收货信息填写完整！");
		return false;
	}

}

//展示详细地址
function showAdd(addressNum, courseId) {
	var num = 0;
	if(addressNum) {
		num = addressNum;
	} else {
		num = 0;
	}

	mui.openWindow({
		id: "sureAddress",
		url: "sureAddress.html",
		extras: {
			courseId: courseId,
			addressNum: addressNum
		}
	})

}