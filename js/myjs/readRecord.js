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
	myApp.filter('timeNYR', function() {
		return function(input) {
			return $.trim(input).split(" ")[0];
		}
	});
	myApp.filter('timeSFM', function() {
		return function(input) {
			return $.trim(input).split(" ")[1];
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
			$http({
				method: 'post',
				url: 'http://www.toeflonline.cn/cn/wap-api/read-page',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					userId: localStorage.getItem("userId"),
					type: type,
					page: 1,
					pageSize: 1000
				}
			}).success(function(data) {
				$scope.data = data.data;
				//			$scope.totalNum = parseInt(Math.ceil(data.count / 5));
				if(type == 1) {
					$("#segmentedControl a").first().addClass("mui-active").siblings().removeClass("mui-active");
				} else if(type == 2) {
					$("#segmentedControl a:nth-child(3)").addClass("mui-active").siblings().removeClass("mui-active");
				} else if(type == 3) {
					$("#segmentedControl a:nth-child(2)").addClass("mui-active").siblings().removeClass("mui-active");
				}
			});
		});
	}]);
	mui("#segmentedControl").on("tap", "a", function() {
		var type = jQuery(this).attr("data-type");
//			closeme();
		mui.openWindow({
			id: "readRecord-" + type,
			url: "readRecord.html",
			extras: {
				type: type
			}
		});
	});
	//  查看结果
	mui(".mui-content").on("tap", ".mui-table-view-cell .mui-btn-success", function() {
		var id = jQuery(this).attr("data-id");
		var name = jQuery(this).attr("data-name");
		var title = jQuery(this).attr("data-title");
		var belong = jQuery(this).attr("data-belong");
		closeme();
		mui.openWindow({
			id: "reading-result-title",
			url: "reading-result.html",
			extras: {
				testId: id,
				name: name,
				title: title,
				readName: belong
			}
		});
	});
	//  继续练习
	mui(".mui-content").on("tap", ".mui-table-view-cell .mui-btn-warning", function() {
		var id = jQuery(this).attr("data-id");
		var name = jQuery(this).attr("data-name");
		var title = jQuery(this).attr("data-title");
		closeme();
		mui.openWindow({
			id: "reading-practice-" + id,
			url: "reading-practice.html",
			extras: {
				ids: id,
				name: name,
				title: title
			}
		});
	});

});