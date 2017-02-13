(function($) {
	$('#scroll').scroll({
		indicators: true //是否显示滚动条
	});

})(mui);

jQuery(function(){
    $(".mui-card-content ul li").css({
    	"height":$(".mui-card-content ul li").width(),
    	"lineHeight":$(".mui-card-content ul li").width()+"px"
    });

	$(".mui-content").css("height",$(document).height());
});
