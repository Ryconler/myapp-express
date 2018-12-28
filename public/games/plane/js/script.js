$(function () {
    var planeWidth = $(".plane").outerWidth()  //飞机的宽度num

    var bulletWidth=$(".bullet").outerWidth()

    var conWidth = $(".container").outerWidth()  //战场宽度num
    var conHeight=$(".container").outerHeight()

    var maxplaneleft = conWidth - planeWidth



    var gapX
//移动端操作飞机
    $(".plane").on("touchstart", function (e) {
        var touchX = e.originalEvent.targetTouches[0].pageX  //手指点击的x坐标num
        var planeX = $(this).position().left   //飞机当前的x坐标num

        gapX = touchX - planeX  //手指点击处与飞机左边缘的距离
        // console.log(gapX)
    })
    $(".plane").on("touchmove", function (e) {
        e.preventDefault()
        var moveX = e.originalEvent.targetTouches[0].pageX//移动过程中手指的x坐标
        var left = moveX - gapX  //随着手指移动，飞机在战场上应为的左边距
        if (left < 0) {
            $(".plane").css({"left": 0});
        } else if (left > maxplaneleft) {
            $(".plane").css({"left": maxplaneleft + "px"});
        } else {
            $(".plane").css({"left": left + "px"});
        }
    })
    $(".plane").on("touchend", function (e) {
        console.log("touchend")
    })

    var shootcount = 0
    $(".shoot").on("touchstart", function (e) {
        e.preventDefault()
        shootcount++
        if(shootcount<=20){
            var planeX =  $(".plane").position().left  //飞机当前的x坐标
            $(".container").append("<div id='bullet" + shootcount + "' class='bullet'></div>")
            $("#bullet" + shootcount).css({"left":planeX+planeWidth/2-bulletWidth/2})
            $("#bullet" + shootcount).animate({bottom:conHeight },700)
            $(".property .nomarl ").find("span").last().text(20-shootcount)
        }

    })


//鼠标操作
    function mouse() {
        var mflag = false  //判断鼠标是否按下
        $(".plane").on("mousedown", function (e) {
            mflag = true
            console.log("mousedown")
            console.log(e)

        })
        $(document).on("mousemove", function (e) {   //当鼠标脱离飞机时也可以使飞机移动，所以用$(document)
            if (mflag) {        //鼠标按下时才会执行
                // console.log("mousemove")
        }
        })
        $(document).on("mouseup", function (e) {   //同理，当鼠标脱离飞机时鼠标抬起生效，所以用$(document)
            mflag = false
            $(this).off("mousedown");  //解绑定
        })
    }

//键盘操作*
    function keyboard() {
        var kflag = false;  //判断键盘是否按下
        $(document).keydown(function (ev) {
            if (ev.key == "ArrowLeft" && !kflag) {

                kflag = true
            }
            if (ev.key == "ArrowRight" && !kflag) {

                kflag = true
            }
        })
        $(document).keyup(function (ev) {
            $(".plane").stop()   //键盘抬起，让当前运动动画中途停止
            kflag = false
        })
    }
})