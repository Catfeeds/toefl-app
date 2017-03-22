jQuery(function() {
	//				底部导航跳转
		mui.plusReady(function() {
		if(plus.webview.getWebviewById('index.html')) {
			sessionStorage.setItem("flag", "true");
			plus.webview.getWebviewById('index.html').close();
		} else if(plus.webview.getWebviewById('encyclopedia-main.html')) {
			plus.webview.getWebviewById('encyclopedia-main.html').close();
		} else if(plus.webview.getWebviewById('course.html')) {
			plus.webview.getWebviewById('course.html').close();
		}
	});
	jumpPage("#fixed-1", "index.html");
	jumpPage("#fixed-2", "course.html");
	jumpPage("#fixed-3", "encyclopedia-main.html");
	jumpPage("#fixed-4", "personalCenter.html");

	jQuery(".userImg").css("height", jQuery(".userImg").width() + 10);

	var myApp = angular.module("myApp", []);
	//通过模块生成调用控制器
	myApp.controller("PriceCtrl", ["$scope", "$http", "$sce", function($scope, $http, $sce) {
		//用户信息
		var userId = localStorage.getItem("userId");
		if(userId) {
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
				var img = '';
				if(!data.image) {
					img = '/cn/images/details_defaultImg.png';
				} else {
					img = data.image;
				}
				$scope.photo = 'http://www.toeflonline.cn' + img;
				if(data.nickname) {
					$scope.name = data.nickname;
				} else {
					$scope.name = localStorage.getItem("userName");
				}
				jQuery("#listen")[0].addEventListener("tap", function() {
					mui.openWindow({
						url: "listenRecord.html"
					});
				});
				jQuery("#speak")[0].addEventListener("tap", function() {
					mui.openWindow({
						id: "speakRecord",
						url: "speakRecord.html",
						extras: {
							type: 1
						}
					});
				});
				jQuery("#read")[0].addEventListener("tap", function() {
					mui.openWindow({
						id: "readRecord",
						url: "readRecord.html",
						extras: {
							type: 1
						}
					});
				});
				jQuery("#write")[0].addEventListener("tap", function() {
					mui.openWindow({
						id: "writeRecord",
						url: "writeRecord.html",
						extras: {
							type: 2
						}
					});
				});
				jQuery("#mycourse")[0].addEventListener("tap", function() {
					mui.openWindow({
						id: "myCourse",
						url: "myCourse.html",
						extras: {
							status: 3
						}
					});
				});
				jQuery("#word")[0].addEventListener("tap", function() {
					mui.openWindow({
						url: "notebook.html"
					});
				});
				jQuery("#message")[0].addEventListener("tap", function() {
					mui.openWindow({
						id: "message",
						url: "message.html",
						extras: {
							status: 3
						}
					});
				});
				jQuery("#moreSet")[0].addEventListener("tap", function() {
					mui.openWindow({
						id: "moreSettings",
						url: "moreSettings.html"
					});
				});

			});
		} else {
			$scope.photo = 'images/myimages/touxiang@2x.png';
			$scope.name = '未登陆';
			jQuery("#listen")[0].addEventListener("tap", function() {
				mui.openWindow({
					id: "login-more",
					url: "login.html"
				});
			});
			jQuery("#speak")[0].addEventListener("tap", function() {
				mui.openWindow({
					id: "login-more",
					url: "login.html"
				});
			});
			jQuery("#read")[0].addEventListener("tap", function() {
				mui.openWindow({
					id: "login-more",
					url: "login.html"
				});
			});
			jQuery("#write")[0].addEventListener("tap", function() {
				mui.openWindow({
					id: "login-more",
					url: "login.html"
				});
			});
			jQuery("#mycourse")[0].addEventListener("tap", function() {
				mui.openWindow({
					id: "login-more",
					url: "login.html"
				});
			});
			jQuery("#word")[0].addEventListener("tap", function() {
				mui.openWindow({
					id: "login-more",
					url: "login.html"
				});
			});
			jQuery("#message")[0].addEventListener("tap", function() {
				mui.openWindow({
					id: "login-more",
					url: "login.html"
				});
			});
			jQuery("#moreSet")[0].addEventListener("tap", function() {
				mui.openWindow({
					id: "login-more",
					url: "login.html"
				});
			});
		}

	}]);
	//		未登陆images/myimages/touxiang@2x.png
	myApp.filter('defaultImg', function() {
		return function(img) {
			var str = '';
			if(!img || img == 'undefined' || img == null) {
				str = 'http://www.toeflonline.cn/cn/images/details_defaultImg.png';
			} else {
				str = img;
			}
			return str;
		}
	});
});