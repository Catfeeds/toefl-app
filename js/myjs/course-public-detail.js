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
		mui.plusReady(function() {
			var self = plus.webview.currentWebview();
			var ids = self.ids;
			if(!ids) {
				ids = 2128;
			}
			$http({
				method: 'post',
				url: 'http://smartapply.gmatonline.cn/cn/public-class/app-details',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					id: ids
				}
			}).success(function(data) {

				$http({
					method: 'post',
					url: 'http://smartapply.gmatonline.cn/cn/public-class/app-details',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: {
						id: data.id
					}
				}).success(function(data) {
					$scope.name = data.data.name;
					$scope.listeningFile = data.parent.listeningFile;
					$scope.alternatives = data.parent.alternatives;
				});

			});
		});
	}]);
});