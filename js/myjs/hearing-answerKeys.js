$(document).ready(function() {

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
		toggleDuration: true,
		timeupdate: function(event) {
//          playCurrent=event.jPlayer.status.currentTime;//获得当前时间
  //          playDuration=event.jPlayer.status.duration;//获得当前时间
        }
	});
	//		$(id).data("jPlayer").status.currentTime;
	$(".mui-control-item").each(function() {
		$(this).find("span").css("width", $(this).height());
	});
	

});