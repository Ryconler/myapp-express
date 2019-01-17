const io = require('socket.io')()
io.on('connection', socket => {
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
    //接收赢了的消息，并广播出去
    socket.on("win",function (win) {
        socket.broadcast.emit("win",win)
    })

});
io.listen(4000);
