jQuery(function() {
	jQuery(".first")[0].addEventListener('tap', function() {
		styleOn(this);
	});
	jQuery(".last")[0].addEventListener('tap', function() {
		styleOn(this);
	});
	$("#startBtn")[0].addEventListener("tap",function(){
		if($(".first").hasClass("mui-btn-success")){
		  mui.openWindow('hearing-quietly.html');
		}else{
		  mui.openWindow('hearing-practice.html');
		}
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