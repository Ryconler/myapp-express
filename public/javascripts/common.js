$(function () {
    //返回键长按回到首页
    var t
    $(".back").on("touchstart",function (e) {
        // e.preventDefault()
        t=setTimeout(function () {
            location.href="/"
        },500)
    })
    $(".back").on("touchend",function () {
        clearTimeout(t)
    })
    /* “我的”模块 */
    $(".my").click(function (e) {
        e.stopPropagation()
        $(".mycontent").stop().fadeToggle("fast")
    })
    $(".mycontent").click(function (e) {
        e.stopPropagation()
        $(this).css({display:"block"})
    })
    $("body").click(function () {   //点击其他地方 我的内容消失
        $(".mycontent").css({display:"none"})
    })
    //退出
    $("#quit").click(function () {
        $.get("/users/logout",function (res) {
            location.reload()
        })
    })
    //我的空间
    $("#myzone").click(function () {
        location.href="/users/zone"
    })
    //我的消息
    $("#message").click(function () {
        alert("小哥哥正在努力开发中...")
    })
})
