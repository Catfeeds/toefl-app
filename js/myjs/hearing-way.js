jQuery(function() {
	jQuery(".first")[0].addEventListener('tap', function() {
		styleOn(this);
	});
	jQuery(".last")[0].addEventListener('tap', function() {
		styleOn(this);
	});

	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		var catName = self.catName;
		var title = self.title;
		var articleId = self.articleId;
		jQuery("#wayTitle").html(catName + "-" + title);
		//		开始练习
		$("#startBtn")[0].addEventListener("tap", function() {
			if($(".first").hasClass("mui-btn-success")) {
//				closeme();
				mui.openWindow({
					url: 'hearing-quietly.html',
					extras: {
						catName: catName,
						title: title,
						articleId: articleId
					}
				});
			} else {
//				closeme();
				mui.openWindow({
					url:'hearing-practice.html',
					extras: {
						articleId:articleId
					}
				});
			}
		});

	});

});

function styleOn(o) {
	if(jQuery(o).hasClass("mui-btn-success")) {
		jQuery(o).removeClass("mui-btn-success");

	} else {
		jQuery(o).addClass("mui-btn-success");
	}
	jQuery(o).siblings("button").removeClass("mui-btn-success");
}