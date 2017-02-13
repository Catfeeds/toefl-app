jQuery(function() {
	jQuery(".reg-group").Validform({
		btnSubmit: "#sub_reg",
		showAllError: true,
		tiptype: 3
	});
	jQuery("#yzm-btn")[0].addEventListener("tap", function() {
		clickDX(this, 60, 1);
	});
	jQuery("#sub_reg")[0].addEventListener("tap", function() {
		registerSub();
	});
});
//注册提交
function registerSub(){
    var username=$("#reg-username").val();
    var regphem=$("#reg-phem").val();
    var password=$("#reg-password").val();
    var code_yz=$("#reg-yzm").val();
    var repass=$("#reg-repassword").val();
    var phoneCode=getCookie("phoneCode");
  
    if(username && regphem && password && code_yz && repass && phoneCode){
        $.ajax({
            type : "post",
            url : "http://login.gmatonline.cn/cn/wap-api/register",
            dataType : "json",
            data:{
                registerStr:regphem,
                type:1,
                phoneCode:phoneCode,
                code:code_yz,
                pass:password,
                userName:username,
                source:2
            },
            //jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            //jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
            success : function(data){
                alert(data.message);
                if(data.code==1){
                    subLogin("#reg-phem","#reg-password");
                    delCookie("phoneCode");
                }
            },
            error:function(){
                alert('fail注册');
            }
        });
    }else{
        alert("请将信息填写完整！");
    }


}


