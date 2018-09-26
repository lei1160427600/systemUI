/**
 * Created by xue on 2017/4/27.
 */
(function(context){
    (function (window) {
        document.getElementById('time').innerHTML=moment(new Date()).format("MM/DD/YYYY h:mm:ss A");
        function getTime(){
            return "document.getElementById('time').innerHTML=moment(new Date()).format('MM/DD/YYYY h:mm:ss A')";
        }
        setInterval(getTime(),1000);
    }(window));
    $(document).ready(function () {
        $('.submit-btn').click(function(){
            validateName();
            validatePwd();
            console.log(validateName()&&validatePwd())
            if(!(validateName()&&validatePwd())){
                return ;
            }
            var errorList = $("span.errorClass");
            if(errorList[0].innerText && errorList[1].innerText){
                return false;
            }
            var name = $("input[type=text]").val();
            var radio = $("input[type=radio]:checked").val();
            var pwd = $("input#password").val();
            if(name && radio && pwd){
                var message = null;
                var url ="/marksystems/marksystem/rest/mark/login";
               function done(data,status){
                    if(data.message == "success"){
                        $.sessionStorage.set("token","tokenssss");
                        $.sessionStorage.set("user",data.userName);
                        $.sessionStorage.set("userCode",data.userCode);
                        $.sessionStorage.set("Identity",radio);
                        if($.sessionStorage.get("Identity")=="教师"){
                            window.location.href = '/html/courseEntry.html'
                        }else{
                            window.location.href = '/html/studentinfo.html'
                        }
                        // window.location.href = 'http://localhost:7768/index.html'
                    }else{
                        console.log("data.message"+data.message)
                        message = data.message
                        NConfirm.getConfirmModal().show({
                            title: 'Alert',
                            disableClose: true,
                            messages: [data.message]
                        })
                    }}
                var fail = function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status);
                    alert(XMLHttpRequest.readyState);
                    alert(textStatus);
                }
                sendModel={
                    userCode:name,
                    pwd:pwd,
                    identity:radio
                }
                $pt.doPost(url,sendModel,{
                    quiet:false,
                    async:false,
                    done:done,
                    fail:fail
                });
            }
        });


    });
    $(".inputClass").focus(function () {
        var spanId = $(this).attr("id") + "Error";//通过输入框找到对应的label的id
        $("#" + spanId).text("");//把span的内容清空！
        showError($("#" + spanId));//隐藏没有信息的label
    });
    $(".inputClass").blur(function() {
        var id = $(this).attr("id");//获取当前输入框的id
        if(id === "userName"){
            validateName();
        }else if(id === "password"){
            validatePwd();
        }
    });
    function validatePwd(){
        //密码非空
        var id = "password";
        var value = $("input[type=password]").val();
        var pattern = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
        var flag = pattern.test(value);
        if(!value){
            $("#" + id + "Error").text("密码不能为空！");
            showError($("#" + id + "Error"));
            return false;
        }
        if(value.length  < 6 || value.length > 18){
            $("#" + id + "Error").text("密码长度必须在6-18之间！");
            showError($("#" + id + "Error"));
            return false;
        }
        if(!flag){
            $("#" + id + "Error").text("密码必须包含字母和数字！");
            showError($("#" + id + "Error"));
            return false;
        }
        return true;
    }
    function validateName(){
        //账号非空
        var id ="userName";
        var value = $("input[type=text]").val();
        if(!value){
            /*
             * 获取对应的label
             * 添加错误信息
             * 显示label
             */
            $("#" + id + "Error").text("账号不能为空！");
            showError($("#" + id + "Error"));
            return false;
        }
        //校验长度
        if(value.length  < 6 || value.length > 18){
            $("#" + id + "Error").text("账号长度必须在6-18之间！");
            showError($("#" + id + "Error"));
            return false;
        }
        //校验字符
        var pattern = new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5]+$")
        var flag=pattern.test(value);
        if(!flag){
            $("#" + id + "Error").text("账号只能由汉字、数字、字母、下划线组成！");
            showError($("#" + id + "Error"));
            return false;
        }
        return true;
    }
    function showError(idInfo){
        var text = idInfo.text();//获取元素的内容
        if(!text) {//如果没有内容
            idInfo.css("display", "none");//隐藏元素
        } else {//如果有内容
            idInfo.css("display", "");//显示元素
        }
    }
}(typeof window !== "undefined" ? window : this));