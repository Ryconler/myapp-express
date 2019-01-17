$(function () {
    var socket = io('http://111.231.200.245:4000');
    //获取敌机的坐标
    socket.on("ePos", pos => {
        var left = pos.left
        if (left < 0) {
            $(".ePlane").css({"left": 0});
        } else if (left > maxplaneleft) {
            $(".ePlane").css({"left": maxplaneleft + "px"});
        } else {
            $(".ePlane").css({"left": left + "px"});
        }
    })
    //获取敌机子弹的坐标
    var eshootcount = 0
    socket.on("eBullet", pos => {
        eshootcount++
        var left = pos.left
        $(".container").append("<div id='eBullet" + eshootcount + "' class='eBullet'></div>")
        $("#eBullet" + eshootcount).css({"left": left + "px"})
        $("#eBullet" + eshootcount).animate({top: conHeight}, 700)
    })
    //获取对方赢了的消息
    socket.on("win", win => {
        if (win) {
            alert("你输了")
        }
    })


    var planeWidth = $(".mPlane").outerWidth()  //飞机的宽度num
    var planeHeight = $(".mPlane").outerHeight()  //飞机的高度num
    var bulletWidth = $(".mBullet").outerWidth() //子弹宽度
    var bulletHeight = $(".mBullet").outerHeight() //子弹高度
    var conWidth = $(".container").outerWidth()  //战场宽度num
    var conHeight = $(".container").outerHeight()
    var maxplaneleft = conWidth - planeWidth   //飞机最右边时的x坐标


//移动端操作飞机
    var gapX
    $(".mPlane").on("touchstart", function (e) {
        var touchX = e.originalEvent.targetTouches[0].pageX  //手指点击的x坐标num
        var planeX = $(this).position().left   //飞机当前的x坐标num
        gapX = touchX - planeX  //手指点击处与飞机左边缘的距离
        // console.log(gapX)
    })
    $(".mPlane").on("touchmove", function (e) {
        e.preventDefault()
        var moveX = e.originalEvent.targetTouches[0].pageX//移动过程中手指的x坐标
        var left = moveX - gapX  //随着手指移动，飞机在战场上应为的左边距
        if (left < 0) {
            $(".mPlane").css({"left": 0});
        } else if (left > maxplaneleft) {
            $(".mPlane").css({"left": maxplaneleft + "px"});
        } else {
            $(".mPlane").css({"left": left + "px"});
        }
        socket.emit("mPos", {left: left})   //发送我机的坐标
    })
    $(".mPlane").on("touchend", function (e) {
        // console.log("touchend")
    })
    var shootcount = 0   //射击次数
    $(".shoot").on("touchstart", function (e) {
        e.preventDefault()
        shootcount++
        if (shootcount <= 20) {

            var planeX = $(".mPlane").position().left  //飞机当前的x坐标
            $(".container").append("<div id='mBullet" + shootcount + "' class='mBullet'></div>")
            var left = planeX + planeWidth / 2 - bulletWidth / 2  //子弹的x坐标
            $("#mBullet" + shootcount).css({"left": left + "px"})
            var t = setInterval(function () {isHit("#mBullet" + shootcount)},100)
            $("#mBullet" + shootcount).animate({bottom: conHeight}, 700,function () {
                clearInterval(t)
            })
            $(".property .normal ").find("span").last().text(20 - shootcount)
            socket.emit("mBullet", {left: left})
        }
    })


    //判断子弹是否打中飞机
    function isHit(bulletId) {
        //敌机上下左右坐标
        var eLeft = $(".ePlane").position().left
        var eRight = eLeft + planeWidth
        var eTop = $(".ePlane").position().top
        var eBottom = eTop + planeHeight
        //我的子弹上下左右坐标
        var mBulletLeft = $(bulletId).position().left
        var mBulletRight = mBulletLeft + bulletWidth
        var mBulletTop = $(bulletId).position().top
        var mBulletBottom = mBulletTop + bulletHeight
        console.log("判断中...")
        if (mBulletRight > eLeft && mBulletLeft < eRight && mBulletBottom > eTop && mBulletTop < eBottom) { //子弹与飞机有接触
            socket.emit("win", "win")
            alert("你赢了")
        }

    }

//鼠标操作
    /*
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
    */
//键盘操作*
    /*
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
    */
})
