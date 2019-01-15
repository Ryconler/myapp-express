$(function () {


    var myHpProg = $(".hp progress:first-child")
    var myHpInfo = $(".hp span:nth-child(2)")
    var myPet = $(".pet .me")

    var enemyHpProg = $(".hp progress:last-child")
    var enemyHpInfo = $(".hp span:nth-child(3)")
    var enemyPet = $(".pet .enemy")

    var isNull=enemyHpInfo.text()
    if(isNull==="n"){
        alert("该用户不存在")
        history.go(-1)
    }
    //画宠物
    function initCanvas() {
        var mc = document.getElementById('mc');
        var ec = document.getElementById('ec');
        //设置画布大小，并非实际显示大小，默认300*150
        mc.width = 240
        mc.height = 240
        ec.width = 240
        ec.height = 240
        //已在css中设置了canvas画面要显示的大小，但画布大小还是上面设置的240*240
    }

    function drawMyPet() {
        var c = document.getElementById('mc').getContext("2d");
        c.lineWidth = 5;
        c.strokeStyle = "#33190c";
        c.fillStyle = "#ffffd9";
        //头
        c.beginPath();
        c.arc(120, 120, 110, 0, 2 * Math.PI)
        c.fill();
        c.stroke();
        c.closePath();
        //眉毛
        c.beginPath();
        c.moveTo(200, 100)
        c.lineTo(120, 60)
        c.stroke();
        c.closePath();
        //耳朵
        c.beginPath();
        c.moveTo(100, 30)
        c.lineTo(120, 5)
        c.lineTo(140, 30)
        c.stroke();
        c.closePath();
        ;
        //胡须
        c.lineWidth = 4
        c.beginPath();
        c.moveTo(230, 120)
        c.lineTo(150, 170)
        c.moveTo(230, 120)
        c.lineTo(170, 190)
        c.moveTo(230, 120)
        c.lineTo(190, 210)
        c.stroke();
        c.closePath();
        //眼睛
        c.fillStyle = "#33190c";
        c.beginPath();
        c.arc(170, 105, 10, 0, 2 * Math.PI)
        c.fill();
        c.closePath()
        //鼻子
        c.beginPath();
        c.arc(230, 120, 10, 0, 2 * Math.PI)
        c.fill();
        c.closePath();
    }

    function drawEnemyPet() {
        var c = document.getElementById('ec').getContext("2d");
        c.lineWidth = 5;
        c.strokeStyle = "#33190c";
        c.fillStyle = "#ffffd9";
        //头
        c.beginPath();
        c.arc(120, 120, 110, 0, 2 * Math.PI)
        c.fill();
        c.stroke();
        c.closePath();
        //眉毛
        c.beginPath();
        c.moveTo(40, 100)
        c.lineTo(120, 60)
        c.stroke();
        c.closePath();
        //耳朵
        c.beginPath();
        c.moveTo(140, 30)
        c.lineTo(120, 5)
        c.lineTo(100, 30)
        c.stroke();
        c.closePath();
        ;
        //胡须
        c.lineWidth = 4
        c.beginPath();
        c.moveTo(10, 120)
        c.lineTo(90, 170)
        c.moveTo(10, 120)
        c.lineTo(70, 190)
        c.moveTo(10, 120)
        c.lineTo(50, 210)
        c.stroke();
        c.closePath();
        //眼睛
        c.fillStyle = "#33190c";
        c.beginPath();
        c.arc(70, 105, 10, 0, 2 * Math.PI)
        c.fill();
        c.closePath()
        //鼻子
        c.beginPath();
        c.arc(10, 120, 10, 0, 2 * Math.PI)
        c.fill();
        c.closePath();
    }

    initCanvas()
    drawMyPet()
    drawEnemyPet()

    $(".operation .begin").click(function () {
        $(this).off("click")
        $(this).hide()
        var mhp = parseInt(myHpInfo.text())
        var mpower = parseInt($(".property p:first-child span:nth-child(2)").text())
        var mspeed = parseInt($(".property p:first-child span:nth-child(4)").text())
        var mtalent = parseInt($(".property p:first-child span:nth-child(6)").text())
        var ehp = enemyHpInfo.text()
        var epower = parseInt($(".property p:last-child span:nth-child(2)").text())
        var espeed = parseInt($(".property p:last-child span:nth-child(4)").text())
        var etalent = parseInt($(".property p:last-child span:nth-child(6)").text())
        battle(mhp, mpower, mspeed, mtalent, ehp, epower, espeed, etalent)
    })
    //战斗
    function battle(mhp, mpower, mspeed, mtalent, ehp, epower, espeed, etalent) {
        var current_mhp = mhp  //我的当前血量
        var current_ehp = ehp  //敌人当前血量
        //我的攻击
        var mcount = 1  //我受攻击次数
        var ecount = 1
        //我的攻击
        var mt = setInterval(function () {
            myPet.animate({left: "10%"}, 100, function () {
                //计算这次攻击造成的伤害
                var damage = mpower * (probable(mtalent / 100) + 1) * (probable(1 - 1 / espeed)===1?0:1)
                //敌人因这次伤害减少血量
                current_ehp -= damage
                enemyHpInfo.text(current_ehp)
                enemyHpProg.attr({value: current_ehp})
                var damageMsg = damage === 0 ? "闪避" : "-" + damage  //伤害信息显示
                //<div class='damage m-damage' id='mdc1'>-30</div>
                $(".container").append("<div class='damage e-damage' id='edc" + ecount + "'>" + damageMsg + "</div>")
                $("#edc" + ecount).animate({top: "2rem", opacity: 0}, 1000, function () {
                    $(this).remove()
                })
                ecount++
                if (current_ehp <= 0) {
                    myPet.stop()
                    enemyPet.stop()
                    clearInterval(et)
                    clearInterval(mt)
                    alert("你赢了！")
                    location.reload()
                }
            }).animate({left: "0"}, 100)
        }, 1000 / mspeed)
        //敌人攻击
        var et = setInterval(function () {
            enemyPet.animate({right: "10%"}, 100, function () {
                //计算这次攻击造成的伤害
                var damage = epower * (probable(etalent / 100) + 1) * (probable(1 - 1 / mspeed)===1?0:1)
                //我因这次伤害减少血量
                current_mhp -= damage
                myHpInfo.text(current_mhp)
                myHpProg.attr({value: current_mhp})
                var damageMsg = damage === 0 ? "闪避" : "-" + damage  //伤害信息显示
                //<div class='damage m-damage' id='mdc1'>-30</div>
                $(".container").append("<div class='damage m-damage' id='mdc" + mcount + "'>" + damageMsg + "</div>")
                $("#mdc" + mcount).animate({top: "2rem", opacity: 0}, 1000, function () {
                    $(this).remove()
                })
                mcount++
                if (current_mhp <= 0) {
                    myPet.stop()
                    enemyPet.stop()
                    clearInterval(et)
                    clearInterval(mt)
                    alert("你输了！")
                    location.reload()
                }
            }).animate({right: "0"}, 100)
        }, 1000 / espeed)
    }

    //几率生效判断
    function probable(pro) {
        var r = Math.random()
        return r < pro ? 1 : 0  //生效为1，否则为0
    }
})
