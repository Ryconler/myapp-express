const io = require('socket.io')()

var count=0
io.on('connection', socket => {
    count++
    console.log("有用户登录，当前在线人数："+count)
    // 当有用户断开
    socket.on('disconnect',function(){
        count--
        console.log("有用户离开，当前在线人数："+count);
    });
    //接收我机坐标，并广播出去
    socket.on("mPos",function (pos) {
        // console.log(pos.left)
        // socket.emit("uPos",pos)
        socket.broadcast.emit("ePos",pos)
    })

    //接收我机子弹坐标，并广播出去
    socket.on("mBullet",function (pos) {
        // console.log(pos.left)
        // socket.emit("uPos",pos)
        socket.broadcast.emit("eBullet",pos)
    })

});
io.listen(4000);
