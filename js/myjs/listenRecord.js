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
	myApp.filter('timeNYR', function() {
		return function(input) {
			return $.trim(input).split(" ")[0];
		}
	});
	myApp.filter('timeSFM', function() {
		return function(input) {
			return $.trim(input).split(" ")[1];
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
		var userId = localStorage.getItem("userId");
		//做题
		$http({
			method: 'post',
			url: 'http://www.toeflonline.cn/cn/wap-api/listen-record',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {
				userId: userId
			}
		}).success(function(data) {
			$scope.records = data.record;
		});
		//精听
		$http({
			method: 'post',
			url: 'http://www.toeflonline.cn/cn/wap-api/dictation-page',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {
				userId: userId
			}
		}).success(function(data) {
			$scope.recordsTX = data.record;
		});
		//听写
		$http({
			method: 'post',
			url: 'http://www.toeflonline.cn/cn/wap-api/listening-page',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {
				userId: userId
			}
		}).success(function(data) {
			$scope.recordsJT = data.data;
		});

		mui("#item1").on("tap", ".mui-btn-warning", function() {
			practice(this);
		});
		mui("#item1").on("tap", ".mui-btn-success", function() {
			practice(this);
		});
		mui("#item2").on("tap", "button", function() {
			listeningAgain(this);
		});
		mui("#item3").on("tap", "button", function() {
			dictationAgain(this);
		});

	}]);
});
/**
 * 重新继续做题
 * @param _this
 */
function practice(_this) {
	var id = $(_this).attr('data-valus');
	closeme();
	mui.openWindow({
		id: "hearing-practice",
		url: 'hearing-practice.html',
		extras: {
			articleId: id
		}
	});
}
/**
 * 继续听写
 * @param _this
 */
function dictationAgain(_this) {
	var id = $(_this).attr('data-valus');
	var names = $(_this).attr('data-name');
	var titles = $(_this).attr('data-titles');
	closeme();
	mui.openWindow({
		url: 'hearing-quietly.html',
		extras: {
			catName: names,
			title: titles,
			articleId: id,
			listenWrite: true
		}
	});
	//  window.location.href="listen_quietly.html?artId="+id+"&catname="+names+"&title="+titles+"&listenWrite=true";
}
/**
 * 重新精听
 * @param _this
 */
function listeningAgain(_this) {
	var id = $(_this).attr('data-valus');
	var names = $(_this).attr('data-name');
	var titles = $(_this).attr('data-titles');
		closeme();
	mui.openWindow({
		url: 'hearing-quietly.html',
		extras: {
			catName: names,
			title: titles,
			articleId: id
		}
	});
//	window.location.href = "listen_quietly.html?artId=" + id + "&catname=" + names + "&title=" + titles;
}