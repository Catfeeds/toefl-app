jQuery(function() {
	//				点击到详情页
	mui(".mui-content").on("tap", ".haveClickDetails", goDetails);
	//				点赞添加删除样式
	jQuery(".praise-p").each(function() {
		this.addEventListener("tap", clickZan);
	});
	//评论点击
	mui(".mui-content").on("tap", ".review-p", clickReview);

	//	评论回复
	mui(".reviewShow").on("tap", "ul li", reviewReply);

	//	切换到推荐
	if(jQuery("#tuijian")[0]) {
		jQuery("#tuijian")[0].addEventListener("tap", function() {
			location.href = "encyclopedia.html";
			//					mui.openWindow({
			//						url:"encyclopedia.html"
			//					})
		});
	}
	//  跳转到发帖
	jQuery("#edit-post")[0].addEventListener("tap", function() {
		mui.openWindow({
			url: "encyclopedia-postings.html"
		})
	});
	//  接收发帖页面的参数
	//添加newId自定义事件监听  
	window.addEventListener('show', function(event) {
		//获得事件参数  
		var title = event.detail.title;
		var content = event.detail.content;
		var groups = event.detail.groups;
		if(groups) {			
			var bbsLi = '<div class="bbs-li">' +
				'<div class="haveClickDetails">' +
				'<ul class="mui-table-view">' +
				'<li class="mui-table-view-cell mui-media">' +
				'<a href="javascript:;">' +
				'<img class="mui-media-object mui-pull-left" src="images/60x60.gif" style="border-radius: 50%;">' +
				'<div class="mui-media-body">' +
				'丽水夜海' +
				'<p class="mui-ellipsis">2017.01.31 22:31:01</p>' +
				'</div>' +
				'</a>' +
				'</li>' +
				'</ul>' +
				'<div class="bbs-content">' +
				'<h4 class="mui-ellipsis">' + title + '</h4>' +
				'<p class="mui-ellipsis-3">' + content + '</p>' +
				'<ul>' + groups + '</ul>' +
				'<div class="mui-clearfix"></div>' +
				'</div>' +
				'</div>' +
				'<div class="zan-pl">' +
				'<p class="praise-p on">2</p>' +
				'<p class="review-p">5</p>' +
				'</div>' +
				'<div class="mui-clearfix"></div>' +
				'<div class="reviewShow">' +
				'<ul>' +
				'<li class="mui-ellipsis-2">' +
				'<span class="blue">diuxi123</span>' +
				'<span class="grey">:</span>' +
				'<span class="grey">新发表的帖子</span>' +
				'</li>' +
				'<li class="mui-ellipsis-2">' +
				'<span class="blue">甩了GMAT君</span>' +
				'<span class="grey">回复</span>' +
				'<span class="blue">西西军</span>' +
				'<span class="grey">:</span>' +
				'<span class="grey">我都不敢做语法了...</span>' +
				'</li>' +
				'</ul>' +
				'</div>' +
				'</div>';
			jQuery("#bbs-poster").append(bbsLi);
		}
	});

});

//跳转到详情页
function goDetails() {
	mui.openWindow({
		url: "encyclopedia-bbs-details.html"
	})
}
//点赞
function clickZan() {
	if(jQuery(this).hasClass("on")) {
		jQuery(this).removeClass("on");
	} else {
		jQuery(this).addClass("on");
	}
}
//点击评论
function clickReview() {
	var liStr = '';
	var _that = jQuery(this);
	//			var num = parseInt(jQuery(this).parents(".bbs-li").attr("data-num"));			
	jQuery(".replyInput").show().find("input").focus().val("");
	var n = null;
	jQuery(".replyInput").find("input").blur(function() {
		n++;
		var value = jQuery(this).val(); //input的值	
		jQuery(".replyInput").hide();
		if(value && n == 1) {
			liStr = '<li><span class="blue">该评论用户名</span><span class="grey">:</span><span class="grey">' + value + '</span></li>';
			_that.parents(".bbs-li").find(".reviewShow ul").append(liStr);
			liStr = '';
			value = '';
		}

	});
}
//评论回复
function reviewReply() {
	var liStr = '';
	var _that = jQuery(this);
	var replyUser = _that.find("span.blue").eq(0).html();
	//			var num = parseInt(jQuery(this).parents(".bbs-li").attr("data-num"));			
	jQuery(".replyInput").show().find("input").focus().val("").attr("placeholder", "@" + replyUser);
	var n = null;
	jQuery(".replyInput").find("input").blur(function() {
		var value = jQuery(this).val(); //input的值	
		n++;
		if(value && n == 1) {
			jQuery(".replyInput").hide();
			liStr = '<li><span class="blue">用户名</span><span class="grey">回复</span>' +
				'<span class="blue">' + replyUser + '</span><span class="grey">:</span><span class="grey">' + value + '</span></li>';
			_that.parents(".bbs-li").find(".reviewShow ul").append(liStr);
			liStr = '';
			value = '';
		}

	});
}