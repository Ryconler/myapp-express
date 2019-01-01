$(function () {
    //初始化各种输入框
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
    $(".text").click(function (e) {
        $(".alert_input").css({display: "block"})
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
        if (content == "") {
            alert("内容不能为空")
        } else {
            $.post("/love/postRecords", {content: content, year: year, month: month, day: day}, function (res) {
                if(res=="success"){
                    alert("记仇成功！")
                    $(".alert_input").css({display: "none"})
                    location.reload()
                }else {
                    alert("内部错误")
                }
            })
        }

    })
})
