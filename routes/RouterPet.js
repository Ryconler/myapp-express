var express = require('express');
var Pet = require('./DaoPet')

var maxExp=9999
//达到相应等级需要的总经验
var levelExp = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700, 3250,maxExp]

//经验转等级
function exp2level(exp) {
    for (var i = 1; i < levelExp.length; i++) {
        if (exp < levelExp[i]) {
            return i - 1
        }
    }
}

var router = express.Router();
router.get('/explanation', function (req, res) {
    res.render('petexplanation')
})
router.get('/mypet', function (req, res) {
    var u_id = req.session.user.id //主人ID
    new Pet().getPet(u_id, function (result) {
        if (result.length !== 0) {
            res.send(result[0])
        } else {
            res.send("error")
        }
    })
})
//孵化加经验
router.post('/addExpByHatch', function (req, res) {
    var exp = parseInt(req.body.exp)  //孵化增加的数
    var u_id = req.session.user.id //主人ID
    new Pet().getPet(u_id, function (result) {
        if (result.length !== 0) {
            var oldLevel = exp2level(result[0].P_EXP)   //旧等级
            var newLevel = exp2level(result[0].P_EXP + exp) //新等级
            if (oldLevel === 0) {      //等级为0级才可以孵化
                var hatchNum = result[0].P_HATCH_DAILY
                if (hatchNum > 0) {     //有孵化次数,可以加经验
                    if (newLevel - oldLevel > 0) {  //有升级
                        new Pet().upGrade(oldLevel, newLevel,u_id)
                    }
                    //加经验
                    new Pet().addExp(exp, u_id, function (result) {
                        if (result === "success") {
                            res.send("success")
                        }
                    })
                    //可孵化次数-1
                    new Pet().updateHatch(u_id)
                } else {
                    res.send("error_num")
                }
            } else {
                res.send("error_level")
            }
        } else {
            res.send("error")
        }

    })
})
//喂食加经验
router.post('/addExpByFood', function (req, res) {
    var exp = parseInt(req.body.exp)  //喂食增加的经验数
    var u_id = req.session.user.id //主人ID
    new Pet().getPet(u_id, function (result) {
        if (result.length !== 0) {
            var oldLevel = exp2level(result[0].P_EXP)   //旧等级
            var newLevel = exp2level(result[0].P_EXP + exp) //新等级
            if (oldLevel > 0) {      //等级大于0才可以喂食
                var foodNum = result[0].P_FOOD_DAILY
                if (foodNum > 0) {     //有喂食次数,可以加经验
                    if (newLevel - oldLevel > 0) {  //有升级
                        new Pet().upGrade(oldLevel, newLevel,u_id)
                    }
                    //加经验
                    new Pet().addExp(exp, u_id, function (result) {
                        if (result === "success") {
                            res.send("success")
                        }
                    })
                    //可喂食次数-1
                    new Pet().updateFood(u_id)
                } else {
                    res.send("error_num")
                }
            } else {
                res.send("error_level")
            }
        } else {
            res.send("error")
        }

    })
})
//训练加属性
router.post('/addProByTrain', function (req, res) {
    var value = req.body.value; //要增加的属性
    var hp = 0
    var power = 0
    var speed = 0
    var talent = 0
    switch (value) {
        case "hp":
            hp = 100;
            break;
        case "power":
            power = 10;
            break;
        case "speed":
            speed = 0.1;
            break;
        case "talent":
            talent = 5;
            break;
    }
    var u_id = req.session.user.id //主人ID
    new Pet().getPet(u_id, function (result) {
        if (result.length !== 0) {
            var oldLevel = exp2level(result[0].P_EXP)   //旧等级
            if (oldLevel > 0) {      //等级大于0才可以训练
                var trainNum = result[0].P_TRAIN_DAILY
                if (trainNum > 0) {     //有次数次数,可以训练
                    //开始训练
                    new Pet().addPro(hp, power, speed, talent, u_id, function (result) {
                        if (result === "success") {
                            res.send("success")
                        }
                    })
                    //可训练次数-1
                    new Pet().updateTrain(u_id)
                } else {
                    res.send("error_num")
                }
            } else {
                res.send("error_level")
            }
        } else {
            res.send("error")
        }
    })

})




module.exports = router;
