jQuery(function() {
	//    标题tpo01
	TouchSlide({slideCell: "#slidePop",effect: "leftLoop"});
//	mui.init({
//		pullRefresh: {
//			container: "#tpo-content", //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
//			up: {
//				height: 50, //可选.默认50.触发上拉加载拖动距离
//				auto: false, //可选,默认false.自动上拉加载一次
//				contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
//				contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
//				callback: tpoPullfreshFun //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
//			}
//		}
//	});
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
		
		$http({
            method: 'post',
            url: 'http://www.toeflonline.cn/cn/wap-api/read',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:{
               id:188
            }
        }).success(function(data) {
             $scope.question=data.read[0].question;
            $scope.questionOg=data.OG[0].question;
            $scope.tpo=data.tpo;
        });
	}]);
	
	//初始化预加载详情页面
			mui.init({
				preloadPages: [{
					id: 'reading-practice.html',
					url: 'reading-practice.html'
				}]
			});

			var detailPage = null;
			//添加列表项的点击事件
			mui('#tpo-content').on('tap', 'li', function(e) {
				//		  var id = this.getAttribute('id');
				//获得详情页面
				//		  if(!detailPage){
				//		    detailPage = plus.webview.getWebviewById('reading-practice.html');
				//		  }
				//		  //触发详情页面的newsId事件
				//		  mui.fire(detailPage,'newsId',{
				//		    id:id
				//		  });
				//打开详情页面          
				mui.openWindow({
					//		    id:'reading-practice.html',注意：传值时只需要这一行，删除下面一行
					url: 'reading-practice.html'
				});

			});
	
	
});


//function tpoPullfreshFun() {
//	var strTpo = '<li>' +
//	'<div class="left-img">' + 
//	'<a href="#">' + 
//	'<img src="images/myimages/reading-tpo.png" alt="tpo" />' + 
//	'</a>' + 
//	'</div>' + 
//	'<div class="right-info">' + 
//	'<h2>pullfresh</h2>' + 
//	'<p>144人在练习</p>' + 
//	'<button type="button" class="mui-btn mui-btn-warning orangeBg">GO</button>' + 
//	'</div>' + 
//	'<div class="mui-clearfix"></div>' + 
//	'</li>';
//	$("#tpo-content ul").append(strTpo);
//  this.endPullupToRefresh(true);
////  切换选项卡后重置上拉加载
////mui('#pullup-container').pullRefresh().refresh(true);
//}