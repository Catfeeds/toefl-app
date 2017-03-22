jQuery(function() {
	mui('.know-body').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	

	mui(".orangeColor")[0].addEventListener("tap",function(){
          mui.openWindow({
          	id:"index.html",
          	url:"index.html"
          })
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
	var taskSession = localStorage.getItem("taskSession");
	var userId =localStorage.getItem('userId');
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
			url: 'http://www.toeflonline.cn/cn/app-api/grammar-learning',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: {
				userId: userId,
				taskSession: taskSession
			}
		}).success(function(data) {
            $scope.name=data.grammarLearning.name;
            $scope.answer=data.grammarLearning.answer;
		});
	}]);
	
    jQuery("#closeMask")[0].addEventListener("tap",function(){
    	closeMaskM();
    });

});

function showMask() {
	jQuery(".mui-backdrop").show();
}

function closeMaskM() {
	jQuery(".mui-backdrop").hide();
}