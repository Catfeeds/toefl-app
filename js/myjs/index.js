jQuery(function() {
	var heights = jQuery(".c-t-head").width();
	jQuery(".c-t-head").css("height", heights);
	//初始化预加载详情页面
	mui.init({
		preloadPages: [{
			id: 'grammar.html',
			url: 'grammar.html',
			//  预加载多个子页面
			subpages: [{
					url: "extensive.html"
				}, {
					url: "listensArticles.html"
				}, {
					url: "encyclopedia.html"
				}, {
					url: "encyclopedia-bbs.html"
				}] //预加载页面的子页面
		}]
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
		var userId = getCookie("userId");

		if(userId) {
			//点击头像到更多设置界面
			jQuery(".c-t-head")[0].addEventListener("tap", function() {

				location.href = 'moreSettings.html';

			});

			jQuery(".noLogin").each(function() {

				jQuery(this).hide();
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
				if(data.taskSession){
					setCookie("taskSession",data.taskSession);
				}

				//				语法学习
				if($scope.grstatus == 1) {
					//					"完成"
					$scope.htmlStr = 5;
					$scope.htmlStrThree = $sce.trustAsHtml(str03);
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
				} else if($scope.hestatus != 1 && $scope.henum == 1) {
					//					"开始"
					$scope.htmlHe = str01;
				} else {
					//					"继续"
					$scope.htmlHe = str02;
				}

			});

		} else {

			//点击头像到登陆界面
			jQuery(".c-t-head")[0].addEventListener("tap", function() {
				var r = confirm("立即登录?")
				if(r == true) {
					location.href = 'login.html';
				}
			});
		}

	}]);

});