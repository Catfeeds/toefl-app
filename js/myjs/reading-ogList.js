jQuery(function() {
//	jQuery(".mui-media-object").css({
//		"height": jQuery(".mui-media-object").width(),
//		"lineHeight": jQuery(".mui-media-object").width() + "px"
//	});

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
			url: 'http://www.toeflonline.cn/cn/wap-api/read',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {
				id: 11361
			}
		}).success(function(data) {
			$scope.questionOg = data.OG[0].question;

			//添加列表项的点击事件
			mui('.mui-table-view').on('tap', '.mui-table-view-cell', function(e) {
				var id = this.getAttribute('id');
				var nameTitle = this.getAttribute('data-title');
				var num = this.getAttribute('data-num');
//				closeme();
				mui.openWindow({
					id: "reading-practice" + id,
					url: 'reading-practice.html',
					extras: {
						ids: id,
						name: nameTitle,
						title: num
					}
				});

			});

		});

	}]);
	myApp.filter('numW', function() {
		return function(num) {
			var str = 0;
			if(num < 10) {
				str = "0" + num;
			} else {
				str = num;
			}
			return str;
		}
	});

});