
jQuery(function(){

    //声明模块
    var myApp = angular.module("myApp",[]);
//通过模块生成调用控制器
    myApp.controller("PriceCtrl",["$scope","$http",function($scope,$http){

}]);
mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		var courseId = self.courseId;
		var addressNum = self.addressNum;

    $.ajax({
        type : "post",
        url : "http://smartapply.gmatonline.cn/pay/wap-api/clear?id="+courseId+"&userId="+localStorage.getItem('s_userId'),
        dataType : "jsonp",
        jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        success : function(data){
        jQuery("#addNew")[0].addEventListener("tap",function(){
          addNew(courseId,addressNum);
        });

            if(data.code==1){
                var shixiaq='';
               if(data.message.consignee[0]){
                   //循环收货地址
                   var str='';
                   var strOn='';
                   for(var i=0;i<data.message.consignee.length;i++){
                       if(data.message.consignee[i].area!="市辖区"){
                           shixiaq=data.message.consignee[i].area;
                       }else{
                           shixiaq='';
                       }
                       str+='<li>'+
                       '<div class="address" onclick="changeAddress(this,'+courseId+')">'+
                       '<ul>'+
                       '<li><div class="mui-row">'+
                       '<div class="col-xs-1 col-sm-1 mui-col-xs-1 mui-col-sm-1">'+
                       '<img src="images/myimages/sureOrder_icon01.png" alt="icon"/>'+
                       '</div>'+
                       '<div class="col-xs-11 col-sm-11 mui-col-xs-11 mui-col-sm-11">'+
                       '<span>收货人：'+data.message.consignee[i].name+'</span>'+
                       '</div>'+
                       '<div class="mui-clearfix"></div>'+
                       '</div></li>'+
                       '<li><div class="mui-row">'+
                       '<div class="col-xs-1 col-sm-1 mui-col-xs-1 mui-col-sm-1">'+
                       '<img src="images/myimages/sureOrder_icon02.png" alt="icon"/>'+
                       '</div>'+
                       '<div class="col-xs-11 col-sm-11 mui-col-xs-11 mui-col-sm-11">'+
                       '<span>联系电话：'+data.message.consignee[i].phone+'</span>'+
                       '</div>'+
                       '<div class="mui-clearfix"></div>'+
                       '</div></li>'+
                       '<li><div class="mui-row">'+
                       '<div class="col-xs-1 col-sm-1 mui-col-xs-1 mui-col-sm-1">'+
                       '<img src="images/myimages/sureOrder_icon03.png" alt="icon"/>'+
                       '</div>'+
                       '<div class="col-xs-11 col-sm-11 mui-col-xs-11 mui-col-sm-11">'+
                       '<span>收货地址：'+data.message.consignee[i].province+
                       data.message.consignee[i].city+shixiaq+data.message.consignee[i].address+'</span>'+
                       '</div>'+
                       '<div class="mui-clearfix"></div>'+
                       '</div></li>'+
                       '</ul>'+
                       '</div>';
                       if(addressNum==i){
                           strOn='on';
                       }else{
                           strOn='';
                       }
                       str+='<div class="editControls mui-row">'+
                       '<div class="col-xs-8 col-sm-8 mui-col-xs-8 mui-col-sm-8">'+
                       '<span class="icon_default '+strOn+'" data-addressN="'+i+'"></span>'+
                       '<span>默认地址</span>'+
                       '</div>'+
                       '<div class="col-xs-2 col-sm-2 mui-col-xs-2 mui-col-sm-2">'+
                       '<span onclick="editAddress(this,'+courseId+');" data-ids="'+data.message.consignee[i].id+'">编辑</span>'+
                       '</div>'+
                       '<div class="col-xs-2 col-sm-2 mui-col-xs-2 mui-col-sm-2">'+
                       '<span onclick="deleteAddress(this,'+addressNum+');" data-ids="'+data.message.consignee[i].id+'">删除</span>'+
                       '</div>'+
                       '<div class="mui-clearfix"></div>'+
                       '</div>'+
                       '</li>';
                   }
                 $("#pay_shouh").append(str);
                   $(".icon_default").css("height",$(".icon_default").css("width"));

                   if(addressNum=='undefined' || !addressNum || data.message.consignee.length==1){
                       $("#pay_shouh li:first-child").find(".icon_default").addClass("on");
                   }
               }else{
                   $(".noAddress").show();
                   $("#pay_shouh").hide();
               }
            }else{
                location.href="login.html";
            }
        },
        error:function(){
            alert('fail');
        }
    });
      });
});

//添加新地址
function addNew(idT,addressNum){

      mui.openWindow({
					id:"saveAddress",
					url: "saveAddress.html",
					extras: {
						courseId: idT,
						addressNum:addressNum,
						name_qf:'add'
					}
				})
//  location.href="saveAddress.html?courseId="+courseId+"&name_qf=add"+"&oldId="+oldId+"&addressNum="+addressNum;
}

//编辑收货地址
function editAddress(o,idT){
    var id=$(o).attr("data-ids");
    var num=$(o).parents("li").index();

      mui.openWindow({
					id:"saveAddress",
					url: "saveAddress.html",
					extras: {
						ids:id,
						courseId: idT,
						addressNum:1,
						num:num,
						name_qf:'edit'
					}
				})
//  location.href="saveAddress.html?courseId="+courseId+"&name_qf=edit&id="+id+"&num="+num+"&oldId="+oldId+"&addressNum="+addressNum;
}
//删除收货地址
function deleteAddress(o,addressNum){
    var id=$(o).attr("data-ids");
    var r=confirm('确认删除收货地址?');
    if(r==true){
        $.ajax({
            type : "post",
            url : "http://smartapply.gmatonline.cn/pay/wap-api/delete-consignee?id="+id+"&userId="+localStorage.getItem('s_userId'),
            dataType : "jsonp",
            jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            success : function(data){
                if(data.code==1){
                    $(o).parents("li").siblings("li").eq(addressNum).find(".icon_default").addClass("on");
                    $(o).parents("li").remove();
                    if($("#pay_shouh li").length==0){
                        $(".noAddress").show();
                    }
                }
            },
            error:function(){
                alert('fail');
            }
        });
    }
}
//返回订单信息页面
function returnOrder(courseId){
    var num=$("#pay_shouh li").find(".icon_default.on").attr("data-addressN");

	mui.openWindow({
		id: "sureOrder-"+num,
		url: "sureOrder.html",
		extras: {
			courseId: courseId,
			addressNum: num
		}
	})
}
//改变收货地址
function changeAddress(o,courseId){
    $(o).parent("li").find(".icon_default").addClass("on").end().siblings("li").find(".icon_default").removeClass("on");
    returnOrder(courseId);
}