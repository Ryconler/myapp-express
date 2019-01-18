$(function () {
    //返回键长按回到首页
    //var t
    //返回后退
    $(".back").on("click",function (e) {
        history.go(-1)
        // e.preventDefault()
        // t=setTimeout(function () {
        //     location.href="/"
        // },500)
    })
    // $(".back").on("touchend",function () {
    //     clearTimeout(t)
    // })

})
