jQuery(function() {
	jQuery(".tea-img").css("height", jQuery(".tea-img").width() + 10);
	//				关闭弹窗
	jQuery("#close-img")[0].addEventListener("tap", function() {
		mui('#popover').popover('hide');
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
			$http({
				method: 'post',
				url: 'http://www.toeflonline.cn/cn/wap-api/details',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					id: ids
				}
			}).success(function(data) {
				$scope.image = data.data.image;
				$scope.performance = data.data.performance.split("\r");
				$scope.description = delHtmlTag(data.data.description);
				$scope.name = data.data.name;
				$scope.speak = data.data.speak.split("\n");
				jQuery("#sureTiJiao")[0].addEventListener("tap", function() {
					yuyueClass(ids);
				});
			});
		});
	}]);
});

function delHtmlTag(str) {
	return str.replace(/<[^>]+>/g, ""); //去掉所有的html标记
}
//预约课程
function yuyueClass(ids) {
	var name = jQuery("#stuName").val();
	var phone = jQuery("#stuPhone").val();
	var reg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
	if(!name || !phone) {
		alert("请将信息填写完整!");
	} else if(!reg.test(phone)) {
		alert("手机号码格式不正确！");
		return false;
	} else {
		$.ajax({
			type: "post",
			url: "http://smartapply.gmatonline.cn/cn/api/add-content",
			async: true,
			data: {
				catId: "236", // 236 是定死的
				name: name, // 学生姓名
				extend: [ids, phone] // 这个传一个数组, 第一个 item 放要约课的老师的 id, 第二个 item 放学生的电话

			},
			success: function(data) {
				alert("预约成功！");
				mui('#popover').popover('hide');
			},
			error: function() {
				alert("fail");
			}
		});
	}

}