jQuery(function() {
	//				点赞添加删除样式
	jQuery(".praise-p").each(function() {
		this.addEventListener("tap", clickZan);
	});
	//评论点击
	mui(".mui-content").on("tap", ".review-p", clickReview);

	//	评论回复
	mui(".reviewShow").on("tap", "ul li", reviewReply);

	//	我也说一句
	jQuery("#show-input").focus(showNinput);
});

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
	jQuery(".replyInput").show().find("input").focus().val("");
	var n = null;
	jQuery("#mySay").hide();
	jQuery(".replyInput").find("input").blur(function() {
		var value = jQuery(this).val(); //input的值	
		n++;
		jQuery("#mySay").show();
		jQuery(".replyInput").hide();
		if(value && n == 1) {
			liStr = '<li>' +
				'<div class="mui-row">' +
				'<div class="l-i-user mui-col-sm-3 mui-col-xs-3">' +
				'<img src="images/60x60.gif" alt="用户头像" />' +
				'</div>' +
				'<div class="r-i-info mui-col-sm-9 mui-col-xs-9">' +
				'<span class="blue">用户名</span>' +
				'<span class="grey">:</span>' +
				'<span class="grey">' + value + '</span>' +
				'<p>2017-01-26 11:30:03</p>' +
				'</div>' +
				'<div class="mui-clearfix"></div>' +
				'</div>' +
				'</li>';
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
	var n = null;
	jQuery("#mySay").hide();
	jQuery(".replyInput").show().find("input").focus().val("").attr("placeholder", "@" + replyUser);
	jQuery(".replyInput").find("input").blur(function() {
		var value = jQuery(this).val(); //input的值	
		n++;
		jQuery("#mySay").show();
		jQuery(".replyInput").hide();
		if(value && n == 1) {
			liStr = '<li>' +
				'<div class="mui-row">' +
				'<div class="l-i-user mui-col-sm-3 mui-col-xs-3">' +
				'<img src="images/60x60.gif" alt="用户头像" />' +
				'</div>' +
				'<div class="r-i-info mui-col-sm-9 mui-col-xs-9">' +
				'<span class="blue">用户名</span>' +
				'<span class="grey">回复</span>' +
				'<span class="blue">' + replyUser + '</span>' +
				'<span class="grey">:</span>' +
				'<span class="grey">' + value + '</span>' +
				'<p>2017-01-26 11:30:03</p>' +
				'</div>' +
				'<div class="mui-clearfix"></div>' +
				'</div>' +
				'</li>';
			_that.parents(".bbs-li").find(".reviewShow ul").append(liStr);
			liStr = '';
			value = '';
		}

	});
}

function showNinput() {
	var btn = jQuery(".review-p")[0];
	mui.trigger(btn, "tap");
	jQuery("#mySay").hide();
}