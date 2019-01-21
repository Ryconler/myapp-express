$(function () {
    /* 海报部分 */
    var i = 0  //应展示的图片的索引
    var width = $(".banner")[0].getBoundingClientRect().width //图片宽度
    // console.log(width)
    var first = $(".banner .imgs li").first().clone()
    $(".banner .imgs").append(first)  //将第一张图复制粘贴到最后面，用来实现最后一张图到第一张图的无缝滑动
    var num = $(".banner .imgs li").size()  //获得li的数量
    /* 根据图片数量添加小点 */
    for (var x = 0; x < num - 1; x++) {
        $(".banner .dot").append("<li></li>")
    }
    $(".banner .dot li").first().addClass("on")  //默认第一个点选中

    /* 图片左滑动 */
    function slideLeft() {
        i--
        if (i == -1) {
            $(".banner .imgs").css({left: -width * (num - 1)})
            i = num - 2
        }
        $(".banner .imgs").animate({left: -width * i}, 300)
        $(".banner .dot li").eq(i).addClass("on").siblings().removeClass("on")
    }
    /* 图片右滑动 */
    function slideRight() {
        i++
        if (i == num) {
            $(".banner .imgs").css({left: 0})
            i = 1
        }
        $(".banner .imgs").animate({left: -width * i}, 300)
        $(".banner .dot li").eq(i == num - 1 ? 0 : i).addClass("on").siblings().removeClass("on")
    }
    /* 点击左按钮 */
    $(".banner .btn_l").click(function () {
        if (!$(".banner .imgs").is(":animated")) {   //判断当前banner是否在执行动画，不在则进行滑动
            slideLeft()
        }
    })
    /* 点击右按钮 */
    $(".banner .btn_r").click(function () {
        if (!$(".banner .imgs").is(":animated")) {
            slideRight()
        }
    })
    /* 鼠标放在小点上 */
    $(".banner .dot li").hover(function () {
        var index = $(this).index()
        if (i == 4) {
            $(".banner .imgs").css({left: 0})
        }
        i = index
        $(".banner .imgs").stop().animate({left: -width * i}, 300)    //当前动画立即停止，并执行新的动画
        $(this).addClass("on").siblings().removeClass("on")
    })
    /* 自动轮播 */
    var t = setInterval(function () {
        slideRight()
    }, 1500)
    /* 鼠标移入banner关闭定时器 */
    $(".banner").hover(function () {
        clearInterval(t)
    }, function () {
        t = setInterval(function () {
            slideRight()
        }, 1500)
    })

})
