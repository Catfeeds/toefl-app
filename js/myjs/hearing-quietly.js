
//var playDuration=jQuery("#jquery_jplayer_1").data("jPlayer").status.duration;
var startT,endT=0;//记录句子精听的开始时间和结束时间
var playCurrent=0;//记录播放器播放的当前时间变量
jQuery(function() {

//     播放图标
    jQuery(".img_play").css("height", jQuery(".img_play").css("width"));
//    点击屏幕查看全文---div高度
    jQuery(".full_start").css("height",(jQuery(window).height()-150)+"px");
//     句子精听模块的总句子数
    jQuery("#total-sentence").html(jQuery(".simpleSentence ul li").length);
//    当前句子数量
    currentNum();
       //当句属性
     jQuery(".simpleSentence ul li").first().addClass("on");
    
    //声明模块
    var myApp = angular.module("myApp",[]);
    myApp.directive('isOver',function(){
        return {
            restrict: 'A',
            scope: {
                over: '=isOver'
            },
            link:function(scope, elm, attr){
                if(scope.$parent.$last){
                    scope.over = true;
                }
            }
        }
    });

//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http",function($scope,$http){
        $http({
            method: 'post',
            url: 'http://www.toeflonline.cn/cn/wap-api/careful-listening',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
                type:1,
                id:4447,//文章id
                num:1,
                userId:localStorage.getItem("userId")
            }
        }).success(function(data) {
            $scope.sentence=data.sentence;
            $scope.filePath=data.audio.filePath;
            $scope.catname=catname;
            $scope.title=title;
            for(var i=0;i< $scope.sentence.length;i++){
                $scope.sentence[i].endTime=parseFloat($scope.sentence[i].start_time)+parseFloat($scope.sentence[i].audio_time);
            }
        });
        $scope.toggle = {
            now:false
        };
        $scope.$watch('toggle.now',function(){
            if($scope.toggle.now){//界面的angularjs循环的元素加载完毕
                //     句子精听模块的总句子数
                $("#total-sentence").html($(".simpleSentence ul li").length);
                //    当前句子数量
                currentNum();
                //全文首句样式
                $(".full_article ul li").first().addClass("on");
                //插件控制播放
                loadAudio($scope.filePath);
                //当句属性
                $(".simpleSentence ul li").first().addClass("on");
                //听力记录跳转过来
                if(listenWrite){
                    $("#listen_w")[0].onclick();
                }
            }
        });

    }]);
    
        $(".img_play")[0].addEventListener('tap',function(){  
	        //点击响应逻辑  
	    playIcon(this);
	    });  
});

