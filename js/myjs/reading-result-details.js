jQuery(function() {
	//    标题tpo01
	TouchSlide({
		slideCell: "#slidePop",
		effect: "leftLoop"
	});

	jQuery(".slideBd ul li").each(function() {
		jQuery(this).find("a").css({
			"height": jQuery(this).find('a').width(),
			"lineHeight": jQuery(this).find('a').width() + "px"
		});
	});

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
	myApp.filter('trustHtml', function($sce) {
		return function(input) {
			return $sce.trustAsHtml(input);
		}
	});
	myApp.filter('optionsAll', function() {
		return function(input) {
			return $.trim(input).split("\n");
		}
	});
	myApp.filter('options', function() {
		return function(input) {
			return input.substring(0, 1);
		}
	});
	myApp.filter('selectLabel', function() {
		return function(input) {
			return input.substring(2, input.length);
		}
	});
	//通过模块生成调用控制器
	myApp.controller("PriceCtrl", ["$scope", "$http", "$sce", function($scope, $http, $sce) {
		$scope.toggle = {
			now: false
		};
		$scope.$watch('toggle.now', function() {
			if($scope.toggle.now) { //界面的angularjs循环的元素加载完毕

				$(".common").first().show();
				//          查看全文
				jQuery(".seeAll").each(function(){
					this.addEventListener("tap", function() {
					if(jQuery(this).hasClass("qubie")) {
						jQuery(this).parent().siblings(".mui-card-content").find(".article-tpo").animate({
							"height": jQuery(this).parent().siblings(".mui-card-content").find(".in-box").height()
						});
						jQuery(this).removeClass("qubie");
					} else {
						jQuery(this).addClass("qubie");
						jQuery(this).parent().siblings(".mui-card-content").find(".article-tpo").animate({
							"height": 150
						});

					}

				});
				});
			}

		});
		mui.plusReady(function() {
			var self = plus.webview.currentWebview();
			var ids = self.testId;
			var name = self.name;
			var title = self.title;		
			$http({
				method: 'post',
				url: 'http://www.toeflonline.cn/cn/wap-api/read-result',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					id: ids,
					userId: localStorage.getItem("userId")
				}
			}).success(function(data) {
				$scope.titleName=name+"-"+title;;
				$scope.pid = ids;
				$scope.dataArr = data.data;
				$scope.total = data.data.length;
  
//				头部题目点击事件
				mui(".slideBd").on("tap", "li", function() {
					var showNum = parseInt(jQuery(this).attr("data-showNum")) - 1;
					jQuery(this).addClass("on").siblings("li").removeClass("on").parent().siblings("ul").find("li").removeClass("on");
					$("#" + showNum).show().siblings("div.common").hide();
					if(showNum == $scope.dataArr.length - 1 || $scope.dataArr.length - 2 == showNum) {
						$(".special_ti").show();
						$(".abcd_option").hide();
				    }else{
				    	$(".special_ti").hide();
						$(".abcd_option").show();
				    }
				});
				if($scope.dataArr.length<7){
					jQuery("#secondUl").hide();
				}
				var liLen=14;
				if($scope.dataArr.length<liLen){
					var num=parseInt(liLen-$scope.dataArr.length);
					for(var i=1;i<=num;i++){
						var t=$scope.dataArr.length+i;
						jQuery(".slideBd li").each(function(){
							var a=parseInt(jQuery(this).attr("data-showNum"));
							if(a==t){
								jQuery(this).hide();
							}
						});
					}
				}

			});
		});

	}]);

});
