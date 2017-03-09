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
			var tpoId = self.tpoId;
			var tpoName = self.tpoName;
			var userId = localStorage.getItem("userId");
			if(userId) {
				$http({
					method: 'post',
					url: 'http://www.toeflonline.cn/cn/app-api/change-heard',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: {
						page: 1,
						catId: tpoId,
						userId: userId
					}
				}).success(function(data) {
					$scope.content = data.content;
					mui(".mui-table-view").on("tap", ".mui-table-view-cell", function() {
						var catN = jQuery(this).attr("data-catName");
						var title = jQuery(this).attr("data-title");
						var articleId = jQuery(this).attr("data-articleId");
//						closeme();
						mui.openWindow({
							url: "hearing-way.html",
							extras: {
								catName: catN,
								title: title,
								articleId: articleId
							}
						})
					});
					if(tpoName) {
						$scope.tpoName = tpoName;
					}

				});
			} else {
				closeme();
				mui.openWindow({
					id: "login",
					url: "login.html",

				})
			}

		});

	}]);
	//	计算正确率
	myApp.filter('percentage', function() {
		return function(arr) {
			var num = 0;
			for(var i = 0; i < arr.length; i++) {
				if(arr[i]['answer'] == arr[i]['trueAnswer']) {
					num++;
				}
			}
			return(num / 5) * 100 + "%";
		}
	});
	//  计算耗时
	myApp.filter('times', function() {
		return function(arr) {
			var totalTime = 0;
			var timeLast = 0;
			for(var i = 0; i < arr.length; i++) {
				if(arr[i]['elapsedTime']) {
					totalTime += parseFloat(arr[i]['elapsedTime']);
				}
			}
			if(time_To_hhmmss(totalTime)) {
				timeLast = time_To_hhmmss(totalTime);
			} else {
				timeLast = 0 + "s";
			}
			return timeLast;
		}
	});

});