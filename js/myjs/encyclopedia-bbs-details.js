jQuery(function() {
	//				点赞
	mui(".mui-content").on("tap", ".praise-p", clickZan);

	//	评论回复
	mui(".reviewShow").on("tap", "ul li", reviewReply);

	//	我也说一句
	jQuery("#show-input").focus(showNinput);
	var myApp = angular.module("myApp", []);
	//通过模块生成调用控制器
	myApp.controller("PriceCtrl", ["$scope", "$http", "$sce", function($scope, $http, $sce) {
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
			$scope.photo = data.image;
			localStorage.setItem("icon", data.image);
			localStorage.setItem("nickname", data.nickname);

		});
		//帖子详情
		mui.plusReady(function() {
			var self = plus.webview.currentWebview();
			var ids = self.ids;
			var type = self.type;
			var publisherUid = self.publisherUid;
			jQuery(".review-p").attr("data-type", type);
			jQuery(".review-p").attr("data-publisherUid", publisherUid);
			//评论点击
			mui(".mui-content").on("tap", ".review-p", clickReview);
			$http({
				method: 'post',
				url: 'http://gossip.gmatonline.cn/cn/wap-api/gossip-details',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					userId: localStorage.getItem("userId"),
					uid: localStorage.getItem("uid"),
					gossipId: ids,
					belong:2
				}
			}).success(function(data) {
				$scope.data = data;
				$scope.count = data.reply.length;
				$scope.content = $sce.trustAsHtml(escape2Html(emojione.toImage(data.content)));
				$scope.title = $sce.trustAsHtml(escape2Html(emojione.toImage(data.title)));
				for(var i = 0; i < $scope.data.reply.length; i++) {
					$scope.data.reply[i].content = $sce.trustAsHtml(escape2Html(emojione.toImage($scope.data.reply[i].content)));
				}
				//   查看大图
				mui(".mui-content").on("tap", ".bbs-content li", function() {
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

			});
		});

	}]);
myApp.filter('defaultImg', function() {
		return function(img) {
			var str = '';
			if(!img || img == 'undefined') {
				str = '/cn/images/details_defaultImg.png';
			}else{
				str = img;
			}
			return str;
		}
	});
	myApp.filter('con', function() {
		return function(img) {
			return $.trim(img);
		}
	});
});

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
		}
	});
}
//点击评论
function clickReview() {
	jQuery(".replyInput").show().find("input").focus().val("");
	jQuery("#mySay").hide();
	jQuery("#sendBtn")[0].addEventListener("tap", function() {
		send(1);
	});
}

function send(type) {
	jQuery("#mySay").show();
	jQuery(".replyInput").hide();
	var id = jQuery(".review-p").attr("data-tieziId");
	var gossipUser = jQuery(".review-p").attr("data-publisherUid");
	var icon = localStorage.getItem('icon');
	var content = jQuery("#content").val(); //input的值
	var uid = localStorage.getItem("uid");
	var uName = localStorage.getItem('nickname');
	if(uid == null) {
		alert('请先登录');
		mui.openWindow({
			id: "login",
			url: "login.html"
		});
	}
	if(uName == null) {
		uName = localStorage.getItem("userName");
	}
//	if(type == 1) {
//		$("#Bid").val(0);
//		$("#Bname").val('');
//	}
	if(content == '') {
		alert('请输入评论内容');
		return false;
	} else {
		var bid,bname=null;
		if(type==1 && !$("#Bid").val() || $("#Bid").val()==undefined){
			bid=0;
		}else{
			bid=$("#Bid").val();
		}
		if(type==1 && !$("#Bname").val() || $("#Bname").val()==undefined){
			bname='';
		}else{
			bname=$("#Bname").val();
		}
		$.ajax({
			method: "POST",
			url: 'http://gossip.gmatonline.cn/cn/wap-api/reply',
			data: {
				content: content,
				type: type,
				id: id,
				gossipUser: gossipUser,
				replyUser: bid,
				userImage: icon,
				uName: uName,
				replyUserName: bname,
				uid: uid,
				belong: '2'
			},
			dataType: 'json',
			success: function(data) {
				if(data.code == 1) {
					//					alert("评论成功");
					location.reload();

				}
			}

		})
	}

}
//评论回复
function reviewReply() {
	var replyUser = jQuery(this).find("span.blue").eq(0).html();
	var bid = jQuery(this).attr("data-bid");
	var bname = jQuery(this).attr("data-bname");
	$("#Bid").val(bid);
	$("#Bname").val(bname);
	jQuery("#mySay").hide();
	jQuery(".replyInput").show().find("input").focus().val("").attr("placeholder", "@" + replyUser);
	jQuery("#sendBtn")[0].addEventListener("tap", function() {
		send(2);
	});
}

function showNinput() {
	var btn = jQuery(".review-p")[0];
	mui.trigger(btn, "tap");
	jQuery("#mySay").hide();
}