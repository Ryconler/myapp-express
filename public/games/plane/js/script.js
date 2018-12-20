$(function () {
    //全局设置
    $(".container").css({"height": "500px"})  //设置战场高度

    var planeHeight = parseInt($(".plane").css("height"))  //飞机的高度
    var planeWidth = parseInt($(".plane").css("width"))  //飞机的宽度

    var conHeight = parseInt($(".container").css("height"))  //战场高度
    var conWidth = window.innerWidth  //战场宽度

    var maxtopper = (1 - planeHeight / conHeight) * 100  //当飞机在最底部时的top百分比
    var maxleftper = (1 - planeWidth / conWidth) * 100 //当飞机在最右边时的left百分比

    $(".plane").css({"top": maxtopper + "%"})  //设置飞机初始位置


//移动端操作飞机
    $(".plane").on("touchstart", function (e) {
        console.log("touchstart")
        var touchXper = 100 * e.originalEvent.targetTouches[0].pageX / conWidth   //手指点击的x坐标
        var planeXper = 100 * $(this).offset().left / conWidth   //飞机当前的x坐标
        gapXper = touchXper - planeXper  //手指点击处与飞机左边缘的距离
    })
    $(".plane").on("touchmove", function (e) {
        // console.log("touchmove")
        e.preventDefault()
        var moveXper = 100 * e.originalEvent.targetTouches[0].pageX / conWidth //移动过程中手指的x坐标
        var leftper = moveXper - gapXper  //随着手指移动，飞机在战场上应为的左边距
        if (leftper <= 0) {
            $(".plane").css({"left": 0});
        } else if (leftper >= maxleftper) {
            $(".plane").css({"left": maxleftper + "%"});
        } else {
            $(".plane").css({"left": leftper + "%"});
        }
    })
    $(".plane").on("touchend", function (e) {
        console.log("touchend")
    })

    var shootcount = 0
    $(".shoot").on("touchstart", function (e) {

        shootcount++
        var planeXper = 100 * $(".plane").offset().left / conWidth   //飞机当前的x坐标
        $(".container").append("<div id='bullet" + shootcount + "'></div>")
        $("#bullet" + shootcount).addClass("bullet")
        $("#bullet" + shootcount).css({"left": planeXper + 100 * planeWidth / conWidth / 2 + "%"})
        $("#bullet" + shootcount).css({"top": 80-shootcount*2 + "%"})
        $("#bullet" + shootcount).animate({"top": -20-shootcount*2+"%"},{"complete":function () {
                $(this).remove()
                shootcount=0
            }})
        // $(".plane").animate({"top": 0})
    })


//鼠标操作
    function mouse() {
        var mflag = false  //判断鼠标是否按下
        $(".plane").on("mousedown", function (e) {
            mflag = true
            console.log("mousedown")
            console.log(e)
            var mouseXper = 100 * e.clientX / conWidth  //鼠标点击的x坐标占比
            var planeXper = 100 * $(this).offset().left / conWidth  //飞机当前的x坐标
            gapXper = mouseXper - planeXper  //鼠标点击处与飞机左边缘的距离
            console.log(gapXper)
        })
        $(document).on("mousemove", function (e) {   //当鼠标脱离飞机时也可以使飞机移动，所以用$(document)
            if (mflag) {        //鼠标按下时才会执行
                // console.log("mousemove")
                e.preventDefault()
                var moveXper = 100 * e.clientX / conWidth  //移动过程中鼠标的x坐标
                var leftper = moveXper - gapXper  //随着手指移动，飞机在战场上应为的左边距
                if (leftper <= 0) {
                    $(".plane").css({"left": 0});
                } else if (leftper >= maxleftper) {
                    $(".plane").css({"left": maxleftper + "%"});
                } else {
                    $(".plane").css({"left": leftper + "%"});
                }
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
                var left = parseInt($(".plane").css("left"))
                // console.log(left * 3)
                $(".plane").animate({left: "0%"}, {duration: 0})
                kflag = true
            }
            if (ev.key == "ArrowRight" && !kflag) {
                var left = parseInt($(".plane").css("left"))
                // console.log((parseInt(leftper) - left) * 3)
                $(".plane").animate({left: maxleftper + "%"}, {duration: 0})
                kflag = true
            }
        })
        $(document).keyup(function (ev) {
            $(".plane").stop()   //键盘抬起，让当前运动动画中途停止
            kflag = false
        })
    }
})