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
				$scope.catName = data.data.data.catName;
				$scope.name = data.data.data.name;
				$scope.answer = data.data.nowResult.answer;		
			
			});
		});
	}]);

});
