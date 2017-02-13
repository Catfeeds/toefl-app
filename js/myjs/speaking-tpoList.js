jQuery(function() {

	mui(".mui-content").on("tap", "li", function() {
		mui.openWindow({
			url: "speaking-practice.html"
		})
	});
});