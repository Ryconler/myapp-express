var express = require('express');
var Pet=require('./DaoPet')

var router = express.Router();

//PK战场
router.get('/enemy/:username',function (req,res) {
    // console.log(req.params)
    res.render('pk')
})
//获得宠物信息
router.post('/getPets',function (req,res) {
    var eUsername=req.body.username
    var mUsername=req.session.user.username
    // console.log(eUsername)
    // console.log(mUsername)
   //获取我和敌人的宠物所有信息后返回给前端
    try {
        new Pet().getPetByUsername(mUsername,function (mPet) {
            new Pet().getPetByUsername(eUsername,function (ePet) {
                res.send({mPet:mPet[0],ePet:ePet[0]})
            })
        })
    }catch (e) {
        res.send("error")
    }

})

module.exports = router;
