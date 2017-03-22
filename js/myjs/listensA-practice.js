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
			$scope.cnName = data.question.cnName;
			$scope.alternatives = data.question.alternatives.split("\r");
			$scope.listeningFile = data.question.listeningFile;
			for(var i=0;i<$scope.alternatives.length;i++){				
				if($.trim($scope.alternatives[i]).length>2){
					$scope.china=$.trim($scope.alternatives[i]).substring(1);
				}
			}
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
				$scope.num = data.todayTask.intensiveListening.num;
			});
			//			音频播放
			jQuery("#jquery_jplayer_1").jPlayer({
				ready: function(event) {
					$(this).jPlayer("setMedia", {
						m4a: "",
						mp3: "http://www.toeflonline.cn" + $scope.cnName
					});
				},
				swfPath: "../../js",
				supplied: "m4a, oga,mp3",
				wmode: "window",
				useStateClassSkin: true,
				toggleDuration: true
			});
			mui(".mui-table-view").on("tap", ".mui-table-view-cell", function() {
				jQuery(this).addClass("orange").siblings("li").removeClass("orange");
			});
			//          提交答案点击
//			jQuery("#subAnswer")[0].addEventListener("tap", function() {
//
//				jQuery(this).hide().siblings("button").show();
//				jQuery(".mui-table-view-cell").each(function() {
//					var userAnswer = jQuery(this).attr("data-options");
//					//             	正确答案
//					$scope.trueAnswer = data.question.answer;
//					if(userAnswer == $scope.trueAnswer) {
//						jQuery(this).addClass("green");
//					}
//					//             	  	用户选择答案比较样式
//					if(jQuery(this).hasClass("orange")) {
//						var userAnswer = jQuery(this).attr("data-options");
//						$scope.trueAnswer = data.question.answer;
//						if(userAnswer == $scope.trueAnswer) {
//							jQuery(this).addClass("green");
//						} else {
//							jQuery(this).addClass("red");
//						}
//
//					}
//					//             	  else{
//					//             	  	alert("还没选择答案哦!");
//					//             	  }
//				});
//				jQuery("#title").removeClass("tranp");
//
//			});
			//          下一题
			jQuery("#next")[0].addEventListener("tap", function() {
				var userId = localStorage.getItem('userId');
				var type = "intensiveListening";
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

						mui.openWindow({
							id:"listensA-practice-"+$scope.num,
							url: "listensA-practice.html"
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
	jQuery(".eglish")[0].addEventListener("tap",function(){
		if(jQuery(this).find("h4").hasClass("tranp")){
			jQuery(this).find("h4").removeClass("tranp");
		}else{
			jQuery(this).find("h4").addClass("tranp")
		}
	});
	jQuery(".china")[0].addEventListener("tap",function(){
		if(jQuery(this).find("h4").hasClass("tranp")){
			jQuery(this).find("h4").removeClass("tranp");
		}else{
			jQuery(this).find("h4").addClass("tranp")
		}
	});

});