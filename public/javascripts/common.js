$(function () {
    /* 判断有没有登录 */
    $.get('/user/isLogin',function (res) {
        if(res){
            $(".header_wrap .my").show()
            $('.header_wrap .login').hide()
            $(".header_wrap .dropdown .profile h1").text(res.username)
            //获取粉丝和关注信息
            $.get("/user/getMyFollowNum",function (res) {
                if(res){
                    $("#followingNum").text(res[0])
                    $("#followerNum").text(res[1])
                }
            })
        }else {
            $('.header_wrap .my').hide()
        }
    })
    /* 点击头像 */
    $(".header_wrap .avatar").click(function (e) {
        e.stopPropagation()
        $(".header_wrap .my .dropdown").stop().fadeToggle()
    })
    $(document).click(function () {
        $(".header_wrap .my .dropdown").stop().fadeOut()
    })
    /* 退出 */
    $("#quit").click(function () {
        $.get("/user/logout",function (res) {
            $("body").load("/user/login")
        })
    })
    /* 登录 */
    $('#login').click(function () {
        $('body').load('/user/login')
    })

    /* 移动端的折叠按钮 */
    //折叠按钮的拖动
    var gapX
    var gapY
    var maxLeft = $(window).outerWidth() - $(".collapse").outerWidth()  //按钮最右边时的左距离
    var maxTop = $(window).outerHeight() - $(".collapse").outerHeight()
    var touchStartTime  //按钮按下时间戳
    $(".collapse").on("touchstart", function (e) {
        // e.preventDefault()
        var left = $(this).position().left
        var top = $(this).position().top
        var touchX = e.originalEvent.targetTouches[0].clientX
        var touchY = e.originalEvent.targetTouches[0].clientY
        gapX = touchX - left
        gapY = touchY - top
        //改变样式
        $(this).css({opacity: 0.9})
        //获取按下时间
        touchStartTime=e.timeStamp
    })
    $(".collapse").on("touchmove", function (e) {
        e.preventDefault()
        var touchX = e.originalEvent.targetTouches[0].clientX
        var touchY = e.originalEvent.targetTouches[0].clientY
        var left = touchX - gapX
        var top = touchY - gapY
        //拖动边界
        left = left < 0 ? 0 : left
        left = left > maxLeft ? maxLeft : left
        top = top < 0 ? 0 : top
        top = top > maxTop ? maxTop : top
        $(this).css({left: left + "px", top: top + "px"})
    })
    $(".collapse").on("touchend", function (e) {
        $(this).css({opacity: 0.5})
        //获取抬起时间
        var touchEndTime=e.timeStamp
        if (touchEndTime-touchStartTime<200) {
            $(".expand").stop().slideToggle()

        }
    })
    //折叠下拉框的滑动
    $(".expand").on("touchmove", function (e) {
        e.preventDefault()
    })
})
