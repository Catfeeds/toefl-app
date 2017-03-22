jQuery(function() {
	mui(".orangeColor")[0].addEventListener("tap",function(){
          mui.openWindow({
          	id:"index.html",
          	url:"index.html"
          })
	});
	var taskSession = localStorage.getItem("taskSession");
	var userId = localStorage.getItem('userId');
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

		$http({
			method: 'post',
			url: 'http://www.toeflonline.cn/cn/app-api/intensive-listening',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {
				userId: userId,
				taskSession: taskSession
			}
		}).success(function(data) {
			$scope.name = data.intensiveListening.name;
			$scope.answer = data.intensiveListening.answer;
			//			音频播放
			var myCirclePlayer = new CirclePlayer("#jquery_jplayer_1", {
				mp3: "http://www.toeflonline.cn" + $scope.answer
					//              mp3:"audio.mp3"
					//		m4a: "http://www.jplayer.org/audio/m4a/Miaow-07-Bubble.m4a",
					//		oga: "http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
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
			//	为了小时能正常格式显示
			$.jPlayer.timeFormatshowHour = true;
		});
	}]);

});