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
		$scope.useranswer = $("#user_answer").val();
		$scope.trueanswer = 'A';
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
			if(!ids) {
				ids = 13061;
			}
			$http({
				method: 'post',
				url: 'http://www.toeflonline.cn/cn/wap-api/write-details',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					id: ids
				}
			}).success(function(data) {				
				$scope.title = data.data.title;
				$scope.conId = data.data.id;
				countTime();
				jQuery("#sub")[0].addEventListener("tap", function() {
					subCon();
				});

			});
		});

	}]);

});

//提交
function subCon() {
	var html = jQuery("textarea").val();
	if(html) {
		var contentId = $("#contentId").val();
		var answer = html;
		var belong = '';
		var time = $("#time").val();
		if($("#title").val() == 'independent') {
			belong = 'writingIndependent';
		} else {
			belong = 'writingTpo';
		}
		$.ajax({
			type: "post",
			url: "http://www.toeflonline.cn/cn/wap-api/save-writing?contentId=" + contentId + "&answer=" + answer + "&belong="
			+ belong + "&time=" + time + "&userId=" + localStorage.getItem('userId'),
			dataType: "jsonp",
			jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
			jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
			success: function(data) {			
				if(data.code == 1) {
					var recordId = data.recordId;					
					mui.openWindow({
						id: "writing-result",
						url: "writing-result.html",
						extras: {
							ids: recordId
						}
					});

				}
			},
			error: function() {
				alert('fail');
			}
		});

	} else {
		alert("请输入你的答案！");
	}
}
//每道题做题时间
function countTime() {
	var time = parseInt($("#time").val());
	setInterval(function() {
		time++;
		$("#time").val(time);
	}, 1000);
}