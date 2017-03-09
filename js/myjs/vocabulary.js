jQuery(function() {

	jQuery(".choose-ul ul li")[0].addEventListener("tap", function() {
		location.href = "vocab-word.html";
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
			url: 'http://www.toeflonline.cn/cn/app-api/key-words',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {
				userId: userId,
				taskSession: taskSession
			}
		}).success(function(data) {
			$scope.options = data.question.article;
			$scope.cloption = $scope.options.split("\r");
			$scope.name = data.question.name;
			$scope.answer = data.question.answer;
			$scope.alternatives = data.question.alternatives;
			//         插件播放
			jQuery("#jquery_jplayer_1").jPlayer({
				ready: function(event) {
					$(this).jPlayer("setMedia", {
						m4a: "",
						mp3: "http://www.toeflonline.cn" + $scope.alternatives
					});
				},
				swfPath: "../../js",
				supplied: "m4a, oga,mp3",
				wmode: "window",
				useStateClassSkin: true,
				toggleDuration: true
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
				$scope.num = data.todayTask.keywords.num;
			});
			//			添加点击事件
			mui(".choose-ul").on("tap", "li", function() {
				var _that = jQuery(this);
				jQuery(this).addClass("orange").siblings("li").removeClass("orange");

				setTimeout(function() {
					//         	   	正确答案样式
					jQuery(".choose-ul ul li").each(function() {
						$scope.trueAnswer = data.question.listeningFile;
						if($scope.trueAnswer == jQuery(this).attr("data-options")) {
							jQuery(this).addClass("green");
						}
					});
					//             	  	用户选择答案比较样式
					if(_that.hasClass("orange")) {
						var userAnswer = _that.attr("data-options");
						$scope.trueAnswer = data.question.listeningFile;
						if(userAnswer == $scope.trueAnswer) {
							_that.addClass("green");
							//							跳转到下一题
							var userId = localStorage.getItem('userId');
							var type = "keyWords";
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
//									closeme();
									mui.openWindow({
										id: "vocabulary"+$scope.num, //id保持传不一样的值，不然会出现跳转逻辑错误
										url: "vocabulary.html",
										createNew:true
									});

								}
							});
						} else {
							_that.addClass("red");
//							closeme();
							//							跳转到单词译意
							mui.openWindow({
								id: "vocab-word" + $scope.num, //id保持传不一样的值，不然会出现跳转逻辑错误
								url: "vocab-word.html",
								createNew:true
							})
						}

					}
				}, 1000);
			});

		});
	}]);
	//	将数字0123转化为字母ABCD
	myApp.filter('optionsAll', function() {
		return function(r) {
			return String.fromCharCode(65 + r);
		}
	});

});