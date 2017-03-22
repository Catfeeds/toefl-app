jQuery(function() {

	//声明模块
	var myApp = angular.module("myApp", []);
	myApp.directive('isOver', function() {
		return {
			restrict: 'A',
			scope: {
				over: '=isOver'
			},
			link: function(scope, elm, attr) {
				if(scope.$parent.$last) {
					scope.over = true;
				}
			}
		}
	});
	//通过模块生成调用控制器
	myApp.controller("PriceCtrl", ["$scope", "$http", "$sce", function($scope, $http, $sce) {

		$scope.toggle = {
			now: false
		};
		$scope.$watch('toggle.now', function() {
			if($scope.toggle.now) { //界面的angularjs循环的元素加载完毕

			}
		});
		mui.plusReady(function() {
			var self = plus.webview.currentWebview();
			var articleId = self.articleId;
			$http({
				method: 'post',
				url: 'http://www.toeflonline.cn/cn/wap-api/listen-question',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					id: articleId,
					userId: localStorage.getItem("userId")
				}
			}).success(function(data) {
				$scope.name = data.question.name;
				$scope.questSelect = data.question.questSelect.split("\n");
				$scope.trueAnswer = data.question.answer;
				$scope.over = data.over;
				$scope.totalNum=data.count;
				$scope.nextId = data.nextId;
				$scope.pid = data.article.id;
				$scope.contentId = data.question.id;
				$scope.questType = data.question.questType;

				//二级音频
				if(data.question.fileAdd) {
					//			最后一题的题干二级音频
					jQuery("#jquery_jplayer_1").jPlayer({
						ready: function(event) {
							$(this).jPlayer("setMedia", {
								m4a: "",
								mp3: "http://www.toeflonline.cn" + data.question.fileAdd
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
					jQuery("#jp_container_1").css("display", "block");
				}
				var str = new Array(); //定义一数组
				str = $scope.questSelect;
				if($scope.questType == 1) { //表格题型
					$(".table-box").show().siblings("div").hide();
					//$(".option_box").hide();
					$scope.nameOne = str[0].split(",")[0];
					$scope.nameTwo = str[0].split(",")[1];
					$scope.arrSelect1 = str;
				} else if($scope.questType == 2) { //拖拽题型
					$(".three_tragT").show().siblings("div").hide();
					$scope.arrSelect = str;
				} else {
					$scope.arrSelect = str;
					if($scope.trueAnswer.length > 1) {
						$(".mui-card").show().siblings().hide();
					} else {
						$(".mui-card").show().siblings().hide();
					}
				}
				//			单选、复选选择样式
				mui(".mui-table-view").on("tap", ".mui-table-view-cell", function() {

					if($scope.trueAnswer.length > 1) { //复选框题型
						if(jQuery(this).hasClass("li-orange")) {
							jQuery(this).removeClass("li-orange");
						} else {
							jQuery(this).addClass("li-orange");
						}

					} else {
						jQuery(this).addClass("li-orange").siblings("li").removeClass("li-orange");
					}

				});
				//拖拽插件
				$('.gridly').gridly({
					base: 0, // px
					gutter: 20, // px
					columns: 1,
					callbacks: {
						//reordered: reordered//拖拽完成之后的回调
					}
				});

				//点击下一题 听力做完后显示完成 跳转到听力首页
				jQuery("#next")[0].addEventListener("tap", function() {
					var questType = $scope.questType;
					var inputC = '';
					if(questType == 1) { //表格题型
						$(".table-box input:checked").each(function() {
							inputC += $(this).attr("data-tabAn");
						});
					} else if(questType == 2) { //拖拽题型
						var answerU = reordered();
						inputC = answerU.join(""); //数组转换为字符串（用户答案）
					} else {
						if($scope.trueAnswer.length > 1) { //复选框题型
							var inputs = jQuery(".mui-table-view-cell.li-orange");
							inputs.each(function() {
								inputC += jQuery(this).find(".mui-media-object").html();
							});

						} else {
							//						单选
							inputC = jQuery(".mui-table-view-cell.li-orange").find(".mui-media-object").html();

						}

					}
					if(inputC) {
						//保存用户答案
						saveUserAnswer(inputC, $scope.nextId);
					} else {
						if($scope.nextId == 0) {
							mui.openWindow({
									id: "hearing-answerKeys",
									url: "hearing-answerKeys.html",
									extras: {
										articleId: articleId
									}
								})
								//                      $(".next_topic a").attr("href","listenIndex.html?page=1&category=39").html("完成");
						} else {
							//                      $(".next_topic a").attr("href","listen_practice.html?id="+$scope.nextId);
							mui.openWindow({
								id: "hearing-pra-test-" + $scope.nextId,
								url: "hearing-pra-test.html",
								extras: {
									articleId: $scope.nextId
								}
							});

						}
					}
				});

			});
		});
	}]);
	//	将数字0123转化为字母ABCD
	myApp.filter('optionsAll', function() {
		return function(r) {
			return String.fromCharCode(65 + r);
		}
	});

})

//保存答案
function saveUserAnswer(answerUser, nextId) {
	var contentId = $("#contentId").val();
	var pid = $("#pid").val();
	var time = $("#time").val();
	var userId = localStorage.getItem("userId");
	$.ajax({
		type: "post",
		url: "http://www.toeflonline.cn/cn/wap-api/check-answer?contentId=" + contentId + "&answer=" + answerUser + "&pid=" + pid +
			"&belong=practise&userId=" + userId + "&elapsedTime=" + time + "&username=" + localStorage.getItem('userName'),
		dataType: "jsonp",
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
		jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
		success: function(data) {
			if(data.code == 2) {
				//用户未登录            
				mui.openWindow({
					url: "login.html"
				})
			} else if(data.code == 1) {
				//用户答案正确
				//下一题跳转
				if(nextId == 0) {

					mui.openWindow({
						id: "hearing-answerKeys",
						url: "hearing-answerKeys.html",
						extras: {
							articleId: pid
						}
					})
				} else {

					mui.openWindow({
						id: "hearing-pra-test-" + nextId,
						url: "hearing-pra-test.html",
						extras: {
							articleId: nextId
						}

					})
				}
			} else if(data.code == 0) {
				//用户答案错误
				//下一题跳转
				if(nextId == 0) {

					mui.openWindow({
						id: "hearing-answerKeys",
						url: "hearing-answerKeys.html",
						extras: {
							articleId: pid
						}
					})
				} else {

					mui.openWindow({
						id: "hearing-pra-test-" + nextId,
						url: "hearing-pra-test.html",

						extras: {
							articleId: nextId
						}
					})
				}
			}

		},
		error: function() {
			alert('fail');
		}
	});

}

//拖拽完成之后
function reordered() {
	var obj01 = $(".three_tragT .brick");
	var arr = [];
	var arr02 = [];
	var arrSorted;
	var newObg = new Object();
	obj01.each(function() {
		var i = $(this).index() + 1;
		newObg.top = parseFloat($(".three_tragT .brick").eq(i - 1).css("top"));
		newObg.value = convert(i);
		arr.push(newObg.top);
		arr02.push(newObg.value);
	});
	arrSorted = bubbleSort(arr, arr02);
	return arrSorted;
}
//冒泡排序
function bubbleSort(arr, arr02) {
	var i = arr.length,
		j;
	var tempExchangVal;
	var zimu = '';
	while(i > 0) {
		for(j = 0; j < i - 1; j++) {
			if(arr[j] > arr[j + 1]) {
				tempExchangVal = arr[j];
				zimu = arr02[j];
				arr[j] = arr[j + 1];
				arr02[j] = arr02[j + 1];
				arr[j + 1] = tempExchangVal;
				arr02[j + 1] = zimu;
			}
		}
		i--;
	}
	return arr02;
}