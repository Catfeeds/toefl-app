jQuery(function() {
	TouchSlide({
		slideCell: "#answer_b"
	});
	jQuery(".user_head").css("height", jQuery(".user_head").css("width"));
	loadAudio("#audioBox_jplayer", "#audioBox_container");
	loadAudio("#audioBox_jplayer_1", "#audioBox_container_1");
	loadAudio("#jquery_jplayer_que", "#jp_container_que");
	//  heightCircle(".play_BG");
	//  heightCircle(".pause_BG");
	//  heightCircle(".play_recordBG");
	jQuery(".closeIcon")[0].addEventListener("tap", closeSpeak);

});
//初始化音频
function loadAudio(jplayer, container) {
	jQuery(jplayer).jPlayer({
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
		cssSelectorAncestor: container,
		play: function() {
			$(this).jPlayer("pauseOthers"); // pause all players except this one.
		}
	});

}
//计算图标高度
function heightCircle(obj) {
	var allW = jQuery(".startAnswer").width();
	var hei = allW * 0.2;
	jQuery(obj).css("height", hei + "px");
}
//开始录音
function startRecords() {
	jQuery(".play_BG").hide();
	jQuery(".pause_BG").show();
	G_media.startRecording();
}
//停止录音
function pauseRecords() {
	jQuery(".pause_BG").hide();
	jQuery(".record-btn").hide();
	jQuery(".play_recordBG").show();
	jQuery("#record_c").show();
	G_media.stopRecordings();
}
//取消保存录音
function quXiaoRecord() {
	jQuery(".play_BG").show();
	jQuery(".record-btn").show();
	jQuery(".play_recordBG").hide();
	jQuery("#record_c").hide();
}
//开始做题
function startZT() {
	jQuery(".startAnswer").show();
	jQuery(".fixed_bot").hide();
	if(jQuery("#firstS").css("display") == "block") {
		jQuery("body").css("paddingBottom", jQuery("#firstS").css("height"));
	} else {
		jQuery("body").css("paddingBottom", jQuery(".startAnswer").css("height"));
	}
}
//关闭app下载弹窗
function closeSpeak() {
	$(".speak_record").hide();
}