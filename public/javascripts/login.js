$(function () {
    function parseRule($ele){
        var rule={}
        var rule_str=$ele.data("rule")  //获取data-rule
        var rule_arr=rule_str.split('|')
        for(var i=0;i<rule_arr.length;i++){
            var item_str=rule_arr[i]
            var item_arr=item_str.split(':')
            rule[item_arr[0]]=JSON.parse(item_arr[1])
        }
        // console.log(rule)
        return rule
    }

    //ajax登录
    $("#submit").click(function () {
        var username = $("#username").val()
        var usernameRule=parseRule($("#username"))   //用户名的校验规则
        console.log(usernameRule)
        var usernameValidator=new Validator(username,usernameRule)  //用户名校验器
        var password = $("#password").val()
        var passwordRule=parseRule($("#password"))
        var passwordValidator=new Validator(password,passwordRule)
        /*表单验证*/
        if (!usernameValidator.validate_required()) {
            $(".login-info p:last-child").text("账号不能为空")
        }else if(!usernameValidator.validate_maxlength()){
            $(".login-info p:last-child").text("账号长度不能超过10哦")
        }else if(!passwordValidator.validate_required()){
            $(".login-info p:last-child").text("密码不能为空")
        }else if(!passwordValidator.validate_maxlength()){
            $(".login-info p:last-child").text("密码长度不能超过20哦")
        }else if(!passwordValidator.validate_pattern()){
            $(".login-info p:last-child").text("密码只能为数字和英文哦")
        }else {
            $.post("/user/retrieveUser", {username: username, password: password}, function (res) {
                if (res === "success") {
                    $(".login-info p:last-child").text("登录成功")
                    location.reload()
                } else if (res === "error") {
                    $(".login-info p:last-child").text("密码错误")
                } else if (res === "empty") {
                    $(".login-info p:last-child").text("账号不存在，正在为您创建账号...")
                    $.post("/user/createUser", {username: username, password: password}, function (res) {
                        if (res === "success") {
                            $(".login-info p:last-child").text("创建成功，正在为您跳转...")
                            setTimeout(function () {
                                location.reload()
                            },1000)
                        }else if(res==="forbid"){
                            $(".login-info p:last-child").text("目前禁止新用户注册，请联系管理员。")
                        }else {
                            $(".login-info p:last-child").text("内部错误")
                        }
                    })
                }
            })
        }
    })
})
