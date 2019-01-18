$(function () {
    //ajax登录
    $("#submit").click(function () {
        var username = $("#username").val().trim()
        var password = $("#password").val().trim()
        if (username == "" || password == "") {
            $(".login-info p:last-child").text("账号或密码不能为空")
        } else if(username.length>10){
            $(".login-info p:last-child").text("账号长度不能超过10哦")
        } else if(password.length>20){
            $(".login-info p:last-child").text("密码长度不能超过20哦")
        }else {
            $.post("/user/retrieveUser", {username: username, password: password}, function (res) {
                if (res == "success") {
                    $(".login-info p:last-child").text("登录成功")
                    location.reload()
                } else if (res == "error") {
                    $(".login-info p:last-child").text("密码错误")
                } else if (res == "empty") {
                    $(".login-info p:last-child").text("账号不存在，正在为您创建账号...")
                    $.post("/user/createUser", {username: username, password: password}, function (res) {
                        if (res == "success") {
                            $(".login-info p:last-child").text("创建成功，正在为您跳转...")
                            location.reload()
                        }else if(res=="forbid"){
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
