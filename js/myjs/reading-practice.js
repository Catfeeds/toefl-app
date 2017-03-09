jQuery(function() {
	countTime();
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
	//	将数字0123转化为字母ABCD
	myApp.filter('optionsAll', function() {
		return function(r) {
			return String.fromCharCode(65 + r);
		}
	});
	myApp.filter('trustHtml', function($sce) {
		return function(input) {
			return $sce.trustAsHtml(input);
		}
	});
	//通过模块生成调用控制器
	myApp.controller("PriceCtrl", ["$scope", "$http", "$sce", function($scope, $http, $sce) {
		$scope.toggle = {
			now: false
		};
		$scope.$watch('toggle.now', function() {
			if($scope.toggle.now) { //界面的angularjs循环的元素加载完毕	
				markWord();
				jQuery("#seeArticle")[0].addEventListener("tap", function() {

					if(jQuery(this).hasClass("qubie")) {
						jQuery(".article-tpo").animate({
							"height": jQuery(".in-box").height()
						});
						jQuery(this).removeClass("qubie");
					} else {
						jQuery(this).addClass("qubie");
						jQuery(".article-tpo").animate({
							"height": 150
						});

					}

				});
			}
		});
		mui.plusReady(function() {
			var self = plus.webview.currentWebview();
			var ids = self.ids;
			var name = self.name;
			var title = self.title;
			$http({
				method: 'post',
				url: 'http://www.toeflonline.cn/cn/wap-api/read-details',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					id: ids,
					userId: localStorage.getItem("userId")
				}
			}).success(function(data) {
				$scope.code = data.code;
				$scope.title = name + "-" + title;
				if($scope.code == 2) {
					//					closeme();
					mui.openWindow({
						id: "reading-result.html",
						url: "reading-result.html",
						extras: {
							testId: ids,
							name: name,
							title: title,
							readName: "readTpo"
						}
					});
					//				location.href = "readResult.html?id=" + id + "&titleName=" + catName + "&readName=" + readName;
				}
				$scope.catName = data.data.article.catName;
				$scope.name = data.data.article.name;
				$scope.question = $sce.trustAsHtml(data.data.article.question);
				$scope.article = $sce.trustAsHtml(data.data.article.article);
				$scope.articleId = data.data.article.id;
				$scope.questionTi = $sce.trustAsHtml(data.data.question.question);
				$scope.answerA = data.data.question.answerA;
				$scope.answer = data.data.question.answer;
				$scope.nameq = data.data.question.name;
				$scope.nextId = data.data.nextId;
				$scope.pid = data.data.question.pid;
				$scope.contentId = data.data.contentId;
				$scope.questionType = data.data.question.questionType;
				$scope.titleNum = data.data.question.title;
				$scope.count = data.data.count;
				$scope.postionD = data.data.question.postionD.split("\n");
				$scope.postionW = data.data.question.postionW.split("\n");
				var str = new Array(); //定义一数组
				str = $scope.answerA.split("\n"); //字符分割
				$scope.arrSelect = str;
				if($scope.questionType == 6) { //特殊题型（点击选择答案）
					$(".option_box").hide();
					$(".black_line").show();

				} else if($scope.questionType == 4) { //14题 拖拽题型（有些答案字符里面有两个换行 需要后台删除一个）
					$(".option_box").hide();
					$(".trag_test").show();

				}
				if(data.data.question.answerB) {
					$scope.answerB = data.data.question.answerB;
				}
				//			用户选择答案样式
				mui(".mui-table-view").on("tap", ".mui-table-view-cell", function() {
					jQuery(this).addClass("li-orange").siblings("li").removeClass("li-orange");

				});

			});

			$scope.readNext = function() {

				//					点击下一题保存答案
				var o = "#showAnswer";
				var trueAn = $(o).attr("data-trueAn");
				var strA = '',userAn03='',
					userAn02 = $("#userAnswer").val();
				var types = $("#types").val();
				if(types == 6) { //特殊题型（点击选择答案）
					if(userAn02) {
						savaRead(userAn02, o);
					}
				} else if(types == 4) {					
					$(".write_an .col-xs-4").each(function() {
						userAn03 += $(this).find("input").val();
					});
					if(userAn03) {
						savaRead(userAn03, o);
					}
				} else {
					if($(".mui-table-view-cell").hasClass("li-orange")) {
						strA = $(".mui-table-view-cell.li-orange").find(".mui-media-object").html();
						savaRead(strA, o);
					}
				}
				if($scope.nextId == 0) {				
						//						closeme();
						mui.openWindow({
							id: "reading-result.html",
							url: "reading-result.html",
							extras: {
								testId: ids,
								name: name,
								title: title,
								readName: "readTpo"
							}
						});
		
				} else {
					//					closeme();
					mui.openWindow({
						id: "reading-practice-" + $scope.nextId,
						url: "reading-practice.html",
						extras: {
							ids: $scope.nextId,
							name: name,
							title: title
						}
					});

				}
			}
		});
		jQuery("#showAnswer")[0].addEventListener("tap", function() {
			showAnBtn(this);
		});
	}]);

});

