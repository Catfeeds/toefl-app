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

			}
		});
		mui.plusReady(function() {
			var self = plus.webview.currentWebview();
			var articleId = self.articleId;
		
		$http({
			method: 'post',
			url: 'http://www.toeflonline.cn/cn/wap-api/listen-question',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {
				id: articleId,
				userId: localStorage.getItem("userId")
			}
		}).success(function(data) {
			$scope.titleBig = data.article.catName + "-" + data.article.title;
			$scope.name = data.article.name;
			$scope.fileSrc = data.article.file;
	
			//				插件播放
			var myCirclePlayer = new CirclePlayer("#jquery_jplayer_1", {
				mp3: "http://www.toeflonline.cn" + $scope.fileSrc,
				m4a: "",
				oga: ""
			}, {
				cssSelectorAncestor: "#cp_container_1",
				swfPath: "js/myjs",
				wmode: "window",
				keyEnabled: true,
				supplied: "m4a, oga,mp3",
				timeupdate: function(event) {
					$(".jp-current-time").html($.jPlayer.convertTime(event.jPlayer.status.currentTime)) //获得当前时间
					$(".jp-duration").html($.jPlayer.convertTime(event.jPlayer.status.duration)) //获得当前时间
				}
			});
			//	为了小时能正常显示
			$.jPlayer.timeFormatshowHour = true;
			//				开始做题点击
			jQuery("#startTest")[0].addEventListener("tap", function() {
				mui.openWindow({
					id:"hearing-pra-test.html",
					url: "hearing-pra-test.html",
					extras: {
						articleId: articleId
					}
				})
			});
		});
		
});
	}]);

})