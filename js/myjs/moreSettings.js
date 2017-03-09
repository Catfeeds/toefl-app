jQuery(function() {
	//             头像更换
	//	jQuery("#fileInput").change(function() {
	//		var fileVal = $(this).val();
	//		filepath = fileVal;
	//		var extStart = filepath.lastIndexOf(".");
	//		var ext = filepath.substring(extStart, filepath.length).toUpperCase();
	//		//        判断文件是不是图片
	//		if(ext != ".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG" && ext != ".JPEG") {
	//			alert("图片限于png,gif,jpeg,jpg格式");
	//		} else {
	//			var objUrl = getObjectURL(this.files[0]); //本地路径转换为本地Url;
	//			if(objUrl) {
	//				//                本地预览
	//				var str = '<img src="' + objUrl + '"/>';
	//				jQuery(str).prependTo(jQuery(".userImg"));
	//			}
	//		}
	//	});

	jQuery("#loginOut")[0].addEventListener("tap", function() {
		loginOut();
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
	myApp.controller("PriceCtrl", ["$scope", "$http", function($scope, $http) {
		$scope.toggle = {
			now: false
		};
		$scope.$watch('toggle.now', function() {
			if($scope.toggle.now) { //界面的angularjs循环的元素加载完毕

			}
		});
		$http({
			method: 'post',
			url: 'http://www.toeflonline.cn/cn/wap-api/manage',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {
				userId: localStorage.getItem("userId")
			}
		}).success(function(data) {
			$scope.nickname = data.nickname;
			$scope.phone = data.phone;
			$scope.image = data.image;
			if(data.nickname) {
				$scope.nameS = data.nickname;
			} else {
				$scope.nameS = data.userName;
			}

			$scope.email = data.email;
		});

	}]);
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
	//修改头像
	$("#fileInput").on("change", function() {
		$("#upsubmit").click();
		setTimeout(function() {
			location.reload();
		}, 1000);
	});

});

function loginOut() {
	$.ajax({
		type: "post",
		url: "http://www.toeflonline.cn/cn/wap-api/login-out",
		dataType: "jsonp",
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
		jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
		success: function(data) {
			if(data.code == 1) {
				alert("退出成功!");
				var str = data.loginOut;
				//							delCookie('userCode');
				//							delCookie('userId');
				//							delCookie('s_userId');
				//							delCookie('userName');
				localStorage.clear();
				//				closeme();
				$("#scriptBox").html(str);
				setTimeout(function() {
					mui.plusReady(function() {
						// 获取所有Webview窗口
						var curr = plus.webview.currentWebview();
						plus.webview.open("index.html");
						curr.close();
					});
					//					mui.openWindow({
					//						id: "index",
					//						url: "index.html",
					//						createNew:true
					//					})
				}, 1000);

			}
		},
		error: function() {
			alert('fail');
		}
	});
}