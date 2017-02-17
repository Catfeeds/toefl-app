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
//		mui.plusReady(function() {
//			var self = plus.webview.currentWebview();
//			var tpoId = self.tpoId;
//			var tpoName = self.tpoName;
        var userId=localStorage.getItem("userId");
			$http({
				method: 'post',
				url: 'http://www.toeflonline.cn/cn/app-api/change-heard',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					page: 1,
					catId: 39,
					userId:94
				}
			}).success(function(data) {
				$scope.content = data.content;
					mui(".mui-table-view").on("tap",".mui-table-view-cell",function(){
						var catN=jQuery(this).attr("data-catName");
						var title=jQuery(this).attr("data-title");
					mui.openWindow({
						url:"hearing-way.html",
						extras: {
							catName: catN,
							title:title
						}
					})
				});
				if(tpoName) {
					$scope.tpoName = tpoName;
				}
			
				
				
			});
//		});

	}]);

});