$(function () {


    //账号密码修改
    var editType=-1  //更改的类型 0为用户名 1为密码 -1为取消
    //点击更改按钮
    $("#edit_username").click(function () {
        editType=0
        $(".editcontent").css({display:"block"})
        $(".editcontent .info").text("新用户名")
        $(".editcontent .tip").text("小提示：用户名现在可以取中文了哦！")
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
                    $.post("/user/updateUser",{type:"username",value:content},function (res) {
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
                    $.post("/user/updateUser",{type:"password",value:content},function (res) {
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

    //宠物名字获取与修改
    $.get("/pet/mypet",function (res) {
        if(res!=="error"){
            $(".profile_content p:last-child em").text(res.P_NAME)
        }else {
            alert("内部错误")
        }
    })
    $("#edit_petname").click(function () {
        var name=prompt("请输入要更改的宠物名","")
        if(name!==null){
            if(name.trim()===""){
                alert("不能为空哦")
            }else {
                $.post("/pet/updatePetName",{name:name},function (res) {
                    if(res==="success"){
                        alert("更改成功")
                        location.reload()
                    }else {
                        alert("更改失败")
                    }
                })
            }
        }else {}
    })

})
