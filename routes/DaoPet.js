var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'myapp'
});
connection.connect();

function DaoPet() {
    //根据主人ID获得宠物所有信息
    this.getPet=function (u_id,callback) {
        connection.query("SELECT * FROM pet WHERE U_ID=?",u_id,function (err,result) {
            if(err){
                console.log(err)
                return
            }else {
                // console.log(result)
                callback&&callback(result)
            }
        })
    }
    //获得宠物经验值
    this.getExp=function (u_id,callback) {
        connection.query("SELECT P_EXP FROM pet WHERE U_ID=?",u_id,function (err,result) {
            if(err){
                console.log(err)
                return
            }else {
                // console.log(result)
                callback&&callback(result)
            }
        })
    }
    //根据新旧等级进行升级操作
    this.upGrade=function(oldLevel,newLevel,u_id,callback) {
        if(newLevel===1&&oldLevel===0){   //0级升1级
            connection.query("UPDATE pet " +
                "SET P_HP=100,P_POWER=10,P_SPEED=1,P_FOOD_DAILY=3,P_TRAIN_DAILY=3,P_PK_EXP_DAILY=150,P_HATCH_DAILY=0 " +
                "WHERE U_ID=?",
                [u_id],
                function (err) {
                if(err){
                    console.log(err)
                    return
                }else {
                    callback&&callback("success")
                }
            })
        }else {
            var dL=newLevel-oldLevel
            connection.query("UPDATE pet SET P_HP=P_HP+?,P_POWER=P_POWER+?,P_SPEED=P_SPEED+?,P_TALENT=P_TALENT+? WHERE U_ID=?",
                [dL*100,dL*10,dL*0.1,dL*5,u_id],function (err) {
                if(err){
                    console.log(err)
                    return
                }else {
                    callback&&callback("success")
                }
            })
        }
    }
    //增加经验
    this.addExp=function (exp,u_id,callback) {
        connection.query("UPDATE pet SET P_EXP=P_EXP+? WHERE U_ID=?",[exp,u_id],function (err) {
            if(err){
                console.log(err)
                return
            }else {
                callback&&callback("success")
            }
        })
    }
    //增加属性
    this.addPro=function (hp,power,speed,talent,u_id,callback) {
        connection.query("UPDATE pet SET P_HP=P_HP+?,P_POWER=P_POWER+?,P_SPEED=P_SPEED+?,P_TALENT=P_TALENT+? WHERE U_ID=?",
            [hp,power,speed,talent,u_id],function (err) {
                if(err){
                    console.log(err)
                    return
                }else {
                    callback&&callback("success")
                }
            })
    }
    //更新剩余可喂食次数-1
    this.updateFood=function (u_id,callback) {
        connection.query("UPDATE pet SET P_FOOD_DAILY=P_FOOD_DAILY-1 WHERE U_ID=?",u_id,function (err) {
            if(err){
                console.log(err)
                return
            }else {
                callback&&callback("success")
            }
        })
    }
    //更新剩余可孵化次数-1
    this.updateHatch=function (u_id,callback) {
        connection.query("UPDATE pet SET P_HATCH_DAILY=P_HATCH_DAILY-1 WHERE U_ID=?",u_id,function (err) {
            if(err){
                console.log(err)
                return
            }else {
                callback&&callback("success")
            }
        })
    }
    //更新剩余可训练次数-1
    this.updateTrain=function (u_id,callback) {
        connection.query("UPDATE pet SET P_TRAIN_DAILY=P_TRAIN_DAILY-1 WHERE U_ID=?",u_id,function (err) {
            if(err){
                console.log(err)
                return
            }else {
                callback&&callback("success")
            }
        })
    }

}
// new DaoPet().addPro(100,0,0,0,1)
module.exports=DaoPet