function loadAudio(src){
	  jQuery("#jquery_jplayer_1").jPlayer({
		ready: function(event) {
			$(this).jPlayer("setMedia", {
				m4a: "",
				mp3: "http://www.toeflonline.cn"+src
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
}
//切换到精听模式  听写、精听功能不同
function quietly(o){
    jQuery(o).hide().siblings(".btn_common").show();
    jQuery(".dictation").hide();
    jQuery(".listen_btn").hide();
    jQuery(".simpleSentence").show();
    jQuery(".fullText").hide();
    jQuery(".dicta_btn").show().find(".single").hide().end().find(".full").show();
    jQuery(".img_play").attr("data-mold","句子精听");
}


//======================================================================
/**
 * 句子精听模式
 */

//句子精听显示中文
function showChinese(){
    jQuery(".chinese").slideToggle();
}
//切换到单句
function toggleAll(o){
    jQuery(o).hide().siblings(".btn_common").show();
    jQuery(".simpleSentence").show();
    jQuery(".fullText").hide();
    jQuery(".full_start").show().siblings(".full_article").hide();
    jQuery("#jquery_jplayer_1").jPlayer("pause",0);
    jQuery(".img_play").attr("data-mold","句子精听");
}
//记录当前句子是第几句--句子精听
function currentNum(){
    var num=$("#current-sentence").html();
    $(".simpleSentence ul li").each(function(){
        var _num=$(this).attr("data-num");
        if(num==_num){
            $(this).show().addClass("on").siblings("li").removeClass("on").hide();
            startT=$(this).attr("data-starttime");
            endT=$(this).attr("data-endtime");
        }
    });
}
/**
 * 开始播放单句
 * @param startTime
 */
function startTimes(startTime){
    clearInterval(clearTime);//清除单句结束时的循环
    jQuery("#jquery_jplayer_1").jPlayer("play",parseFloat(startTime));
}
var clearTime='';
/**
 * 监听单句结束时间，到时间暂停播放
 * @param endTime
 */
function endTimes(endTime){

    clearTime=setInterval(function(){
        if(playCurrent>=endTime){
            clearInterval(clearTime);
            jQuery("#jquery_jplayer_1").jPlayer("pause",parseFloat(endTime));
        }
    },1000/60);
}
//======================================================================
/**
 * 全文精听模式
 */
//全文精听显示中文
function showChina(){
    jQuery(".full_article ul li span").slideToggle();
}
//切换到全文
function toggleSingle(o){
    jQuery(o).hide().siblings(".btn_common").show();
    jQuery(".simpleSentence").hide();
    jQuery(".fullText").show();
    jQuery(".img_play").attr("data-mold","全文精听");
    clearInterval(clearTime);
    jQuery("#jquery_jplayer_1").jPlayer("pause",0);
}
//点击屏幕显示全文
function clickShowA(o){
    jQuery(o).hide().siblings(".full_article").show();
}
//全文精听文章句子选中
function allSentence(){
    jQuery(".full_article ul li").each(function(){
        var _that=jQuery(this);
        var starttime=_that.attr("data-starttime");
        var endtime=_that.attr("data-endtime");
//      var playCurrent= jQuery("#jquery_jplayer_1").data("jPlayer").status.currentTime;
        if(playCurrent>=starttime && playCurrent<=endtime){
            _that.addClass("on").siblings("li").removeClass("on");
        }
    });
}

//======================================================================

/**
 * 听写模式
 */

//听写模式 查看答案后 用户答案展示样式
function userAnswerStyle(){
    jQuery(".dictation ul li.have_an").each(function(){
        var _that=jQuery(this).find("input").val();
        var _html=jQuery(this).find("input").attr("data-html");
        if(_that){
            if(_that==_html){
                jQuery(this).find(".have_bg").addClass("green");
            }else{
                jQuery(this).find(".have_bg").addClass("red");
            }
        }

    });
}
//听写模式查看答案
function seeAnswer(o){
    userAnswerStyle();
    if(jQuery(o).hasClass("on")){
        jQuery(o).removeClass("on");
        jQuery(".dicta_answer").slideUp();
    }else{
        jQuery(o).addClass("on");
        jQuery(".dicta_answer").slideDown();
    }

}
//切换到听写模式
function listenWrite(o){
	  if($(".fullText").css("display")=="block"){
        fuzhiDat(1);
    }else{
        fuzhiDat(2);
    }
    jQuery(o).hide().siblings(".btn_common").show();
    jQuery(".dictation").show();
    jQuery(".listen_btn").show();
    jQuery(".simpleSentence").hide();
    jQuery(".fullText").hide();
    jQuery(".dicta_btn").hide();
    jQuery("#jquery_jplayer_1").jPlayer("pause",0);
//    jQuery(".img_play").attr("data-mold","听写模式");
    jQuery(".img_play").attr("data-mold","句子精听");
}
//听写模式将精听的值赋给听写模式
function fuzhiDat(num){
    jQuery("#total-sen").html(jQuery("#total-sentence").html());
    if(num==1){//从全文精听切换到听写模式
        jQuery(".full_article ul li").each(function(){
            var _data=jQuery(this).hasClass("on");
            if(_data){
                jQuery("#current-sen").html(parseInt(jQuery(this).index())+1);
             
                jQuery(".dicta_answer").html(jQuery(this).find("p").first().html()).attr("data-wordId",jQuery(this).find("p").first().attr("data-wordId"));
            }
        });
    }else{//从句子精听切换到听写模式
        jQuery("#current-sen").html(jQuery("#current-sentence").html());
       jQuery(".simpleSentence ul li").each(function(){
            var _data=jQuery(this).hasClass("on");
            if(_data){
                jQuery(".dicta_answer").html(jQuery(this).find("p").first().html()).attr("data-wordId",jQuery(this).find("p").first().attr("data-wordId"));
            }
        });
    }

}
//重复播放单句--听写模式
function reloadSingle(){
   jQuery("#jquery_jplayer_1").jPlayer("play",0);
}

//======================================================================

//控制播放（区分那种模式）
function playIcon(o){
    var mold=jQuery(o).attr("data-mold");
    if(mold=="句子精听"){
        startTimes(startT);
        endTimes(endT);
    }else if(mold=="全文精听"){
        jQuery("#jquery_jplayer_1").jPlayer("play",0);
        var timer=setInterval(function(){
            var currentLi=jQuery(".full_article ul li.on");
            var starttime=currentLi.attr("data-starttime");
            var endtime=currentLi.attr("data-endtime");
//          var playCurrent= jQuery("#jquery_jplayer_1").data("jPlayer").status.currentTime;
            if(playCurrent>=starttime && playCurrent<=endtime){

            }else{
                allSentence();
                  scrollPos();
            }
        },1000/60);
    }
}
//控制文章滚动条
function scrollPos(){
    var topT=$(".full_article ul li.on")[0].offsetTop;
    $(".full_article").animate({scrollTop:topT+"px"},1000/30);
}
//播放上一句
function playPrev(){
    var mold= jQuery(".img_play").attr("data-mold");
    if(mold=="句子精听"){
        var num=parseInt(jQuery("#current-sentence").html());
        if(num>1){
            jQuery("#current-sentence").html(num-1);
            currentNum();
            jQuery("#jquery_jplayer_1").jPlayer("play",parseFloat(startT));
            clearInterval(clearTime);
            //    这句播放结束时暂停
            endTimes(endT);
//        切换句子是隐藏中文翻译
            jQuery(".chinese").hide();
            jQuery(".dicta_answer").hide();
            jQuery(".dictation_eyes").removeClass("on");
            fuzhiDat();
        }else{
            alert("当前句是首句！");
            return false;
        }
    }else if(mold=="全文精听"){
         var currentLi=jQuery(".full_article ul li.on");
         var num_full=currentLi.attr("data-num");
        if(num_full>1){
            var sta=currentLi.prev("li").attr("data-starttime");
           currentLi.prev("li").addClass("on").siblings("li").removeClass("on");
            jQuery("#jquery_jplayer_1").jPlayer("play",parseFloat(sta));
        }else{
            alert("当前句是首句！");
            return false;
        }

    }

}
//播放下一句
function playNext(){
    var mold= jQuery(".img_play").attr("data-mold");
    clearInterval(clearTime);
    if(mold=="句子精听"){
        var num=parseInt(jQuery("#current-sentence").html());
        var totalNum=parseInt(jQuery("#total-sentence").html());
        if(num<totalNum){
            jQuery("#current-sentence").html(num+1);
            currentNum();
            jQuery("#jquery_jplayer_1").jPlayer("play",parseFloat(startT));
            //    这句播放结束时暂停
            endTimes(endT);
            //        切换句子是隐藏中文翻译
            jQuery(".chinese").hide();
            jQuery(".dicta_answer").hide();
            jQuery(".dictation_eyes").removeClass("on");
            fuzhiDat();
        }else{
            alert("当前句是尾句！");
            return false;
        }
    }else if(mold=="全文精听"){
        var currentLi=jQuery(".full_article ul li.on");
        var num_full=currentLi.attr("data-num");
        if(num_full<jQuery(".full_article ul li").length){
            var sta=currentLi.next("li").attr("data-starttime");
            currentLi.next("li").addClass("on").siblings("li").removeClass("on");
            jQuery("#jquery_jplayer_1").jPlayer("play",parseFloat(sta))
        }else{
            alert("当前句是尾句！");
            return false;
        }
    }
}