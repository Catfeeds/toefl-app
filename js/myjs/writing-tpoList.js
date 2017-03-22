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
				if(ifStr) {
					var top = $("#independent")[0].offsetTop;
					$("html,body").animate({
						scrollTop: top + "px"
					}, 500);
				}
			}
		});
		mui.plusReady(function() {
			var self = plus.webview.currentWebview();
			var ids = self.ids;
			if(!ids) {
				ids = '151,152,153,154,155,156';
			}
			touchS(ids);
			$http({
				method: 'post',
				url: 'http://www.toeflonline.cn/cn/wap-api/write',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					category: ids,
					page: 1
				}
			}).success(function(data) {
				$scope.tpoData = data.tpoData;
				//          $scope.categoryT=category;
				//          $scope.pageT=page;

				//				tpo Li的点击事件
				mui(".slideBd").on("tap", "li", function() {
					var idD = jQuery(this).attr("data-ids");

					mui.openWindow({
						id: "writing-tpoList-" + idD,
						url: "writing-tpoList.html",
						extras: {
							ids: idD
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

});

function touchS(category) {
	var num = 0;
	if(category == '151,152,153,154,155,156') {
		$("#first_ul li").first().addClass("on").siblings("li").removeClass("on");
		num = 0;
	} else if(category == '157,158,159,160,161,162') {
		$("#first_ul li").eq(1).addClass("on").siblings("li").removeClass("on");
		num = 0;
	} else if(category == '163,164,165,166,167,168') {
		$("#first_ul li").eq(2).addClass("on").siblings("li").removeClass("on");
		num = 0;
	} else if(category == '169,170,171,172,173,174') {
		$("#second_ul li").eq(0).addClass("on").siblings("li").removeClass("on");
		num = 1;
	} else if(category == '175,176,177,178,179,180') {
		$("#second_ul li").eq(1).addClass("on").siblings("li").removeClass("on").parent().siblings("ul").find("li").removeClass("on");

		num = 1;
	} else if(category == '181,182,183,184') {
		$("#second_ul li").eq(2).addClass("on").siblings("li").removeClass("on").parent().siblings("ul").find("li").removeClass("on");

		num = 1;
	} else if(category == '252,253,254,255,256,259') {
		$("#third_ul li").eq(0).addClass("on").siblings("li").removeClass("on").parent().siblings("ul").find("li").removeClass("on");

		num = 2;
	} else if(category == '260,261,262') {
		$("#third_ul li").eq(1).addClass("on").siblings("li").removeClass("on").parent().siblings("ul").find("li").removeClass("on");

		num = 2;
	}
	//    标题tpo01
	TouchSlide({
		slideCell: "#slidePop",
		effect: "leftLoop",
		defaultIndex: num
	});
}