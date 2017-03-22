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
			var type = self.type;
			var str = '',
				str02 = '';
			if(type == 2) {
				str = '综合写作';
				str02 = 'Integrated Writing Task';
				$("#segmentedControl a#type02").addClass("mui-active").siblings().removeClass("mui-active");
			} else if(type == 3) {
				str = '独立写作';
				str02 = 'Independent Writing Task';
				$("#segmentedControl a#type03").addClass("mui-active").siblings().removeClass("mui-active");
			}
			$http({
				method: 'post',
				url: 'http://www.toeflonline.cn/cn/wap-api/writing',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					userId: localStorage.getItem("userId"),
					type: type,
					page: 1, //页数、第几页
					pageSize: 1000 //分页显示条数
				}
			}).success(function(data) {
				$scope.data = data.data;
				$scope.totalNum = parseInt(Math.ceil(data.count / 5));
				$scope.diffName = str;
				$scope.diffName02 = str02;
			});
		});
	}]);
	myApp.filter('timeOne', function() {
		return function(time) {
			return $.trim(time).split(" ")[1];
		}
	});
	myApp.filter('timeTwo', function() {
		return function(time) {
			return $.trim(time).split(" ")[0];
		}
	});
	mui("#segmentedControl").on("tap", "a", function() {
		var type = jQuery(this).attr("data-type");
		mui.openWindow({
			id: "writeRecord-" + type,
			url: "writeRecord.html",
			extras: {
				type: type
			}
		});
	
	});
	mui(".mui-content").on("tap", ".mui-btn-warning", function() {
		var recordId = jQuery(this).attr("data-recordId");
	
		mui.openWindow({
			id: "writing-result-" + recordId,
			url: "writing-result.html",
			extras: {
				ids: recordId
			}
		});
	});

});