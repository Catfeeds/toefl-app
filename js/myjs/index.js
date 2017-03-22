jQuery(function() {
	var flag = localStorage.getItem("flag");
	if(flag == "true") {
		$('.second_i').hide();
	} else {
		$('.second_i').show();
	}
	secondTZ();
	//按钮点击事件
	document.getElementById("close").addEventListener('tap', function(event) {
		localStorage.setItem("flag","true");
		$('.second_i').fadeOut();

	}, false);

	//	头像高度
	var heights = jQuery(".c-t-head").width();
	jQuery(".c-t-head").css("height", heights + "px");

	jumpPage("#l-icon-ting", "hearing.html");
	jumpPage("#r-icon-read", "reading.html");
	jumpPage("#w-icon-write", "writing.html");
	mui.plusReady(function() {
		if(plus.webview.getWebviewById('course.html')) {
			plus.webview.getWebviewById('course.html').close();
		} else if(plus.webview.getWebviewById('encyclopedia-main.html')) {
			plus.webview.getWebviewById('encyclopedia-main.html').close();
		} else if(plus.webview.getWebviewById('personalCenter.html')) {
			plus.webview.getWebviewById('personalCenter.html').close();
		}
	});

	jumpPage("#fixed-1", "index.html");
	jumpPage("#fixed-2", "course.html");
	jumpPage("#fixed-3", "encyclopedia-main.html");
	jumpPage("#fixed-4", "personalCenter.html");

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

		//	   setTimeout(function(){
		var userId = localStorage.getItem('userId');

		if(userId) {
			//			语法学习跳转
			jQuery("#yufa")[0].addEventListener("tap", yufa);
			//		泛听练习跳转
			jQuery("#fanting")[0].addEventListener("tap", fanting);
			//		精听文章跳转
			jQuery("#jingting")[0].addEventListener("tap", jingting);
			//		核心词汇跳转
			jQuery("#hexinch")[0].addEventListener("tap", hexing);

			jQuery(".noLogin").each(function() {

				jQuery(this).hide();
			});
			$http({
				method: 'post',
				url: 'http://www.toeflonline.cn/cn/wap-api/manage',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					userId: userId
				}
			}).success(function(data) {
				if(data.image) {
					$scope.image = 'http://www.toeflonline.cn' + data.image;
				} else {
					$scope.image = 'images/myimages/userDefault.png';
				}
			});
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
				var str01 = '开始';
				var str02 = '继续';
				var str03 = '<img src="images/myimages/ExerciseToday5@2x.png" alt="完成图标" />';
				var num = 0;
				$scope.days = data.taskDays;
				$scope.nums = data.taskNumber;
				$scope.grnum = data.todayTask.grammarLearning.num;
				$scope.grstatus = data.todayTask.grammarLearning.status;
				$scope.fannum = data.todayTask.panListensPractice.num;
				$scope.fanstatus = data.todayTask.panListensPractice.status;
				$scope.jingnum = data.todayTask.intensiveListening.num;
				$scope.jingstatus = data.todayTask.intensiveListening.status;;
				$scope.henum = data.todayTask.keyWords.num;
				$scope.hestatus = data.todayTask.keyWords.status;
				var heights = jQuery(".c-t-head").width();
				jQuery(".c-t-head").css("height", heights + "px");
				if(data.taskSession) {
					//					setCookie("taskSession", data.taskSession);
					localStorage.setItem("taskSession", data.taskSession);
				}

				//				语法学习
				if($scope.grstatus == 1) {
					//					"完成"
					$scope.htmlStr = 5;
					$scope.htmlStrThree = $sce.trustAsHtml(str03);
					num++;
					jQuery("#yufa")[0].removeEventListener("tap", yufa);
				} else if($scope.grstatus != 1 && $scope.grnum == 1) {
					//					"开始"
					$scope.htmlStr = str01;
				} else {
					//					"继续"
					$scope.htmlStr = str02;
				}
				//				泛听练习
				if($scope.fanstatus == 1) {
					//					"完成"
					$scope.htmlFan = 5;
					$scope.htmlFanThree = $sce.trustAsHtml(str03);
					jQuery("#fanting")[0].removeEventListener("tap", fanting);
					num++;
				} else if($scope.fanstatus != 1 && $scope.fannum == 1) {
					//					"开始"
					$scope.htmlFan = str01;
				} else {
					//					"继续"
					$scope.htmlFan = str02;
				}
				//			精听文章
				if($scope.jingstatus == 1) {
					//					"完成"
					$scope.htmlJing = 5;
					$scope.htmlJingThree = $sce.trustAsHtml(str03);
					jQuery("#jingting")[0].removeEventListener("tap", jingting);
					num++;
				} else if($scope.jingstatus != 1 && $scope.jingnum == 1) {
					//					"开始"
					$scope.htmlJing = str01;
				} else {
					//					"继续"
					$scope.htmlJing = str02;
				}

				//        核心词汇
				if($scope.hestatus == 1) {
					//					"完成"
					$scope.htmlHe = 5;
					$scope.htmlHeThree = $sce.trustAsHtml(str03);
					jQuery("#hexinch")[0].removeEventListener("tap", hexing);
					num++;
				} else if($scope.hestatus != 1 && $scope.henum == 1) {
					//					"开始"
					$scope.htmlHe = str01;
				} else {
					//					"继续"
					$scope.htmlHe = str02;
				}
				jQuery("#usually").html(num);

				//点击头像到更多设置界面
				jQuery(".c-t-head")[0].addEventListener("tap", function() {
					mui.openWindow({
						id: "moreSettings-" + $scope.nums,
						url: "moreSettings.html"
					})

				});

			});

		} else {
			$scope.image = 'images/myimages/touxiang@2x.png';
			//点击头像到登陆界面
			jQuery(".c-t-head")[0].addEventListener("tap", function() {
				var r = confirm("立即登录?")
				if(r == true) {
					mui.openWindow({
						id: "login",
						url: "login.html"
					})
				}
			});
			//			语法学习未登录跳转
			jQuery("#yufa")[0].addEventListener("tap", function() {
				mui.openWindow({
					url: "login.html"
				})
			});
			//		泛听未登录跳转
			jQuery("#fanting")[0].addEventListener("tap", function() {
				mui.openWindow({
					url: "login.html"
				})
			});
			//		精听未登录跳转
			jQuery("#jingting")[0].addEventListener("tap", function() {
				mui.openWindow({
					url: "login.html"
				})
			});
			//		核心词汇未登录跳转
			jQuery("#hexinch")[0].addEventListener("tap", function() {
				mui.openWindow({
					url: "login.html"
				})
			});

		}
		//	   },2000);

	}]);

});

//语法学习登录之后的调整函数
function yufa() {
	mui.openWindow({
		url: "grammar.html"
	});
	plus.webview.currentWebview().hide();
	plus.webview.open('grammar.html', 'grammar.html');
}
//泛听练习登录之后的调整函数
function fanting() {
	mui.openWindow({
		url: "extensive.html"
	});
	plus.webview.currentWebview().hide();
	plus.webview.open('extensive.html', 'extensive.html');
}
//精听文章登录之后的调整函数
function jingting() {
	mui.openWindow({
		url: "listensArticles.html"
	});
	plus.webview.currentWebview().hide();
	plus.webview.open('listensArticles.html', 'listensArticles.html');
}
//核心词汇登录之后的调整函数
function hexing() {
	mui.openWindow({
		url: "vocabulary.html"
	});
	plus.webview.currentWebview().hide();
	plus.webview.open('vocabulary.html', 'vocabulary.html');
}
//引导页
function secondTZ() {
	var num = jQuery("#num").html();
	var timer = setInterval(function() {
		num--;
		if(num < 0) {
			clearInterval(timer);
			$('.second_i').fadeOut();
			localStorage.setItem("flag","true");
			return false;
		}
		jQuery("#num").html(num)
	}, 1000);

}