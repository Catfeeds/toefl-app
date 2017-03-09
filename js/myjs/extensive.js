jQuery(function() {

	$(".wc-btn")[0].addEventListener('tap', function() {
		//		展示中文
		showChina();
	});
	$(".jp-controls")[0].addEventListener('tap', function() {
		//		//点击响应逻辑  
		playS();
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

				jQuery(".article ul li:first-child").addClass("on");
			}
		});
		if(userId) {
			$http({
				method: 'post',
				url: 'http://www.toeflonline.cn/cn/app-api/pan-listens-practice',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					userId: userId,
					taskSession: taskSession
				}
			}).success(function(data) {
				$scope.sentence = data.question.sentence;
				$scope.audioSrc = data.question.audio.filePath;
				//			音频播放插件
				jQuery("#jquery_jplayer_1").jPlayer({
					ready: function(event) {
						$(this).jPlayer("setFile", "mp3/elvis.mp3", "ogg/elvis.ogg"); //定义mp3文件及对应的ogg文件
						$(this).jPlayer("setMedia", {
							m4a: "",
							mp3: "http://www.toeflonline.cn" + $scope.audioSrc
						});
					},
					swfPath: "../../js",
					supplied: "m4a, oga,mp3",
					wmode: "window",
					useStateClassSkin: true,
					toggleDuration: true

				});

				//			获取动态改变的当前题目数量(做到了第几道题) 只能再次请求
				$http({
					method: 'post',
					url: 'http://www.toeflonline.cn/cn/app-api/today-task',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: {
						userId: userId
					}
				}).success(function(data) {
					$scope.num = data.todayTask.panListensPractice.num;
				});
				//          下一篇
				jQuery("#next")[0].addEventListener("tap", function() {
					var userId = localStorage.getItem('userId');
					var type = "panListensPractice";
					$http({
						method: 'post',
						url: 'http://www.toeflonline.cn/cn/app-api/task-next',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						data: {
							userId: userId,
							type: type
						}
					}).success(function(data) {
						if(data.code == 2) { //已做完
							closeme();
							mui.openWindow({
								id:"index",
								url: "index.html"
							});

						} else {
//								closeme();
							mui.openWindow({
								id:"extensive-"+$scope.num, 
								url: "extensive.html"
							});

						}
					});
				});

			});
		}
	}]);

});

//显示中文
function showChina() {
	jQuery(".article ul li span").slideToggle();
}

//文章句子选中
function allSentence() {
	$(".article ul li").each(function() {
		var _that = $(this);
		var playCurrent = $("#jquery_jplayer_1").data("jPlayer").status.currentTime;
		var starttime = _that.attr("data-starttime");
		var endtime = parseFloat(starttime) + parseFloat(_that.attr("data-audiotime"));
		if(playCurrent >= starttime && playCurrent <= endtime) {
			_that.addClass("on").siblings("li").removeClass("on");
		}
	});
}

function playS() {
	var timer = setInterval(function() {
		var currentLi = $(".article ul li.on");
		var starttime = currentLi.attr("data-starttime");
		var endtime = parseFloat(starttime) + parseFloat(currentLi.attr("data-endtime"));
		var playCurrent = $("#jquery_jplayer_1").data("jPlayer").status.currentTime;
		if(playCurrent >= starttime && playCurrent <= endtime) {

		} else {
			allSentence();
			scrollPos();
		}
	}, 1000 / 60);
}
//控制文章滚动条
function scrollPos() {
	var topT = "-" + $(".article ul li.on")[0].offsetTop;
	//  $(".mui-content").animate({scrollTop:topT+"px"},1000/30);
	mui('.mui-scroll-wrapper').scroll().scrollTo(0, topT);//最后一个参数加了时间就会闪
}