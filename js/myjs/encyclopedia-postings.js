jQuery(function() {

	//			发表按钮样式
	jQuery(".title-input input").change(function() {
		var title = jQuery(".title-input input").val();
		jQuery(".content-text textarea").change(function() {
			var content = jQuery(".content-text textarea").val();
			if(title && content) {
				jQuery(".push-btn").addClass("on");
			} else {
				jQuery(".push-btn").removeClass("on");
			}
		});
	});
	var myApp = angular.module("myApp", []);
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
		//用户信息
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
			localStorage.setItem("icon", data.image);
			localStorage.setItem("nickname", data.nickname);

		});
	}]);

	jQuery("#pushBtn")[0].addEventListener("tap", function() {
		if(jQuery(".push-btn").hasClass("on")) {
			var id = this.getAttribute('data-id');
			var groups = jQuery(".img-group ul").html();
			var publisher = localStorage.getItem("nickname");
			if(publisher == '') {
				publisher = localStorage.getItem("userName");
			}
			var icon = localStorage.getItem('icon');
			var title = jQuery(".title-input input").val();
			var content = jQuery(".content-text textarea").val();
			var img = [];
			$('.sendAfter').each(function() {
				var val = $(this).val();
				img.push(val);
			});
			$.ajax({
				url: "http://gossip.gmatonline.cn/cn/wap-api/add-gossip",
				type: "POST",
				data: {
					uid: localStorage.getItem("uid"),
					image: img,
					video: '',
					audio: '',
					belong: '2',
					title: title,
					content: content,
					icon: icon,
					publisher: publisher
				},
				dataType: 'json',
				success: function(data) {
					console.log(data);
					if(data.code == 0) {
						alert('请先登录');
						mui.openWindow({
							id: "login",
							url: "login.html"
						});
					}
					if(data.code == 1) {
						alert('发布成功');
						mui.openWindow({
							id: "encyclopedia-bbs",
							url: "encyclopedia-bbs.html"
						});

					}

				}
			})

		}

	});

	//             插入图片
	jQuery(".add-icon input").change(function() {
		toUpdate();
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
		//				var str = '<li><div class="closeBlack"><span class="mui-icon mui-icon-closeempty"></span></div><div class="img-box"><img src="' + objUrl + '"/></div></li>';
		//				jQuery(str).prependTo(jQuery(".img-group ul"));
		//			}
		//		}
	});

});

//html5 ajax form表单提交
function toUpdate() {
	var form = document.getElementById("upform");
	var fd = new FormData(form);
	$.ajax({
		url: "http://gossip.gmatonline.cn/cn/wap-api/app-image",
		type: "POST",
		data: fd,
		processData: false, // 告诉jQuery不要去处理发送的数据
		contentType: false, // 告诉jQuery不要去设置Content-Type请求头
		success: function(data) {
			var data = $.parseJSON(data);
			if(data.code == 1) {
				preview(data.image);
				$('.fileUrl').append('<input type="hidden" class="sendAfter" value="' + data.image + '">');
				//	点击叉叉删除图片
				mui(".img-group").on("tap", ".closeBlack", function() {
					jQuery(this).parents("li").remove();
				});
				//   查看大图
				mui(".mui-content").on("tap", ".img-group ul li", function() {
					var src_u = jQuery(this).find("img").attr("src");
					jQuery('#popover').find("img").attr("src", src_u);
					jQuery("#popover").css({
						marginLeft: "-" + jQuery("#popover").width() / 2 + "px",
						marginTop: "-" + jQuery("#popover").height() / 2 + "px"
					});
					mui('#popover').popover('show');
				});
				//			关闭大图弹窗
				jQuery(".close-icon")[0].addEventListener("tap", function() {
					mui('#popover').popover('hide');
				});
			} else {
				alert(data.message);
			}

		}
	});
	return false;
}
//        图片展示
function preview(file) {
	var urlS = 'http://gossip.gmatonline.cn';
	var str = '<li><div class="closeBlack"><span class="mui-icon mui-icon-closeempty"></span></div><div class="img-box"><img src="' + urlS + file + '"/></div></li>';
	jQuery(str).prependTo(jQuery(".img-group ul"));	
}