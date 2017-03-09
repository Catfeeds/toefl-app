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
			var pages = self.pages;
			if(!pages) {
				pages = 1;
			}
			touchS(pages);
			$http({
				method: 'post',
				url: 'http://www.toeflonline.cn/cn/wap-api/write',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					category: '151,152,153,154,155,156',
					page: pages
				}
			}).success(function(data) {

				$scope.goldData = data.goldData;
				//          $scope.categoryT=category;
				//          $scope.pageT=page;
				for(var i = 0; i < $scope.goldData.length; i++) {
					var nobeforeKG=$.trim($scope.goldData[i].name);
					$scope.goldData[i].goldNum = nobeforeKG.split(" ")[0].split(".")[1];
				}
				//				头部 Li的点击事件
				mui(".slideBd").on("tap", "li", function() {
					var page = jQuery(this).find("a").attr("data-page");
					//					closeme();
					mui.openWindow({
						id: "writing-independent-" + page,
						url: "writing-independent.html",
						extras: {
							pages: page
						}
					});

				});
				//				点击到做题页
				mui(".mui-table-view").on("tap", ".mui-table-view-cell", function() {
					var idT = jQuery(this).attr("id");
					mui.openWindow({
						id: "writing-practice",
						url: "writing-practice.html",
						extras: {
							ids: idT
						}
					})
				});
			});
		});
	}]);

	myApp.filter('beforeNum', function() {
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

function touchS(page) {
	var num_dl = 0;
	if(page == 1) {
		$("#in_ul01 li").first().addClass("on").siblings("li").removeClass("on");
	} else if(page == 2) {
		$("#in_ul01 li").eq(1).addClass("on").siblings("li").removeClass("on");
	} else if(page == 3) {
		$("#in_ul01 li").eq(2).addClass("on").siblings("li").removeClass("on");
	} else if(page == 4) {
		$("#in_ul01 li").eq(3).addClass("on").siblings("li").removeClass("on");
	} else if(page == 5) {
		num_dl = 1;
		$("#in_ul02 li").first().addClass("on").siblings("li").removeClass("on").parent().siblings("ul").find("li").removeClass("on");
	} else if(page == 6) {
		num_dl = 1;
		$("#in_ul02 li").eq(1).addClass("on").siblings("li").removeClass("on").parent().siblings("ul").find("li").removeClass("on");
	} else if(page == 7) {
		num_dl = 1;
		$("#in_ul02 li").eq(2).addClass("on").siblings("li").removeClass("on").parent().siblings("ul").find("li").removeClass("on");
	} else if(page == 8) {
		num_dl = 1;
		$("#in_ul02 li").eq(3).addClass("on").siblings("li").removeClass("on").parent().siblings("ul").find("li").removeClass("on");
	} else if(page == 9) {
		num_dl = 2;
		$("#in_ul03 li").first().addClass("on").siblings("li").removeClass("on").parent().siblings("ul").find("li").removeClass("on");
	} else if(page == 10) {
		num_dl = 2;
		$("#in_ul03 li").eq(1).addClass("on").siblings("li").removeClass("on").parent().siblings("ul").find("li").removeClass("on");
	}
	//    独立话题185
	TouchSlide({
		slideCell: "#slidePop",
		effect: "leftLoop",
		defaultIndex: num_dl
	});
}