//显示答案
function showAnBtn(o) {
	var trueAn = $(o).attr("data-trueAn");
	var inputId = $(".option_box ul li input:checked").attr("id");
	var strA = '',
		userAn02 = $("#userAnswer").val(),
		userAn03 = '';
	var types = $("#types").val();
	if(types == 6) { //特殊题型（点击选择答案）
		if(userAn02) {
			jQuery(o).attr("disabled", true);
			savaRead(userAn02, o);
			$(".black_line p").show();
		} else {
			alert("请选择答案！");
		}
	} else if(types == 4) { //拖拽题型
		jQuery(o).attr("disabled", true);
		$(".write_an .col-xs-4").each(function() {
			userAn03 += $(this).find("input").val();
		});
		if(userAn03) {
			jQuery(o).attr("disabled", true);
			savaRead(userAn03, o);
			$(".trag_test p").show();
		} else {
			alert("请选择答案！");
		}
	} else {
		if($(".mui-table-view-cell").hasClass("li-orange")) {
			jQuery(o).attr("disabled", true);
			strA = $(".mui-table-view-cell.li-orange").find(".mui-media-object").html();
			//判断答案是否正确，添加不同的样式
			if(strA == trueAn) {
				$(".mui-table-view-cell.li-orange").addClass("li-green").removeClass("li-orange");
			} else {
				$(".mui-table-view-cell.li-orange").addClass("li-red").removeClass("li-orange");
				if(trueAn == 'A') {
					$(".mui-table-view-cell").eq(0).addClass("li-green");
				} else if(trueAn == 'B') {
					$(".mui-table-view-cell").eq(1).addClass("li-green");
				} else if(trueAn == 'C') {
					$(".mui-table-view-cell").eq(2).addClass("li-green");
				} else if(trueAn == 'D') {
					$(".mui-table-view-cell").eq(3).addClass("li-green");
				}
			}
			savaRead(strA, o);
		} else {
			alert("请先选择答案！");
		}
	}

}

/**
 * 标记段落和单词
 */
function markWord() {
	var types = $("#types").val();
	var parents = $('.article-tpo');
	var ls, lstwo = '';
	if(types == 1) {
		var paragraphs01 = document.getElementsByClassName('paragraph');
		var words01 = document.getElementsByClassName('words');

		parents.removeHighlight();
		if(paragraphs01[0].innerHTML == '') {
			parents.highlight(words01[0].innerHTML, 'highlight');
		} else {
			for(var i = 0; i < paragraphs01.length; i++) {
				if(paragraphs01[i].innerHTML) {
					ls = paragraphs01[i].innerHTML.replace(/\&nbsp;/g, " ");
					parents.highlight(ls, 'nullHigh');
					var nullSpan = document.getElementsByClassName("nullHigh");
					if(words01[i].innerHTML) {
						$(nullSpan[i]).highlight(words01[i].innerHTML, 'highlight');
					} else {
						return false;
					}
				} else {
					return false;
				}
			}
		}
		if($(".highlight")[0].innerHTML) {
			parents.animate({
				scrollTop: $(".highlight")[0].offsetTop - 80
			}, 1000);
		}

	} else if(types == 2 || types == 5) {
		var paragraphs02 = document.getElementsByClassName('paragraph');
		var arr = [];
		parents.removeHighlight();
		if(paragraphs02[0].innerHTML) {
			for(var i = 0; i < paragraphs02.length; i++) {
				lstwo = paragraphs02[i].innerHTML.replace(/\&nbsp;/g, " ");
				chooseP(lstwo, parents, i, arr[i]);
			}
		} else if(paragraphs02[0].innerHTML == '') {
			return false;
		}
	} else if(types == 3) {
		var paragraphs03 = document.getElementsByClassName('paragraph');
		var words03 = document.getElementsByClassName('words');
		parents.removeHighlight();
		for(var jz = 0; jz < paragraphs03.length; jz++) {
			var paHtml = paragraphs03[jz].innerHTML.replace(/\&nbsp;/g, " ");
			parents.highlight(paHtml, 'nullHigh');
			if(words03[jz]) {
				if(words03[jz].innerHTML) {
					var wordHtml = words03[jz].innerHTML.replace(/\&nbsp;/g, " ");
					$(".nullHigh").highlight(wordHtml, 'highlight');
					parents.animate({
						scrollTop: $(".highlight")[0].offsetTop - 80
					}, 1000);
				}
			} else {
				var bnode = document.createElement('b');
				$("span.nullHigh").prev("br").after(bnode);
				bnode.className = "highlight02";
				parents.animate({
					scrollTop: $(".highlight02")[0].offsetTop - 80
				}, 1000);
			}
		}

	} else if(types == 6) { //插入题型(插入到尾部)
		specialMarks('after');
	} else if(types == 9) { //插入题型(插入到头部)
		specialMarks('before');
	}
}

