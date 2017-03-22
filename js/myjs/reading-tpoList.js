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
			var ids = self.ids;
			var nameTitle = self.name;
			if(!nameTitle) {
				nameTitle = "TPO 01";
			}
			touchS(ids);
			$http({
				method: 'post',
				url: 'http://www.toeflonline.cn/cn/wap-api/read',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: {
					id: ids
				}
			}).success(function(data) {
				$scope.question = data.read[0].question;
				$scope.tpo = data.tpo;
				$scope.read = data.read[0].question;
				(function(mui) {
					//重写返回键
					mui.back = function(event) {
						mui.openWindow({
							id: "reading.html",
							url: "reading.html"
						})
					}
				})(mui)
				//           随机练习人数 
				for(var i = 0; i < $scope.read.length; i++) {
					$scope.read[i].nums = parseInt(Math.random() * 400);
				}
				//				tpo Li的点击事件
				mui(".slideBd").on("tap", "li", function() {
					var idD = jQuery(this).attr("data-sid");
					var name = jQuery(this).html();
					mui.openWindow({
						id: "reading-tpoList-" + idD,
						url: "reading-tpoList.html",
						extras: {
							ids: idD,
							name: name
						}
					});

				});

				//添加列表项的点击事件
				mui('#tpo-content').on('tap', 'li', function(e) {
					var id = this.getAttribute('id');
					var title = this.getAttribute('data-title');
					mui.openWindow({
						id: "reading-practice" + id,
						url: 'reading-practice.html',
						extras: {
							ids: id,
							name: nameTitle,
							title: title,
							readName: "tpo"
						}
					});

				});

			});
		});
	}]);

});

function touchS(idD) {
	var indexNum = 0;
	var id = idD;
	if(!id) {
		id = 188;
	}
	// alert(id);
	//    标题tpo01
	if(id == 188 || id == 189 || id == 190 || id == 191) {
		indexNum = 0;
	} else if(id == 192 || id == 193 || id == 194 || id == 195) {
		indexNum = 1;
	} else if(id == 196 || id == 197 || id == 198 || id == 199) {
		indexNum = 2;
	} else if(id == 200 || id == 201 || id == 202 || id == 203) {
		indexNum = 3;
	} else if(id == 204 || id == 205 || id == 206 || id == 207) {
		indexNum = 4;
	} else if(id == 208 || id == 209 || id == 210 || id == 211) {
		indexNum = 5;
	} else if(id == 212 || id == 213 || id == 214 || id == 215) {
		indexNum = 6;
	} else if(id == 216 || id == 217 || id == 218 || id == 219) {
		indexNum = 7;
	} else if(id == 220 || id == 221 || id == 263 || id == 264) {
		indexNum = 8;
	} else if(id == 265 || id == 266 || id == 267 || id == 268) {
		indexNum = 9;
	} else if(id == 269 || id == 270 || id == 271) {
		indexNum = 10;
	}
	//  alert(indexNum);

	jQuery("#" + id).addClass("on").siblings("li").removeClass("on").parent().siblings("ul").find("li").removeClass("on");

	//    标题tpo01
	TouchSlide({
		slideCell: "#slidePop",
		effect: "leftLoop",
		defaultIndex: indexNum
	});
}