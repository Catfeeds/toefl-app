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
		//课程+老师
		$http({
			method: 'post',
			url: 'http://www.toeflonline.cn/cn/wap-api/index',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).success(function(data) {
			$scope.teacher = data.teacher;
			//			预约点击
			mui(".mui-table-view").on("tap", ".subscribe", function() {
				var ids = jQuery(this).attr("data-ids");
				mui('#popover').popover('show');
				jQuery('#popover').attr("data-ids", ids);
			});
			//			  详情点击
			mui(".mui-table-view").on("tap", "a", function() {
				var ids = jQuery(this).attr("data-ids");				
				mui.openWindow({
					id: "course-class-detail" + ids,
					url: "course-class-detail.html",
					extras: {
						ids: ids
					}
				});
			});
			//			确认提交
			jQuery("#sureTiJiao")[0].addEventListener("tap", function() {
				var ids = jQuery('#popover').attr("data-ids");
				yuyueClass(ids);
			});
			//				关闭弹窗
			jQuery("#close-img")[0].addEventListener("tap", function() {
				mui('#popover').popover('hide');
			});

		});

	}]);

});
//预约课程
function yuyueClass(idT) {
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
				extend: [idT, phone] // 这个传一个数组, 第一个 item 放要约课的老师的 id, 第二个 item 放学生的电话

			},
			success: function(data) {
				alert("预约成功！");
				mui('#popover').popover('hide');
				jQuery("#stuName").val("");
				jQuery("#stuPhone").val("");
			},
			error: function() {
				alert("fail");
			}
		});
	}

}