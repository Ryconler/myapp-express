var express = require('express');
var Pet = require('./DaoPet')
var User = require('./DaoUser')

var router = express.Router();

//PK战场
router.get('/enemy/:id', function (req, res) {
    new User().isLogin(req, res, function (result) {
        if (result === "yes") {
            var eid = req.params.id
            var mid = req.session.user.id
            // console.log(eUsername)
            //获取我和敌人的宠物所有信息后返回给前端
            new Pet().getPet(mid, function (mPet) {
                new Pet().getPet(eid, function (ePet) {
                    if (ePet.length !== 0) {
                        res.render('pk', {mPet: mPet[0], ePet: ePet[0]})
                    } else {
                        res.render('pk', {
                            mPet: mPet[0],
                            ePet: {P_NAME: 'n', P_HP: 'n', P_POWER: 'n', P_SPEED: 'n', P_TALENT: 'n'}
                        })
                    }
                })
            })
        } else {
            res.redirect("/user/login")
        }
    })
})


module.exports = router;
