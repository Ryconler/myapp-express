$(function () {
    //ajax登录
    $("#submit").click(function () {
        var username = $("#username").val().trim()
        var password = $("#password").val().trim()
        if (username == "" || password == "") {
            $(".login-txt").text("账号或密码不能为空")
        } else if(username.length>10){
            $(".login-txt").text("账号长度不能超过10哦")
        } else if(password.length>20){
            $(".login-txt").text("密码长度不能超过20哦")
        }else {
            $.post("/user/retrieveUser", {username: username, password: password}, function (res) {
                if (res == "success") {
                    $(".login-txt").text("登录成功")
                    window.location.href = "/"
                } else if (res == "error") {
                    $(".login-txt").text("密码错误")
                } else if (res == "empty") {
                    $(".login-txt").text("账号不存在，正在为您创建账号...")
                    $.post("/user/createUser", {username: username, password: password}, function (res) {
                        if (res == "success") {
                            $(".login-txt").text("创建成功，正在为您跳转...")
                            window.location.href = "/"
                        }else if(res=="forbid"){
                            $(".login-txt").text("目前禁止新用户注册，请联系管理员。")
                        }else {
                            $(".login-txt").text("内部错误")
                        }
                    })
                }
            })
        }
    })
})
