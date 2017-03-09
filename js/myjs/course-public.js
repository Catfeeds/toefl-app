jQuery(function(){
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
             $scope.pubClass=data.pubClass;
             mui(".mui-table-view").on("tap", ".mui-table-view-cell", function() {
				var idT = jQuery(this).attr("data-id");
				mui.openWindow({
					id: "course-public-detail-"+idT,
					url: "course-public-detail.html",
					extras: {
						ids: idT
					}
				})
			});

		});
	}]);
});
