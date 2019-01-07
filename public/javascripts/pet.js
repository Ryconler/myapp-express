$(function () {
    // var levelExp=[]
    // for(var i=0;i<11;i++){
    //     levelExp[i]=25*i*i+75*i
    // }
    //每次升级需要的经验
    var maxExp=[0,100,150,200,250,300,350,400,450,500,550]
    //达到相应等级需要的总经验
    var levelExp=[0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700, 3250]

    function exp2level(exp){
        for(var i=1;i<11;i++){
            if(exp<levelExp[i]){
                return i-1
            }
        }
    }
    function drawEgg(){
        var c=document.getElementById('canvas').getContext("2d");
        c.clearRect(0,0,720,400)
        c.lineWidth=5;
        c.strokeStyle="#33190c";
        c.fillStyle="#ffffd9";
        c.beginPath()
        c.moveTo(230,80)
        c.bezierCurveTo(140,80,60,370,230,370)
        c.bezierCurveTo(400,370,320,80,230,80)
        c.stroke()
        c.fill()
        c.closePath()
    }
    function drawPet(){
        var c=document.getElementById('canvas').getContext("2d");
        c.clearRect(0,0,720,400)
        function head() {
            c.lineWidth=5;
            c.strokeStyle="#33190c";
            c.fillStyle="#ffffd9";
            c.beginPath();
            c.moveTo(231,53);
            c.bezierCurveTo(132,71,82,155,90,230);
            c.bezierCurveTo(112,315,270,332,388,287);
            c.bezierCurveTo(504,237,425,74,324,52);
            c.bezierCurveTo(267,44,257,47,231,53);
            c.fill();
            c.stroke();
            c.closePath();

        }
        function ear(){
            c.lineWidth=5;
            c.strokeStyle="#33190c";
            c.fillStyle="#ffffd9";
            c.beginPath();
            c.moveTo(212,58);
            c.bezierCurveTo(151,24,133,50,142,100);
            c.moveTo(329,56)
            c.bezierCurveTo(391,25,410,43,407,109)
            c.fill();
            c.stroke();
            c.closePath();

        }
        function eyes(){
            c.fillStyle="#33190c";
            //右眼
            c.beginPath();
            c.arc(350,165,35,0,2*Math.PI)
            c.fill()
            c.closePath()
            //左眼
            c.beginPath()
            c.arc(200,165,35,0,2*Math.PI)
            c.fill()
            c.closePath();

        }
        function eyeshighlight(){  //眼睛高光
            c.fillStyle="#fff";
            //右眼
            c.beginPath();
            c.arc(360,145,8,0,2*Math.PI)
            c.fill()
            c.closePath()
            //左眼
            c.beginPath()
            c.arc(210,145,8,0,2*Math.PI)
            c.fill()
            c.closePath();
        }
        function eyelash() {
            c.strokeStyle="#33190c";
            c.lineWidth=5
            //左眼三根
            c.beginPath()
            c.moveTo(185,150)
            c.lineTo(170,125)
            c.stroke()
            c.closePath();
            c.beginPath()
            c.moveTo(200,150)
            c.lineTo(200,115)
            c.stroke()
            c.closePath();
            c.beginPath()
            c.moveTo(215,150)
            c.lineTo(230,125)
            c.stroke()
            c.closePath();
            //右眼三根
            c.beginPath()
            c.moveTo(350,150)
            c.lineTo(350,115)
            c.stroke()
            c.closePath();
            c.beginPath()
            c.moveTo(335,150)
            c.lineTo(325,125)
            c.stroke()
            c.closePath();
            c.beginPath()
            c.moveTo(365,150)
            c.lineTo(380,125)
            c.stroke()
            c.closePath();
        }
        function nose(){
            c.fillStyle="#33190c";
            c.beginPath()
            c.arc(275,220,8,0,2*Math.PI)
            c.fill()
            c.closePath();
        }
        function mouth(){
            c.strokeStyle="#33190c";
            c.beginPath()
            c.arc(255,220,20,0,Math.PI*4/5)
            c.stroke()
            c.closePath();
            c.beginPath()
            c.arc(295,220,20,Math.PI/5,Math.PI)
            c.stroke()
            c.closePath();
        }
        function beard(){
            c.strokeStyle="#33190c";
            c.lineWidth=3
            //左脸三根
            c.beginPath()
            c.moveTo(120,200)
            c.lineTo(60,195)
            c.stroke()
            c.closePath();
            c.beginPath()
            c.moveTo(115,220)
            c.lineTo(55,230)
            c.stroke()
            c.closePath();
            c.beginPath()
            c.moveTo(120,240)
            c.lineTo(70,265)
            c.stroke()
            c.closePath();
            //右脸三根
            c.beginPath()
            c.moveTo(420,200)
            c.lineTo(480,195)
            c.stroke()
            c.closePath();
            c.beginPath()
            c.moveTo(425,220)
            c.lineTo(480,220)
            c.stroke()
            c.closePath();
            c.beginPath()
            c.moveTo(420,240)
            c.lineTo(470,250)
            c.stroke()
            c.closePath();
        }
        function body(){
            c.strokeStyle="#33190c";
            c.fillStyle="#ffffd9";
            c.lineWidth=5
            c.beginPath()
            c.moveTo(220,300)
            c.lineTo(220,380)
            c.bezierCurveTo(223,400,237,400,240,380)
            c.lineTo(320,380)
            c.bezierCurveTo(323,400,337,400,340,380)
            c.lineTo(340,300)
            c.fill()
            c.stroke()
            c.closePath();

        }
        function hands(){
            c.strokeStyle="#33190c";
            c.fillStyle="#ffffd9";
            c.lineWidth=5
            //左手
            c.beginPath()
            c.moveTo(335,305)
            c.bezierCurveTo(278,320,295,365,335,340)
            c.bezierCurveTo(355,332,353,302,335,305)
            c.fill()
            c.stroke()
            c.closePath()
            //右手
            c.beginPath()
            c.moveTo(225,310)
            // c.bezierCurveTo(278,320,295,365,335,340)
            c.bezierCurveTo(282,325,265,370,225,345)
            c.bezierCurveTo(200,335,207,307,225,310)
            c.fill()
            c.stroke()
            c.closePath()
        }
        ear()
        body()
        head()
        eyelash()
        eyes()
        eyeshighlight()
        nose()
        mouth()
        beard()
        hands()
    }
    /* 加载宠物模块 */
    $.get("/pet/mypet",function (res) {
        //四个属性值设置
        $(".property p").eq(0).children().last().text(res.P_HP)
        $(".property p").eq(1).children().last().text(res.P_POWER)
        $(".property p").eq(2).children().last().text(res.P_SPEED)
        $(".property p").eq(3).children().last().text(res.P_TALENT)

        //经验条设置
        var exp=res.P_EXP  //总经验
        var level=exp2level(exp) //当前等级
        $(".level_info_wrap span").eq(0).text("等级"+level)
        $(".level_info_wrap span").eq(1).text("等级"+(level+1))
        for(var i=0;i<11;i++){
            if(exp<levelExp[i]){
                // console.log(exp-levelExp[i-1])
                $("#level").attr({value:exp-levelExp[i-1],max:maxExp[i]})  //根据经验设置进度条的值
                break
            }
        }
        //0级为宠物蛋
        if(level===0){
            //重画宠物蛋
            drawEgg()
            //添加点我孵化按钮
            $(".pet_content").append("<div class='hatch'>点我孵化</div>")
            //孵化
            $(".pet_content .hatch").click(function () {
                $.post("/pet/addExpByHatch",{exp:50},function (res) {
                    if(res==="success"){
                        alert("孵化成功，经验+50")
                        location.reload()
                    }else if(res==="error_level"){
                        alert("你的宠物现在已经不是蛋咯")
                    }else if(res==="error_num"){
                        alert("每日孵化次数已达上限")
                    }else {
                        alert("内部错误")
                    }
                })
            })
        }else {
            drawPet()
        }
    })
    //喂食
    $(".operation p:nth-child(1) button").click(function () {
        $.post("/pet/addExpByFood",{exp:50},function (res) {
            if(res==="success"){
                alert("喂食成功，经验+50")
                location.reload()
            }else if(res==="error_level"){
                alert("你的宠物现在还是蛋哦，不能吃东西呢")
            }else if(res==="error_num"){
                alert("每日喂食次数已达上限")
            }
            else {
                alert("内部错误")
            }
        })
    })
    //训练
    $(".operation p:nth-child(2) button").click(function () {
        $(".pet_content .train_content").css({display:"block"})
    })
    //取消
    $(".train_content .train_wrap button:nth-last-child(2)").click(function () {
        $(".pet_content .train_content").css({display:"none"})
    })
    //确定
    $(".train_content .train_wrap button:nth-last-child(1)").click(function () {
        var value=$(".train_wrap input:checked").val()
        if(value!=null){
            $.post("/pet/addProByTrain",{value:value},function (res) {
                if(res==="success"){
                    alert("训练成功")
                    location.reload()
                }else if(res==="error_level"){
                    alert("你的宠物现在还是蛋哦，还不能训练")
                }else if(res==="error_num"){
                    alert("每日训练次数已达上限")
                }
                else {
                    alert("内部错误")
                }
            })
        }else {
            alert("请至少选择一个属性来训练")
        }
    })
})
