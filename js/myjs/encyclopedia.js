jQuery(function() {
	//				底部导航跳转
	mui.plusReady(function() {
		if(plus.webview.getWebviewById('index.html')) {
			sessionStorage.setItem("flag", "true");
			plus.webview.getWebviewById('index.html').close();
		} else if(plus.webview.getWebviewById('course.html')) {
			plus.webview.getWebviewById('course.html').close();
		} else if(plus.webview.getWebviewById('personalCenter.html')) {
			plus.webview.getWebviewById('personalCenter.html').close();
		}
	});
	jumpPage("#fixed-1", "index.html");
	jumpPage("#fixed-2", "course.html");
	jumpPage("#fixed-3", "encyclopedia.html");
	jumpPage("#fixed-4", "personalCenter.html");

	mui(".mui-content").on("tap", ".click-detail", function() {
		var ids = jQuery(this).attr("data-id");
		mui.openWindow({
			id: "encyclopedia-details",
			url: "encyclopedia-details.html",
			extras: {
				ids: ids
			}
		})
	});

});
mui.init({
	pullRefresh: {
		container: '#pullrefresh',
		up: {
			contentrefresh: '正在加载...',
			callback: pullupRefresh,
			auto: true //默认执行一次
		}
	}
});

var count = 5;
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	setTimeout(function() {
		jQuery.ajax({
			type: "post",
			url: 'http://www.toeflonline.cn/cn/app-api/reference-page',

			dataType: "json",
			data: {
				catId: 137,
				pageSize: count,
				page: 1

			},
			success: function(data) {
				count += 5;
				mui('#pullrefresh').pullRefresh().endPullupToRefresh((count > data.count)); //参数为true代表没有更多数据了。
				var table = document.body.querySelector('.mui-table-view');
				var cells = document.body.querySelectorAll('.mui-table-view-cell');
				var imgStr = '';
				table.innerHTML = "";
				for(var i = 0; i < data.data.length; i++) {
					if(data.data[i].image) {
						imgStr = "http://www.toeflonline.cn" + data.data[i].image;
					} else {
						imgStr = 'images/myimages/place.jpg';
					}
					var li = document.createElement('li');
					li.className = 'mui-table-view-cell';
					li.innerHTML = '<div class="mui-row click-detail" data-id="' + data.data[i].id + '">' +
						'<div class="mui-col-sm-4 mui-col-xs-4">' +
						'<img src="' + imgStr + '" />' +
						'</div>' +
						'<div class="mui-col-sm-8 mui-col-xs-8">' +
						'<div style="width: 95%;">' +
						'<div class="mui-ellipsis">' + data.data[i].name + '</div>' +
						'<p>发布于' + formatDate(data.data[i].createTime) +
						' <span style="float: right;"><img src="images/myimages/Toeflxiaoxi@2x.png" width="20px"/>' +
						data.data[i].viewCount + '</span></p>' +
						'</div>' +
						'</div>' +
						'<div class="mui-clearfix"></div>' +
						'</div>';;
					table.appendChild(li);
				}
			}
		});
	}, 1500);
}
//mui的无传值跳转页面方式
function jumpPage(obj, urlStr) {
	var webview_style = {
		popGesture: "close"
	};
	jQuery(obj)[0].addEventListener("tap", function() {
		mui.openWindow({
			id: urlStr,
			url: urlStr,
			styles: webview_style,
			waiting: {
				autoShow: false
			}
		});
	});
	
	
}
//时间戳转换 为时间
function formatDate(now) {
	var now = new Date(now * 1000);
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var date = now.getDate();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	return year + "-" + fixZero(month, 2) + "-" + fixZero(date, 2) + "  " ;
//	+ fixZero(hour, 2) + ":" + fixZero(minute, 2) + ":" + fixZero(second, 2);
}
//时间如果为单位数补0  
function fixZero(num, length) {
	var str = "" + num;
	var len = str.length;
	var s = "";
	for(var i = length; i-- > len;) {
		s += "0";
	}
	return s + str;
}