$(function () {
    var width=document.documentElement.clientWidth/0.94
    width = width>768?768:width
    var fontsize=20 * (width / 384)
    var p=fontsize/40  //获得实际canvas中每个点应是最大的百分比

    var canvas=document.getElementById('canvas');
    //设置画布大小，并非实际显示大小，默认300*150
    canvas.width=720
    canvas.height=400
    //设置canvas画面要显示的大小，但实际还是上面设置的720*400
    $("#canvas").css({width:720*p+"px",height:400*p+"px"})


})
