var express = require('express');
var Pet = require('./DaoPet')
var User = require('./DaoUser')

var router = express.Router();

//PK战场
router.get('/enemy/:username', function (req, res) {
    new User().isLogin(req, res, function (result) {
        if (result === "yes") {
            var eUsername = req.params.username
            var mUsername = req.session.user.username
            // console.log(eUsername)
            //获取我和敌人的宠物所有信息后返回给前端
            new Pet().getPetByUsername(mUsername, function (mPet) {
                new Pet().getPetByUsername(eUsername, function (ePet) {
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
            res.redirect("/users/login")
        }
    })
})


module.exports = router;
