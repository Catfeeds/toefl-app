jQuery(function() {

	var taskSession = localStorage.getItem("taskSession");
	var userId =localStorage.getItem('userId');
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
			url: 'http://www.toeflonline.cn/cn/app-api/key-words',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {
				userId: userId,
				taskSession: taskSession
			}
		}).success(function(data) {
			$scope.name = data.question.name;
			$scope.answer = data.question.answer;
			$scope.cnName = data.question.cnName;
			$scope.numbering = data.question.numbering;
			$scope.duration = data.question.duration;
			$scope.problemComplement = data.question.problemComplement;
			jQuery("#jquery_jplayer_1").jPlayer({
				ready: function(event) {
					$(this).jPlayer("setMedia", {
						m4a: "",
						mp3: "http://www.toeflonline.cn" + data.question.alternatives
					});
				},
				swfPath: "../../js",
				supplied: "m4a, oga,mp3",
				wmode: "window",
				useStateClassSkin: true,
				toggleDuration: true,
				cssSelectorAncestor: "#jp_container_1"
			});
			//			下一题
			jQuery("#next")[0].addEventListener("tap", function() {
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

						mui.openWindow({
							url: "vocabulary.html"
						});

					}
				});
			});

		});
	}]);

});