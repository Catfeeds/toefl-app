jQuery(function() {

	//声明模块
	var myApp = angular.module("myApp", []);
	myApp.directive('isOver', function() {
		return {
			restrict: 'A',
			scope: {
				over: '=isOver'
			},
			link: function(scope, elm, attr) {
				if(scope.$parent.$last) {
					scope.over = true;
				}
			}
		}
	});
	//通过模块生成调用控制器
	myApp.controller("PriceCtrl", ["$scope", "$http", function($scope, $http) {
		$scope.toggle = {
			now: false
		};
		$scope.$watch('toggle.now', function() {
			if($scope.toggle.now) { //界面的angularjs循环的元素加载完毕

			}
		});
	}]);
	
	mui("#segmentedControl").on("tap", "a", function() {
		var status = jQuery(this).attr("data-status");

		mui.openWindow({
			id: "myCourse" + status,
			url: "myCourse.html",
			extras: {
				status: status
			}
		});

	});
	orderLoad();
	jQuery("#load")[0].addEventListener("tap",function(){
		count++;
		orderLoad();
	});

});
var count=1;
function orderLoad(){
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		var status = self.status;
		if(status == 3) {
			$("#segmentedControl a#course1").addClass("mui-active").siblings().removeClass("mui-active");
		} else if(status == 1) {
			$("#segmentedControl a#course2").addClass("mui-active").siblings().removeClass("mui-active");
		}
		$.ajax({
			type: "get",
			url: 'http://order.gmatonline.cn/pay/wap-api/get-list',

			dataType: "json",
			//		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
			//		jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函啊啊数名称，默认为jQuery自动生成的随机函数名
			data: {
				uid:localStorage.getItem("uid"),
				type: 2,
				page: count, //页数、第几页
				status: status //付款状态
			},
			success: function(data) {
                if(data.code==0){
                	jQuery("#load").hide();
                }
				var str = '',
					statusStr = '';
				if(data.data) {
					for(var i = 0; i < data.data.length; i++) {
						if(data.data[i].status == 3) {
							statusStr = '';
						} else {
							statusStr = '<div class="mui-col-xs-6 mui-col-sm-6"><button type="button" class="mui-btn mui-btn-warning mui-btn-outlined orangeBorder">取消订单</button></div>'
							+'<div class="mui-col-xs-6 mui-col-sm-6"><button type="button" class="mui-btn mui-btn-warning orangeBg">立即支付</button></div>'+
							'<div class="mui-clearfix"></div>';
						}
						str = '<div class="mui-row" data-id="' + data.data[i].orderId + '">' +
							'<div class="mui-col-sm-4 mui-col-xs-4">' +
							'<img src="http://smartapply.gmatonline.cn' + data.data[i].image + '" />' +
							'</div>' +
							'<div class="mui-col-sm-8 mui-col-xs-8">' +
							'<h4>' + data.data[i].contentName + '</h4>' +
							'<p>购买数量：' + data.data[i].num + '实付 <span class="orangeColor">￥' + data.data[i].price + '</span></p>' + statusStr +
							'</div>' +
							'<div class="mui-clearfix"></div>' +
							'</div>';
					}
					jQuery("#item1").append(str);
					//			跳转到订单详情
					mui(".mui-control-content").on("tap", ".mui-row", function() {
						var orderId = jQuery(this).attr("data-id");
						mui.openWindow({
							id: "myCourse-details",
							url: "myCourse-details.html",
							extras: {
								ids: orderId
							}
						})
					});

				}

			}
		});
	});
}
