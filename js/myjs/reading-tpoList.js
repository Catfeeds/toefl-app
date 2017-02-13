jQuery(function() {
	//    标题tpo01
	TouchSlide({slideCell: "#slidePop",effect: "leftLoop"});
	mui.init({
		pullRefresh: {
			container: "#tpo-content", //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
			up: {
				height: 50, //可选.默认50.触发上拉加载拖动距离
				auto: false, //可选,默认false.自动上拉加载一次
				contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
				contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
				callback: tpoPullfreshFun //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
			}
		}
	});

	
});


function tpoPullfreshFun() {
	var strTpo = '<li>' +
	'<div class="left-img">' + 
	'<a href="#">' + 
	'<img src="images/myimages/reading-tpo.png" alt="tpo" />' + 
	'</a>' + 
	'</div>' + 
	'<div class="right-info">' + 
	'<h2>pullfresh</h2>' + 
	'<p>144人在练习</p>' + 
	'<button type="button" class="mui-btn mui-btn-warning orangeBg">GO</button>' + 
	'</div>' + 
	'<div class="mui-clearfix"></div>' + 
	'</li>';
	$("#tpo-content ul").append(strTpo);
    this.endPullupToRefresh(true);
//  切换选项卡后重置上拉加载
//mui('#pullup-container').pullRefresh().refresh(true);
}