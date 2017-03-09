mui.init({
	pullRefresh: {
		container: "#pullrefresh", //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
		//			down: {
		//						callback: pulldownRefresh
		//					},
		up: {			
			contentrefresh: '正在加载...',
			callback: pullupRefresh,
			auto:true
		}
	}
});

jQuery(function() {
	//				底部导航跳转
	jumpPage("#fixed-1", "index.html");
	jumpPage("#fixed-2", "course.html");
	jumpPage("#fixed-3", "encyclopedia.html");
	jumpPage("#fixed-4", "personalCenter.html");

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
	myApp.controller("PriceCtrl", ["$scope", "$http", function($scope, $http) {
		$scope.toggle = {
			now: false
		};
		$scope.$watch('toggle.now', function() {
			if($scope.toggle.now) { //界面的angularjs循环的元素加载完毕

			}
		});

	}]);
	mui(".mui-content").on("tap", ".click-detail", function() {
		var ids=jQuery(this).attr("data-id");
		mui.openWindow({
			id: "encyclopedia-details",
			url: "encyclopedia-details.html",
			extras:{
				ids:ids
			}
		})
	});

});
var count = 5;

function pullfreshFunction() {
	$.ajax({
		type: "post",
		url: 'http://www.toeflonline.cn/cn/app-api/reference-page',
		async: true,
		dataType: "json",
		data: {
			catId: 137,
			pageSize: count,
			page: 1

		},
		success: function(data) {
			jQuery("#firstBox").html("");
			jQuery(".tuij-bot").html("");
			count = count + 10;
			mui('#pullrefresh').pullRefresh().endPullupToRefresh((count > data.count)); //参数为true代表没有更多数据了。
			var content = '';
			var firstStr = '<div class="mui-card-content">' +
				'<img src="http://www.toeflonline.cn' + data.data[0].image + '" />' +
				'<h4>' + data.data[0].name + '</h4>' +
				'</div>' +
				'<div class="mui-card-footer">' +
				'<p>发布于' + formatDate(data.data[0].createTime) + '</p>' +
				'<p><span><img src="images/myimages/Toeflxiaoxi@2x.png" width="20px"/>' + data.data[0].viewCount + '</span></p>' +
				'</div>';
			jQuery("#firstBox").attr("data-id",data.data[0].id);				
			jQuery("#firstBox").append(firstStr);
			var imgStr = '';
			for(var i = 1; i < data.data.length; i++) {
				if(data.data[i].image) {
					imgStr = "http://www.toeflonline.cn" + data.data[i].image;
				} else {
					imgStr = 'images/myimages/place.jpg';
				}
				content += '<div class="mui-row click-detail" data-id="'+data.data[i].id+'">' +
					'<div class="mui-col-sm-4 mui-col-xs-4">' +
					'<img src="' + imgStr + '" />' +
					'</div>' +
					'<div class="mui-col-sm-8 mui-col-xs-8">' +
					'<div style="width: 95%;">' +
					'<div class="mui-ellipsis">' + data.data[i].name + '</div>' +
					'<p>发布于' + formatDate(data.data[i].createTime) +
					' <span style="float: right;"><img src="images/myimages/Toeflxiaoxi@2x.png" width="20px"/>' +
					data.data[i].viewCount + '</span></p>' +
					'</div>' +
					'</div>' +
					'<div class="mui-clearfix"></div>' +
					'</div>';
			}
			jQuery(".tuij-bot").append(content);
		}
	});
}
/**
 * 下拉刷新具体业务实现
 */
//			function pulldownRefresh() {
//				setTimeout(function() {
//
//						pullfreshFunction();		
//					
//				}, 1500);
//			}

/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	setTimeout(function() {

		pullfreshFunction();

	}, 1500);
}