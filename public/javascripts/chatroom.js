$(function () {

    var socket = io.connect('http://111.231.200.245:3000');
    // var socket = io.connect('http://localhost:3000');
    //点击发送数据
    $(".input button").click(function () {
        var text = $(".input input").val().trim()
        if(text===""){
            alert("输入不能为空")
        }else {
            $(".input input").val("")
            var d = new Date()
            var date = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
            socket.emit('send', {content: text, date: date});
        }
    })
    //回车发送数据
    $(".input input").keypress(function (e) {
        if(e.key==="Enter"){
            var text = $(this).val()
            if(text===""){
                alert("输入不能为空")
            }else {
                $(".input input").val("")
                var d = new Date()
                var date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
                socket.emit('send', {content: text, date: date});
            }
        }
    })
    //更新数据
    function updateData(data) {
        $(".content .wrap").append("<div class='record'><p>"
            +data.content +"</p><p>"
            +data.date +"</p></div> ")
        //让内容滚动条始终最下方
        $(".content .wrap").scrollTop($(".content .wrap")[0].scrollHeight)
    }
    //接收新消息
    socket.on('new', function (data) {
        updateData(data)
    });
    //接收在线人数信息
    socket.on('connectCount',function(count){
        $("h1").text("当前在线人数："+count)
    });

})
