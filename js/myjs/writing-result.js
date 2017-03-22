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
		mui.plusReady(function() {
			var self = plus.webview.currentWebview();
			var recordId = self.ids;
			$http({
				method: 'post',
				url: 'http://www.toeflonline.cn/cn/wap-api/write-result',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					id: recordId,
					userId: localStorage.getItem("userId")
				}
			}).success(function(data) {
				$scope.num = data.data.num;
				$scope.catName = data.data.data.catName;
				$scope.name = data.data.data.name;
				$scope.answer = data.data.nowResult.answer;
				$scope.id = data.data.data.id;
				$scope.elapsedTime = data.data.nowResult.elapsedTime;
				mui.plusReady(function() {
					plus.webview.getWebviewById('writing-test').close();
				})

				//    圆高度
				jQuery(".border_center").css("height", $(".border_center").width());
				jQuery(".centerData").css("height", $(".centerData").width());
				//				弹窗取消
				jQuery("#quxiao")[0].addEventListener("tap", function() {
					mui('.mui-popover').popover('hide');
				});
				//				弹窗确定
				jQuery("#sureBtn")[0].addEventListener("tap", function() {
					mui.openWindow({
						id: "writing-practice",
						url: "writing-practice.html",
						extras: {
							ids: recordId
						}
					})
				});
				jQuery("#seeDetail-w")[0].addEventListener("tap", function() {
					seeDetails(recordId);
				});
			});
		});
	}]);

});
//查看详情
function seeDetails(recordId) {
	mui.openWindow({
		id: "writing-result-details",
		url: "writing-result-details.html",
		extras: {
			ids: recordId
		}
	})
}