$(function () {
    var pathnamearr=location.pathname.split("/")
    var id=pathnamearr[pathnamearr.length-1]
    $.get("/user/isFollow/"+id,function (res) {
        if(res==="yes"){
            $(".follow button").text("已关注")
        }
    })
    $(".follow button").click(function () {
        $.get("/user/isLogin",function (user) {
            if(user){
                var isLogin=$(".follow button").text()
                if(isLogin==="已关注"){
                    $.get("/user/unfollow/"+id,function (res) {
                        if(res==="success"){
                            $(".follow button").text("关注")
                        }else if(res==="noLogin"){
                            alert("请先登录")
                            $("body").load("/user/login")
                        }else {
                            alert("内部错误")
                        }
                    })
                }else if(isLogin==="关注"){
                    $.get("/user/follow/"+id,function (res) {
                        if(res==="success"){
                            $(".follow button").text("已关注")
                        }else if(res==="noLogin"){
                            alert("请先登录")
                            $("body").load("/user/login")
                        }else {
                            alert("内部错误")
                        }
                    })
                }else {
                    alert("当前页面发生错误")
                }

            }else {
                alert("请先登录")
                $("body").load("/user/login")
            }
        })
    })
})
