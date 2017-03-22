jQuery(function() {

	//				底部导航跳转
	jumpPage("#fixed-1", "index.html");
	jumpPage("#fixed-2", "course.html");
	jumpPage("#fixed-3", "encyclopedia.html");
	jumpPage("#fixed-4", "personalCenter.html");

	//  跳转到发帖
	jQuery("#edit-post")[0].addEventListener("tap", function() {
		mui.openWindow({
			url: "encyclopedia-postings.html"
		})
	});
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
				//   查看大图
				mui(".mui-content").on("tap", ".img-show li", function() {
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
			}
		});
		$http({
			method: 'post',
			url: 'http://gossip.gmatonline.cn/cn/wap-api/gossip-list',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {
				userid: localStorage.getItem("userId"),
				uid: localStorage.getItem("uid"),
				page: '1',
				pageSize: "1000",
				belong: 2
			}
		}).success(function(data) {

			$scope.items1 = data.data.data;
			for(var i = 0; i < $scope.items1.length; i++) {
			
				$scope.items1[i].content = $sce.trustAsHtml(escape2Html($scope.items1[i].content));
				$scope.items1[i].title = $sce.trustAsHtml(escape2Html($scope.items1[i].title));
				$scope.items1[i].count = $scope.items1[i].reply.length;
				for(var j = 0; j < $scope.items1[i].reply.length; j++) {
//					emojione.toImage();特殊表情转化
					$scope.items1[i].reply[j].content = $sce.trustAsHtml(escape2Html($scope.items1[i].reply[j].content));
				}

			}
			//				点击到详情页
			mui(".mui-content").on("tap", ".haveClickDetails", goDetails);
			//				点赞
			mui(".mui-content").on("tap", ".praise-p", clickZan);

			//评论点击
			mui(".mui-content").on("tap", ".review-p", goDetails);
			//查看全部评论
			mui(".mui-content").on("tap", ".seeAll-reply", goDetails);
			//	评论回复
			//	mui(".reviewShow").on("tap", "ul li", reviewReply);

			//	切换到推荐
			if(jQuery("#tuijian")[0]) {
				jumpPage("#tuijian", "encyclopedia-main.html");
			}

		});

	}]);
	myApp.filter('defaultImg', function() {
		return function(img) {
			var str = '';
			if(!img || img == 'undefined' || img=='null') {
				str = '/cn/images/details_defaultImg.png';
			} else {
				str = img;
			}
			return str;
		}
	});
	myApp.filter('nullName', function() {
		return function(name) {
			var namestr = '';
			if(!name || name == 'undefined') {
				namestr = localStorage.getItem("userName");
			} else {
				namestr = name;
			}
			return namestr;
		}
	});

});

//跳转到详情页
function goDetails() {
	var ids = jQuery(this).attr("data-tieziId");
	var publisherUid = jQuery(this).attr("data-publisherUid");
	mui.openWindow({
		id: "encyclopedia-bbs-details",
		url: "encyclopedia-bbs-details.html",
		extras: {
			ids: ids,
			publisherUid: publisherUid,
			type: 1
		}
	});
}
//点赞
function clickZan() {
	var _that = jQuery(this);
	var gossipId = _that.attr("data-tieziId"); //帖子ID
	$.ajax({
		url: 'http://gossip.gmatonline.cn/cn/wap-api/add-like',
		method: "POST",
		dataType: "json",
		data: {
			gossipId: gossipId,
			uid: localStorage.getItem("uid"),
		},
		success: function(data) {
			alert(data.message);
			_that.html(data.likeNum);
			if(data.code == 1) {
				_that.addClass("on");
			}
			if(data.code == 2) {
				_that.removeClass("on");
			}
			if(data.message == "未登录") {
				mui.openWindow({
					id: "login",
					url: "login.html"
				});
			}
		}
	});

}
//点击评论
//function clickReview() {
//	var liStr = '';
//	var _that = jQuery(this);
//	//			var num = parseInt(jQuery(this).parents(".bbs-li").attr("data-num"));			
//	jQuery(".replyInput").show().find("input").focus().val("");
//	var n = null;
//	jQuery(".replyInput").find("input").blur(function() {
//		n++;
//		var value = jQuery(this).val(); //input的值	
//		jQuery(".replyInput").hide();
//		if(value && n == 1) {
//			liStr = '<li><span class="blue">该评论用户名</span><span class="grey">:</span><span class="grey">' + value + '</span></li>';
//			_that.parents(".bbs-li").find(".reviewShow ul").append(liStr);
//			liStr = '';
//			value = '';
//		}
//
//	});
//}
//评论回复
//function reviewReply() {
//	var liStr = '';
//	var _that = jQuery(this);
//	var replyUser = _that.find("span.blue").eq(0).html();
//	//			var num = parseInt(jQuery(this).parents(".bbs-li").attr("data-num"));			
//	jQuery(".replyInput").show().find("input").focus().val("").attr("placeholder", "@" + replyUser);
//	var n = null;
//	jQuery(".replyInput").find("input").blur(function() {
//		var value = jQuery(this).val(); //input的值	
//		n++;
//		if(value && n == 1) {
//			jQuery(".replyInput").hide();
//			liStr = '<li><span class="blue">用户名</span><span class="grey">回复</span>' +
//				'<span class="blue">' + replyUser + '</span><span class="grey">:</span><span class="grey">' + value + '</span></li>';
//			_that.parents(".bbs-li").find(".reviewShow ul").append(liStr);
//			liStr = '';
//			value = '';
//		}
//
//	});
//}