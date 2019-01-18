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
    welcome()
    //将输入框内容输入框还原
    function init() {
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth()  //0-11
        var day = date.getDate()
        $("textarea").val("")
        $("#year option").each(function (index) {
            if ($(this).attr("value") == year) {
                $(this).attr({selected: true})
            }
        })
        $("#month option").each(function (index) {
            if ($(this).attr("value") == month + 1) {
                $(this).attr({selected: true})
            }
        })
        $("#day option").each(function (index) {
            if ($(this).attr("value") == day) {
                $(this).attr({selected: true})
            }
        })
    }
    init()
    //输入框事件
    $(".text").click(function (e) {
        $.get("/user/isLogin",function (res) {
            if(res==="yes"){
                $(".alert_input").css({display: "block"})
            }else {
                alert("请先登录")
                location.href="/user/login"
            }
        })
    })
    $(".cancel").click(function () {
        init()
        $(".alert_input").css({display: "none"})
    })
    $(".submit").click(function () {
        var content = $("textarea").val().trim()
        var year = $("#year").val()
        var month = $("#month").val()
        var day = $("#day").val()
        if (content === "") {
            alert("内容不能为空")
        } else {
            $.post("/love/createRecord", {content: content, year: year, month: month, day: day}, function (res) {
                if(res==="success"){
                    alert("发布成功！")
                    $(".alert_input").css({display: "none"})
                    location.reload()
                }else if(res==="noLogin"){
                    alert("请先登录")
                    location.href="/user/login"
                }else {
                    alert("内部错误")

                }
            })
        }

    })


})
