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
				mui(".choose-all").on("tap", "span", function() {
					chooseTeacher(this);
				});
			}
		});
		mui.plusReady(function() {
			var self = plus.webview.currentWebview();
			var ids = self.ids;
			if(!ids) {
				ids = 53;
			}
			$http({
				method: 'post',
				url: 'http://www.toeflonline.cn/cn/wap-api/course-details',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					id: ids
				}
			}).success(function(data) {
				$scope.name = data.data.name;
				$scope.viewCount = data.data.viewCount;
				$scope.image = data.data.image;
				$scope.price = data.data.price;
				$scope.originalPrice = data.data.originalPrice;
				$scope.tag = data.tag;
				$scope.duration = data.data.duration;
				$scope.numbering = data.data.numbering;
				$scope.description = $sce.trustAsHtml(data.data.description);
				$scope.courseId = data.data.id;
				$scope.pid = data.pid;
				//				立即购买

				jQuery("#comeBuy")[0].addEventListener("tap", function() {
					var userId = localStorage.getItem("userId");
					if(userId) {
//						closeme();
						mui.openWindow({
							id: "sureOrder" + $scope.courseId,
							url: "sureOrder.html",
							extras: {
								ids: $scope.courseId
							}
						})
					} else {
						closeme();
						mui.openWindow({
							id: "login",
							url: "login.html"
						})
					}

				});

			});
		});
	}]);
});

function chooseTeacher(o) {

	var pid = $("#pid").val();
	var tagStr = '';
	$(o).addClass("on").siblings().removeClass("on");
	if($(o).hasClass("on")) {
		tagStr += $(o).attr("data-myId");
	}

	$.ajax({
		type: "post",
		url: "http://www.toeflonline.cn/cn/wap-api/change-class?tagStr=" + tagStr + "&pid=" + pid,
		dataType: "jsonp",
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
		jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
		success: function(data) {
			if(data.id) {
				closeme();
				mui.openWindow({
					id: "course-live-detail-" + data.id,
					url: "course-live-detail.html",
					extras: {
						ids: data.id
					}
				})
			}
		},
		error: function() {
			alert('fail');
		}
	});
}