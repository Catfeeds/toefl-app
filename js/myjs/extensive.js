jQuery(function() {
	jQuery("#jquery_jplayer_1").jPlayer({
		ready: function(event) {
			$(this).jPlayer("setMedia", {
				m4a: "",
				mp3: "audio.mp3"
			});
		},
		swfPath: "../../js",
		supplied: "m4a, oga,mp3",
		wmode: "window",
		useStateClassSkin: true,
		toggleDuration: true
	});
	$(".wc-btn")[0].addEventListener('tap', function() {
		//		展示中文
		showChina();
	});
	$(".jp-controls")[0].addEventListener('tap', function() {
		//		//点击响应逻辑  
		playS();
	});
});

//显示中文
function showChina() {
	jQuery(".article ul li span").slideToggle();
}

//$(document).ready(function() {
//
//	var id = "#jquery_jplayer_1";
//
//	var bubble = {
//		title: "Bubble",
//		m4a: "http://www.jplayer.org/audio/m4a/Miaow-07-Bubble.m4a",
//		oga: "http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
//	};
//
//	var options = {
//		swfPath: "js/myjs",
//		supplied: "mp3,oga",
//		wmode: "window",
//		useStateClassSkin: true
//	};
//
//	var myAndroidFix = new jPlayerAndroidFix(id, bubble, options);
//	//		$(id).data("jPlayer").status.currentTime;
//
//	$(".wc-btn")[0].addEventListener('tap', function() {
//		//点击响应逻辑  
//		showChina();
//	});
//	$(".jp-controls")[0].addEventListener('tap', function() {
//		//点击响应逻辑  
//		playS();
//	});
//
//});
//]]>

//文章句子选中
function allSentence() {
	$(".article ul li").each(function() {
		var _that = $(this);
		var playCurrent = $("#jquery_jplayer_1").data("jPlayer").status.currentTime;
		var starttime = _that.attr("data-starttime");
		var endtime = _that.attr("data-endtime");
		if(playCurrent >= starttime && playCurrent <= endtime) {
			_that.addClass("on").siblings("li").removeClass("on");
		}
	});
}

function playS() {
	var timer = setInterval(function() {
		var currentLi = $(".article ul li.on");
		var starttime = currentLi.attr("data-starttime");
		var endtime = currentLi.attr("data-endtime");
		var playCurrent = $("#jquery_jplayer_1").data("jPlayer").status.currentTime;
		if(playCurrent >= starttime && playCurrent <= endtime) {

		} else {
			allSentence();
		}
	}, 1000 / 60);
}