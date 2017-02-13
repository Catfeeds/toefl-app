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

	//	点击发表
	mui.init({
		preloadPages: [{ //预加载目标页面  
			url: 'encyclopedia-bbs.html',
			id: 'encyclopedia-bbs.html'
		}]
	});
	var Page = null;
	jQuery("#pushBtn")[0].addEventListener("tap", function() {
		if(jQuery(".push-btn").hasClass("on")) {
			var id = this.getAttribute('data-id');
			var title = jQuery(".title-input input").val();
			var content = jQuery(".content-text textarea").val();
			var groups = jQuery(".img-group ul").html();
			if(!Page) {
				Page = plus.webview.getWebviewById('encyclopedia-bbs.html');
			}
			mui.fire(Page, 'show', {
				title: title,
				content: content,
				groups: groups
			});
			mui.openWindow({ //目标页面  
				id: 'encyclopedia-bbs.html'
			});
//			解决mui.openWindow不跳转问题
			plus.webview.currentWebview().hide();
			plus.webview.open('encyclopedia-bbs.html', 'encyclopedia-bbs.html');

		}

	});

	//             插入图片
	jQuery(".add-icon input").change(function() {
		var fileVal = $(this).val();
		filepath = fileVal;
		var extStart = filepath.lastIndexOf(".");
		var ext = filepath.substring(extStart, filepath.length).toUpperCase();
		//        判断文件是不是图片
		if(ext != ".BMP" && ext != ".PNG" && ext != ".GIF" && ext != ".JPG" && ext != ".JPEG") {
			alert("图片限于png,gif,jpeg,jpg格式");
		} else {
			var objUrl = getObjectURL(this.files[0]); //本地路径转换为本地Url;
			if(objUrl) {
				//                本地预览
				var str = '<li><div class="closeBlack"><span class="mui-icon mui-icon-closeempty"></span></div><img src="' + objUrl + '"/></li>';
				jQuery(str).prependTo(jQuery(".img-group ul"));
			}
		}
	});
	//	点击叉叉删除图片
	mui(".img-group").on("tap", ".closeBlack", function() {
		jQuery(this).parents("li").remove();
	});

});

