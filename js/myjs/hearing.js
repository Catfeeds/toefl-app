(function($) {
	$('#scroll').scroll({
		indicators: true //是否显示滚动条
	});

})(mui);

jQuery(function() {

	$(".mui-card-content ul li").css({
		"height": $(".mui-card-content ul li").width(),
		"lineHeight": $(".mui-card-content ul li").width() + "px"
	});

	$(".mui-content").css("height", $(document).height());

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
				jQuery(".mui-content").css("height", jQuery(document).height());

				//			==========tpo点击=================
				mui(".mui-card-content").on("tap", "li", function() {
					var tpoId = this.getAttribute('data-id');
					var tpoName = this.getAttribute('data-name');

					//打开详情页面            
					mui.openWindow({
						//			    id:'hearing-list.html',
						url: 'hearing-list.html',
						extras: {
							tpoId: tpoId,
							tpoName: tpoName
						}
					});
				});

				//	           =============分类点击===================

				mui(".mui-table-view").on("tap", ".mui-table-view-cell", function() {
					var tpoId = this.getAttribute('data-id');
					var tpoName = this.getAttribute('data-name');

					//打开详情页面            
					mui.openWindow({
						//			    id:'hearing-list.html',
						url: 'hearing-list.html',
						extras: {
							tpoId: tpoId,
							tpoName: tpoName
						}
					});
				});
			}
		});
		$http({
			method: 'post',
			url: 'http://www.toeflonline.cn/cn/app-api/listen-index',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {

			}
		}).success(function(data) {
			$scope.name = data;
		});

	}]);
	myApp.filter('splitKG', function() {
		return function(val) {
			return val.split(" ")[1];
		}
	});

});