$(function () {

    //welcome弹框
    function welcome() {
        var date=new Date()
        var hour=date.getHours()
        if(hour>=5&&hour<=10){
            $(".welcome span").text("上午好")
        }else if(hour>=11&&hour<=13){
            $(".welcome span").text("中午好")
        }else if(hour>=14&&hour<=18){
            $(".welcome span").text("下午好")
        }else if(hour>=19||hour<=4){
            $(".welcome span").text("晚上好")
        }
        $(".welcome").slideDown("normal",function () {
            setTimeout(function () {
                $(".welcome").slideUp("normal")
            },1000)
        })
    }
    // welcome()
    //将输入框内容输入框还原

    //输入框事件
    $(".write").click(function (e) {
        $.get("/user/isLogin",function (res) {
            if(res){
                $(".alert_input").css({display: "block"})
            }else {
                alert("请先登录")
                $("body").load("/user/login")
            }
        })
    })
    $(".cancel").click(function () {
        $("textarea").val("")
        $(".alert_input").css({display: "none"})
    })
    $(".submit").click(function () {
        var content = $.trim($("textarea").val())
        var authority=$("#authority").val()
        if (content === "") {
            alert("内容不能为空")
        } else {
            $.post("/love/createRecord", {content: content,authority:authority}, function (res) {
                if(res==="success"){
                    alert("发布成功！")
                    $(".alert_input").css({display: "none"})
                    location.reload()
                }else if(res==="noLogin"){
                    alert("请先登录")
                    $("body").load("/user/login")
                }else {
                    alert("内部错误")
                }
            })
        }

    })

    //点击内容单项
    $(".content_item").each(function (index) {
        $(this).click(function () {
            $(this).find(".extra").stop().slideToggle("normal")
            $(this).siblings().find(".extra").hide()
        })
    })

})
