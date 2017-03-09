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
	myApp.controller("PriceCtrl", ["$scope", "$http", "$sce", function($scope, $http, $sce) {
		$scope.toggle = {
			now: false
		};
		$scope.$watch('toggle.now', function() {
			if($scope.toggle.now) { //界面的angularjs循环的元素加载完毕

			}
		});
	}]);
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		var ids = self.ids;
		if(!ids) {
			ids = 53;
		}

		$.ajax({
			type: "get",
			url: "http://order.gmatonline.cn/pay/wap-api/order-details",
			dataType: "json",
			data: {
				orderId: ids
			},
			success: function(data) {
				var str1 = '',
					str2 = '',
					str3 = '';
				var stu = '';
				var btnStr = '';
				var orderTime = formatDate(data[0].createTime);
				if(data[0].status == 3) {
					stu = '已付款';
					btnStr = '';
				} else {
					stu = '等待买家付款';
					btnStr = '<button type="button" class="mui-btn mui-btn-warning orangeBg"' +
						'data-id="' + data[1].contentId + '" style="width: 100%;border-radius: 0;">立即付款</button>';
				}
				jQuery("nav").append(btnStr);
				str1 = '<ul>' +
					'<li>订单状态：' + stu + '</li>' +
					'<li>订单编号：' + data[0].orderNumber + '</li>' +
					'<li>创建时间：' + orderTime + '</li>' +
					'</ul>';
				jQuery(".order-status").append(str1);

				str2 = '<div class="mui-row">' +
					'<div class="mui-col-sm-4 mui-col-xs-4 l-img-cou">' +
					'<img src="http://smartapply.gmatonline.cn' + data[1].image + '"/>' +
					'</div>' +
					'<div class="mui-col-sm-7 mui-col-xs-7 center-font">' +
					'<h4>' + data[1].contentName + '</h4>' +
					'<p>主讲：' + data[1].contentTag + '</p>' +
					'<p>￥' + data[1].price + '</p>' +
					'</div>' +
					'<div class="mui-col-sm-1 mui-col-xs-1 right-num">' +
					'X' + data[1].num +
					'</div>' +
					'<div class="mui-clearfix"></div>' +
					'</div>' +
					'<div class="payBox">' +
					'<span>实付款（含运费）</span>' +
					'<span class="red">￥' + data[1].price + '</span>' +
					'</div>';
				jQuery(".course-details").append(str2);

				str3 = '<ul>' +
					'<li>' +
					'<img src="images/myimages/19@2x.png"/>' +
					'<span>收货人：' + data[2].name + '</span>' +
					'</li>' +
					'<li>' +
					'<img src="images/myimages/20@2x.png"/>' +
					'<span>联系电话：' + data[2].phone + '</span>' +
					'</li>' +
					'<li>' +
					'<img src="images/myimages/21@2x.png"/>' +
					'<span>收货地址：' + data[2].province + data[2].city +
					data[2].area + data[2].address + '</span>' +
					'</li>' +
					'</ul>';
				jQuery(".order-address").append(str3);
				//			立即付款
				if(jQuery("nav button")[0]) {
					jQuery("nav button")[0].addEventListener("tap", function() {
						var courseId = jQuery(this).attr("data-id");
						closeme();
						mui.openWindow({
							id: "sureOrder" + courseId,
							url: "sureOrder.html",
							extras: {
								ids: courseId
							}
						})
					});
				}

			},
			error: function() {
				alert('fail');
			}
		});

	});
});


