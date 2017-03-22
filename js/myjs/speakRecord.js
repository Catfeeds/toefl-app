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
				conPlay();
			}
		});
		mui.plusReady(function() {
			var self = plus.webview.currentWebview();
			var type = self.type;
				if(type == 1) {
					$("#segmentedControl a").first().addClass("mui-active").siblings().removeClass("mui-active");
				} else if(type == 2) {		
					$("#segmentedControl a:nth-child(2)").addClass("mui-active").siblings().removeClass("mui-active");
				} else if(type == 3) {
					$("#segmentedControl a:nth-child(3)").addClass("mui-active").siblings().removeClass("mui-active");
				} else if(type == 4) {
					$("#segmentedControl a:nth-child(4)").addClass("mui-active").siblings().removeClass("mui-active");
				} else if(type == 5) {
					$("#segmentedControl a:nth-child(5)").addClass("mui-active").siblings().removeClass("mui-active");
				} else if(type == 6) {
					$("#segmentedControl a:nth-child(6)").addClass("mui-active").siblings().removeClass("mui-active");
				} else if(type == 7) {
					$("#segmentedControl a:nth-child(7)").addClass("mui-active").siblings().removeClass("mui-active");
				}
			$http({
				method: 'post',
				url: 'http://www.toeflonline.cn/cn/wap-api/spoken-page',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					userId: localStorage.getItem("userId"),
					type: type, //类型1/2/3/4/5/6/7黄金口语
					page: 1, //页数、第几页
					pageSize: 1000 //分页显示条数
				}
			}).success(function(data) {
				if(data.data[0]) {
					$scope.data = data.data;
					$scope.totalNum = parseInt(Math.ceil(data.count / 5));
				}
			
			});
		});

	}]);
	mui("#segmentedControl").on("tap", "a", function() {
		var type = jQuery(this).attr("data-type");	
		mui.openWindow({
			id: "speakRecord-" + type,
			url: "speakRecord.html",
			extras: {
				type: type
			}
		});
	
	});

});

function conPlay() {
	jQuery(".mui-table-view li").each(function() {
		var num = jQuery(this).index();
		jQuery("#jquery_jplayer_" + num).jPlayer({
			ready: function(event) {
				$(this).jPlayer("setMedia", {
					mp3: jQuery("#jquery_jplayer_" + num).attr("data-tsrc"),
					wav: jQuery("#jquery_jplayer_" + num).attr("data-tsrc"),
					ogg: jQuery("#jquery_jplayer_" + num).attr("data-tsrc")
				});
			},
			swfPath: "../../js",
			supplied: "m4a, oga,mp3,wav",
			wmode: "window",
			useStateClassSkin: true,
			cssSelectorAncestor: "#jp_container_" + num,
			toggleDuration: true,
			play: function() {
				jQuery(this).jPlayer("pauseOthers"); // pause all players except this one.
			}
		});

	});

}