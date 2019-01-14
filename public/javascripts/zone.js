$(function () {
    var editType=-1  //更改的类型 0为用户名 1为密码 -1为取消
    //点击更改按钮
    $("#edit_username").click(function () {
        editType=0
        $(".editcontent").css({display:"block"})
        $(".editcontent .info").text("新用户名")
        $(".editcontent .tip").text("中文用户名暂时不支持宠物PK哦！")
    })
    $("#edit_password").click(function () {
        editType=1
        $(".editcontent").css({display:"block"})
        $(".editcontent .info").text("新密码")
        $(".editcontent .tip").text("小提示：密码可以无限简单哦！")
    })
    //取消
    $(".editcontent .cancel").click(function () {
        editType=-1
        $(".editcontent").css({display:"none"})
        $(".editcontent input").val("")
    })
    //确定
    $(".editcontent .submit").click(function () {
        var content=$(".editcontent input").val().trim()
        if(content==""){
            alert("不能为空哦！")
        }else {
            if(editType===0){
                if(content.length>10){
                    alert("用户名长度不能超过10哦！")
                }else {
                    $.post("/users/updateUser",{type:"username",value:content},function (res) {
                        if(res==="success"){
                            alert("更改成功，请重新登录")
                            location.reload()
                        }else if(res==="existed"){
                            alert("这个用户名已存在，换一个试试呢")
                        }else {
                            alert("内部错误")
                        }
                    })
                }
            }else if(editType===1){
                if(content.length>20){
                    alert("密码长度不能超过20哦！")
                }else {
                    $.post("/users/updateUser",{type:"password",value:content},function (res) {
                        if(res==="success"){
                            alert("更改成功，请重新登录")
                            location.reload()
                        }else {
                            alert("内部错误")
                        }
                    })
                }

            }
        }
    })

    // var subwidth=
    // $(".pet_content iframe").css({transform:"scale(0.7,0.7)"})

})
