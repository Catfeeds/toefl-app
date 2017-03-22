jQuery(function() {
	//    中间的绿色圆形
	jQuery(".centerData").css("height", $(".centerData").width() + "px");
	//	取消遮罩层
	jQuery("#quxiao")[0].addEventListener("tap", function() {
		mui('.mui-popover').popover('hide');
	});

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
			var ids = self.testId;
			var name = self.name;
			var title = self.title;
			var readName = self.readName;

			$http({
				method: 'post',
				url: 'http://www.toeflonline.cn/cn/wap-api/read-result',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					id: ids,
					userId: localStorage.getItem("userId")
				}
			}).success(function(data) {
				$scope.accuracy = data.answerType.accuracy;
				$scope.time = getTimeFromSeconds(data.answerType.time);
				$scope.trueT = data.answerType.true;
				$scope.sum = data.answerType.sum;
				$scope.titleName = name + "-" + title;
				$scope.pid = ids;
				$scope.readName = readName;
				
				//          查看详情
				jQuery("#seeDetail")[0].addEventListener("tap", function() {
					mui.openWindow({
						id: "reading-result-details",
						url: "reading-result-details.html",
						extras: {
							testId: ids,
							name: name,
							title: title
						}
					});
				});
				//	重新做题
				jQuery("#sureBtn")[0].addEventListener("tap", function() {
					reRead(ids, name, title,readName);
				});

			});
		});
	}]);

});

//重新做题
function reRead(id, nameTitle, title,readName) {
	$.ajax({
		type: "post",
		url: "http://www.toeflonline.cn/cn/wap-api/set-read?id=" + id + "&userId=" + localStorage.getItem('userId'),
		dataType: "jsonp",
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
		jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
		success: function(data) {
			if(data.code == 1) {

				mui.openWindow({
					id: "reading-practice-" + id,
					url: 'reading-practice.html',
					extras: {
						ids: id,
						name: nameTitle,
						title: title,
						readName:readName
					}
				});
			}
		},
		error: function() {
			alert('fail');
		}
	});
}