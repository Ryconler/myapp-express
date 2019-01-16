var socket_io = require('socket.io');
var socketio = {};
var count=0
// 获取io
socketio.getSocketIO = function (server) { // http(s) server
    var io = socket_io.listen(server);
    io.sockets.on('connection', function (socket) {
        // 发送给客户端在线人数
        io.emit('connectCount',++count);
        console.log("有用户登录，当前在线人数："+count)
        // 接收来自客户端的消息
        socket.on('send', function (data) {
            console.log(data)
            socket.emit('new', data);   // 给该客户端发送消息
            socket.broadcast.emit('new', data);   //广播数据，发送给其它客户端
        });
        // 当有用户断开
        socket.on('disconnect',function(){
            // 发送给客户端人数
            io.emit('connectCount',--count);
            console.log("有用户离开，当前在线人数："+count);
        });
    })
};
module.exports = socketio;
