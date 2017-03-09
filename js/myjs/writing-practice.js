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
		$scope.useranswer = $("#user_answer").val();
		$scope.trueanswer = 'A';
		$scope.toggle = {
			now: false
		};
		$scope.$watch('toggle.now', function() {
			if($scope.toggle.now) { //界面的angularjs循环的元素加载完毕

			}
		});
		mui.plusReady(function() {
			var self = plus.webview.currentWebview();
			var ids = self.ids;
			if(!ids) {
				ids = 13061;
			}
			$http({
				method: 'post',
				url: 'http://www.toeflonline.cn/cn/wap-api/write-details',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					id: ids
				}
			}).success(function(data) {
				$scope.catName = data.data.catName;
				$scope.name = data.data.name;
				$scope.question = data.data.question;
				$scope.title = data.data.title;
				$scope.conId = data.data.id;
				if(data.data.file) {
					$scope.file = data.data.file;
					conPlay($scope.file);
				}
				if(data.data.readdata) {
					$scope.readdata = $sce.trustAsHtml(data.data.readdata);
				}
				if(data.data.filemsg) {
					$scope.filemsg = $sce.trustAsHtml(data.data.filemsg);
				}
				if($scope.title == 'deputy' || $scope.title == 'independent') {
					$(".readingMaterial").hide();
					$(".listenMaterial").hide();
				}

				$(".mui-control-item").each(function() {
					$(this).find("span").css("width", $(this).height());
				});
				//		查看全文
				jQuery("#seeAll")[0].addEventListener("tap", function() {
					if(jQuery(this).hasClass("qubie")) {
						jQuery(".all-article").animate({
							"height": jQuery(".all-article").find("div").height()
						});
						jQuery(this).removeClass("qubie");
					} else {
						jQuery(this).addClass("qubie");
						jQuery(".all-article").animate({
							"height": 150
						});

					}
				});
				//		查看原文
				jQuery("#seeArt")[0].addEventListener("tap", function() {
					if(jQuery(this).hasClass("qubie")) {
						jQuery(".original_art").slideDown();
						jQuery(this).removeClass("qubie");
					} else {
						jQuery(this).addClass("qubie");
						jQuery(".original_art").slideUp();
					}

				});

				//      开始写作
				jQuery("#start-write")[0].addEventListener("tap", function() {
					comeDati(ids);
				});
			});
		});

	}]);

});
//音频初始化
function conPlay(srcs) {
	var strs = 'http://www.toeflonline.cn';
	jQuery("#jquery_jplayer_1").jPlayer({
		ready: function(event) {
			$(this).jPlayer("setMedia", {
				m4a: "",
				mp3: strs + srcs
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

}
//立即答题
function comeDati(idD) {
	var cookie_val = localStorage.getItem("userCode");
	if(cookie_val) {
		mui.openWindow({
			id: "writing-test",
			url: "writing-test.html",
			extras: {
				ids: idD
			}
		});
	} else {
		mui.openWindow({
			id: "login",
			url: "login.html"
		})
	}

}