jQuery(function() {
	//	关闭解析
	jQuery("#jiexi")[0].addEventListener("tap", hideAnalysis);
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
	var taskSession = localStorage.getItem("taskSession");
	var userId = localStorage.getItem('userId');
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
			url: 'http://www.toeflonline.cn/cn/app-api/grammar-learning',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {
				userId: userId,
				taskSession: taskSession
			}
		}).success(function(data) {

			$scope.jiexi = data.grammarLearning.answer;
			$scope.listeningFile = data.question.listeningFile;
			$scope.alternatives = data.question.alternatives.split("\r");
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
				$scope.num = data.todayTask.grammarLearning.num;
			});
			//			选项点击事件
			mui(".mui-table-view").on("tap", ".mui-table-view-cell", function() {
				jQuery(this).addClass("li-orange").siblings("li").removeClass("li-orange");
			});
			//          提交答案点击
			jQuery("#subAnswer")[0].addEventListener("tap", function() {
				jQuery(this).hide().siblings("button").show();
				jQuery(".mui-table-view-cell").each(function() {
					var userAnswer = jQuery(this).find(".mui-media-object").html();
					//             	正确答案
					$scope.trueAnswer = data.question.answer;
					if(userAnswer == $scope.trueAnswer) {
						jQuery(this).addClass("li-green");
					}
					//             	  	用户选择答案比较样式
					if(jQuery(this).hasClass("li-orange")) {
						var userAnswer = jQuery(this).find(".mui-media-object").html();
						$scope.trueAnswer = data.question.answer;
						if(userAnswer == $scope.trueAnswer) {
							jQuery(this).addClass("li-green");
						} else {
							jQuery(this).addClass("li-red");
						}

					}
					//             	  else{
					//             	  	alert("还没选择答案哦!");
					//             	  }
				});

			});
			//          下一题
			jQuery("#next-gram")[0].addEventListener("tap", function() {
				var userId = localStorage.getItem('userId');
				var type = "grammarLearning";
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

					if(data.code == 2) {
						jQuery(".mui-backdrop").show();
					} else {
//						closeme();
						mui.openWindow({
							id:"grammar-practice-"+$scope.num,
							url: "grammar-practice.html"
						});

					}
				});
			});

		});
	}]);
	//	将数字0123转化为字母ABCD
	myApp.filter('optionsAll', function() {
		return function(r) {
			return String.fromCharCode(65 + r);
		}
	});
	jQuery("#sure-index")[0].addEventListener("tap",function(){
		mui.openWindow({
			id:"index",
			url:"index.html"
		})
	});

});
//显示解析
function showAnalysis() {
	jQuery("#practice").hide();
	jQuery("#analysis").slideDown();
}
//关闭解析
function hideAnalysis() {
	jQuery("#practice").show();
	jQuery("#analysis").slideUp();
}