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

		$http({
			method: 'post',
			url: 'http://www.toeflonline.cn/cn/app-api/class-index',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {

			}
		}).success(function(data) {
			$scope.list = data.list;
			$scope.firstImg = data.list[0].image;
			$scope.firstName = data.list[0].name;
			$scope.firstId = data.list[0].id;
			mui(".mui-content").on("tap", ".course-li", function() {
				var idT = jQuery(this).attr("data-id");
				mui.openWindow({
					id: "course-live-detail",
					url: "course-live-detail.html",
					extras: {
						ids: idT
					}
				})
			});
			
		});
	}]);

});