$(document).ready(function() {

	//		$(id).data("jPlayer").status.currentTime;
	$(".mui-control-item").each(function() {
		$(this).find("span").css("width", $(this).height());
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
				jQuery(".mui-control-item").first().addClass("mui-active");
				jQuery(".mui-control-content").first().addClass("mui-active");
			}
		});
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		var articleId = self.articleId;
		$http({
			method: 'post',
			url: 'http://www.toeflonline.cn/cn/app-api/practice-row',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {
				pieceId: articleId, //文章id
				userId: localStorage.getItem("userId")
			}
		}).success(function(data) {
			$scope.articleFile = data.article.file;
			$scope.name = data.article.name;
			$scope.question = data.question;
			$scope.timuTotal = data.question.length;
		
			jQuery("#jquery_jplayer_1").jPlayer({
				ready: function(event) {
					$(this).jPlayer("setMedia", {
						m4a: "",
						mp3: "http://www.toeflonline.cn" + $scope.articleFile
					});
				},
				swfPath: "../../js",
				supplied: "m4a, oga,mp3",
				wmode: "window",
				useStateClassSkin: true,
				toggleDuration: true,
				timeupdate: function(event) {
					//          playCurrent=event.jPlayer.status.currentTime;//获得当前时间
					//          playDuration=event.jPlayer.status.duration;//获得当前时间
				}
			});
			//			正确数量
			var numT = 0;
			for(var i = 0; i < $scope.question.length; i++) {
				if($scope.question[i].answer == $scope.question[i].userAnswer) {
					numT++;
				}
			}
			$scope.trueLen = numT;

			//	精听本文
			jQuery("#jingListen")[0].addEventListener("tap", function() {
				mui.openWindow({
					url: 'hearing-quietly.html',
					extras: {
						catName: data.article.catName,
						title: data.article.title,
						articleId: data.article.id
					}
				});
			});
			//再做一次
			jQuery("#reTest")[0].addEventListener("tap", function() {
				mui.openWindow({
					url: 'hearing-practice.html',
					extras: {
						articleId: data.article.id
					}
				});
			});

		});
		});
	}]);
	myApp.filter('optionsAll', function() {
		return function(r) {
			return String.fromCharCode(65 + r);
		}
	});
	myApp.filter('splitArr', function() {
		return function(r) {
			return r.split("\n");
		}
	});

});