//选中段落
function chooseP(paragraphs, parents, num, strN) {
	//如果被选中的句子当前段落没有p标签就添加一个节点来增加样式
	strN = document.createElement('b');
	var after = paragraphs;
	parents.highlight(after, 'nullHigh');
	$("span.nullHigh").prepend(strN);
	$("span.nullHigh").find("b:first-child").addClass("highlight02").siblings("b").removeClass("highlight02");
	//如果被选中的句子当前段落有p标签
	if(!$("span.nullHigh").eq(num).prev("br")) {
		$("span.nullHigh").eq(num).parent("p").addClass("highlight02");
	}
	if($(".highlight02")[0]) {
		parents.animate({
			scrollTop: $(".highlight02")[0].offsetTop - 90
		}, 1000);
	}

}
/**
 * 特殊题型插入题标记，点击展示答案
 */
function specialMarks(str) {
	var parents = $('.article-tpo');
	var sentences = document.getElementsByClassName('insertContent');
	var spanNs = '';
	var answers = $("#answers").val();
	var spanBg01 = '',
		spcuserA = '';
	var arr = [];
	parents.removeHighlight();
	for(var i = 0; i < sentences.length; i++) {
		arr[i] = $.trim(sentences[i].innerHTML).replace(/\&nbsp;/g, " ");
		if(arr[i]) {
			if($(sentences).eq(i).attr("data-value") == 'zimu0') {
				spcuserA = "A";
			} else if($(sentences).eq(i).attr("data-value") == 'zimu1') {
				spcuserA = "B";
			} else if($(sentences).eq(i).attr("data-value") == 'zimu2') {
				spcuserA = "C";
			} else if($(sentences).eq(i).attr("data-value") == 'zimu3') {
				spcuserA = "D";
			}
			insertAnswer(spanNs, answers, parents, arr[i], "sent0" + (i + 1), spanBg01, spcuserA, str);
		} else {
			return false;
		}
	}
	if($(".specialHigh02")[0]) {
		parents.animate({
			scrollTop: $(".specialHigh02")[0].offsetTop - 90
		}, 1000);
	}

}
//插入答案
function insertAnswer(spanNode, answers, parents, sentences, ids, spanBG, abcd, str) {
	spanNode = document.createElement('b');
	spanBG = document.createElement('span');
	spanNode.innerHTML = answers;
	spanNode.style.marginLeft = "5px";
	spanNode.style.display = "none";
	spanBG.className = 'specialHigh02';
	spanBG.id = abcd;
	parents.highlight(sentences, 'specialHigh', ids);
	if(str == 'before') {
		spanBG.style.marginRight = "5px";
		$(spanNode).insertBefore($("#" + ids));
	} else { //after
		spanBG.style.marginLeft = "5px";
		$(spanNode).insertAfter($("#" + ids));
	}
	$(spanBG).insertBefore($(spanNode));
	$(spanBG).bind("click", clickBlock);
}

function clickBlock() {
	$(this).hide().next("b").show().siblings("b").hide().prev("span").show();
	$("#userAnswer").val($(this).attr("id"));
}
//阅读保存答案
function savaRead(answer, o) {
	var readName = 'readTpo'; //og还是tpo题目
	var questionType = $("#types").val();
	var pid = $("#pid").val();
	var contentId = $("#contentId").val();
	var trueAnswer = $("#showAnswer").attr("data-trueAn");
	var time = $("#time").val();
	$.ajax({
		type: "post",
		url: "http://www.toeflonline.cn/cn/wap-api/save-read?questionType=" + questionType + "&pid=" + pid +
			"&contentId=" + contentId + "&answer=" + answer + "&belong=" + readName + "&trueAnswer=" + trueAnswer + "&time=" + time + "&userId=" +
			localStorage.getItem('userId'),
		dataType: "jsonp",
		jsonp: "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
		jsonpCallback: "success_jsonpCallback", //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
		success: function(data) {
			if(data.code == 1) {
				//保存成功

			} else if(data.code == 2) {
				mui.openWindow({
					id: "login",
					url: "login.html"
				})

			}
		},
		error: function() {
			alert('fail');
		}
	});
}
//每道题做题时间
function countTime() {
	var time = parseInt($("#time").val());
	setInterval(function() {
		time++;
		$("#time").val(time);
	}, 1000);
}